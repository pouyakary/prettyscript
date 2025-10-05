package parser

import (
	"io/fs"
	"iter"
	"os"
	"path/filepath"
	"testing"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/repo"
	"github.com/microsoft/typescript-go/internal/testutil/fixtures"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs/osvfs"
	"gotest.tools/v3/assert"
)

func BenchmarkParse(b *testing.B) {
	jsdocModes := []struct {
		name string
		mode ast.JSDocParsingMode
	}{
		{"tsc", ast.JSDocParsingModeParseForTypeErrors},
		{"server", ast.JSDocParsingModeParseAll},
	}

	for _, f := range fixtures.BenchFixtures {
		b.Run(f.Name(), func(b *testing.B) {
			f.SkipIfNotExist(b)

			fileName := tspath.GetNormalizedAbsolutePath(f.Path(), "/")
			path := tspath.ToPath(fileName, "/", osvfs.FS().UseCaseSensitiveFileNames())
			sourceText := f.ReadFile(b)
			scriptKind := core.GetScriptKindFromFileName(fileName)

			for _, jsdoc := range jsdocModes {
				b.Run(jsdoc.name, func(b *testing.B) {
					jsdocMode := jsdoc.mode

					opts := ast.SourceFileParseOptions{
						FileName:         fileName,
						Path:             path,
						JSDocParsingMode: jsdocMode,
					}

					for b.Loop() {
						ParseSourceFile(opts, sourceText, scriptKind)
					}
				})
			}
		})
	}
}

type parsableFile struct {
	path string
	name string
}

func allParsableFiles(tb testing.TB, root string) iter.Seq[parsableFile] {
	tb.Helper()
	return func(yield func(parsableFile) bool) {
		tb.Helper()
		err := filepath.WalkDir(root, func(path string, d fs.DirEntry, err error) error {
			if err != nil {
				return err
			}

			if d.IsDir() || tspath.TryGetExtensionFromPath(path) == "" {
				return nil
			}

			testName, err := filepath.Rel(root, path)
			if err != nil {
				return err
			}
			testName = filepath.ToSlash(testName)

			if !yield(parsableFile{path, testName}) {
				return filepath.SkipAll
			}
			return nil
		})
		assert.NilError(tb, err)
	}
}

func TestNamedParameterGroupParsesToBindingPattern(t *testing.T) {
	source := "function foo(@x: number? = 2, @y: string) {}"
	file := ParseSourceFile(ast.SourceFileParseOptions{FileName: "/index.ts", Path: tspath.Path("/index.ts")}, source, core.ScriptKindTS)
	assert.Equal(t, len(file.Statements.Nodes), 1)
	fnNode := file.Statements.Nodes[0]
	params := fnNode.Parameters()
	assert.Equal(t, len(params), 1)
	parameter := params[0].AsParameterDeclaration()
	assert.Assert(t, parameter.Initializer == nil)
	bindingName := (*ast.Node)(parameter.Name())
	assert.Equal(t, bindingName.Kind, ast.KindObjectBindingPattern)
	elements := bindingName.AsBindingPattern().Elements.Nodes
	assert.Equal(t, len(elements), 2)
	firstBinding := elements[0].AsBindingElement()
	firstName := (*ast.Node)(firstBinding.Name())
	assert.Equal(t, firstName.AsIdentifier().Text, "x")
	assert.Assert(t, firstBinding.Initializer != nil)
	secondBinding := elements[1].AsBindingElement()
	secondName := (*ast.Node)(secondBinding.Name())
	assert.Equal(t, secondName.AsIdentifier().Text, "y")
	assert.Assert(t, secondBinding.Initializer == nil)
	typeLiteral := (*ast.Node)(parameter.Type)
	assert.Equal(t, typeLiteral.Kind, ast.KindTypeLiteral)
	members := typeLiteral.AsTypeLiteralNode().Members.Nodes
	assert.Equal(t, len(members), 2)
	firstPropertyNode := members[0]
	assert.Assert(t, firstPropertyNode.PostfixToken() != nil)
	assert.Equal(t, firstPropertyNode.PostfixToken().Kind, ast.KindQuestionToken)
	secondPropertyNode := members[1]
	assert.Assert(t, secondPropertyNode.PostfixToken() == nil)
}

func TestNamedArgumentCallDesugarsToObjectLiteral(t *testing.T) {
	source := "foo(x: 2, y: \"hello\");"
	file := ParseSourceFile(ast.SourceFileParseOptions{FileName: "/index.ts", Path: tspath.Path("/index.ts")}, source, core.ScriptKindTS)
	assert.Equal(t, len(file.Statements.Nodes), 1)

	stmt := file.Statements.Nodes[0]
	assert.Equal(t, stmt.Kind, ast.KindExpressionStatement)
	expr := stmt.AsExpressionStatement().Expression
	assert.Assert(t, expr != nil)
	call := (*ast.Node)(expr)
	assert.Equal(t, call.Kind, ast.KindCallExpression)

	arguments := call.AsCallExpression().Arguments
	assert.Equal(t, len(arguments.Nodes), 1)

	argument := arguments.Nodes[0]
	assert.Equal(t, argument.Kind, ast.KindObjectLiteralExpression)
	properties := argument.AsObjectLiteralExpression().Properties.Nodes
	assert.Equal(t, len(properties), 2)

	firstProperty := properties[0]
	assert.Equal(t, firstProperty.Kind, ast.KindPropertyAssignment)
	firstAssignment := firstProperty.AsPropertyAssignment()
	firstName := (*ast.Node)(firstAssignment.Name())
	assert.Equal(t, firstName.Kind, ast.KindIdentifier)
	assert.Equal(t, firstName.AsIdentifier().Text, "x")
	firstInitializer := (*ast.Node)(firstAssignment.Initializer)
	assert.Assert(t, firstInitializer != nil)
	assert.Equal(t, firstInitializer.Kind, ast.KindNumericLiteral)

	secondProperty := properties[1]
	assert.Equal(t, secondProperty.Kind, ast.KindPropertyAssignment)
	secondAssignment := secondProperty.AsPropertyAssignment()
	secondName := (*ast.Node)(secondAssignment.Name())
	assert.Equal(t, secondName.Kind, ast.KindIdentifier)
	assert.Equal(t, secondName.AsIdentifier().Text, "y")
	secondInitializer := (*ast.Node)(secondAssignment.Initializer)
	assert.Assert(t, secondInitializer != nil)
	assert.Equal(t, secondInitializer.Kind, ast.KindStringLiteral)
}

func TestControlStructuresParseWithoutParentheses(t *testing.T) {
	source := `
if x < y {
  doSomething();
} else {
  doSomethingElse();
}

while x < y {
  doSomething();
}

for let i = 0; i < 10; i++ {
  doSomething();
}

switch x {
case 1:
  doSomething();
  break;
default:
  doSomethingElse();
}
`

	file := ParseSourceFile(ast.SourceFileParseOptions{FileName: "/index.ts", Path: tspath.Path("/index.ts")}, source, core.ScriptKindTS)
	assert.Equal(t, len(file.Statements.Nodes), 4)

	ifStmt := file.Statements.Nodes[0]
	assert.Equal(t, ifStmt.Kind, ast.KindIfStatement)
	ifExpression := (*ast.Node)(ifStmt.AsIfStatement().Expression)
	assert.Equal(t, ifExpression.Kind, ast.KindBinaryExpression)
	thenBlock := (*ast.Node)(ifStmt.AsIfStatement().ThenStatement)
	assert.Equal(t, thenBlock.Kind, ast.KindBlock)
	assert.Equal(t, len(thenBlock.AsBlock().Statements.Nodes), 1)
	elseBlock := (*ast.Node)(ifStmt.AsIfStatement().ElseStatement)
	assert.Equal(t, elseBlock.Kind, ast.KindBlock)
	assert.Equal(t, len(elseBlock.AsBlock().Statements.Nodes), 1)

	whileStmt := file.Statements.Nodes[1]
	assert.Equal(t, whileStmt.Kind, ast.KindWhileStatement)
	whileExpression := (*ast.Node)(whileStmt.AsWhileStatement().Expression)
	assert.Equal(t, whileExpression.Kind, ast.KindBinaryExpression)
	whileBody := (*ast.Node)(whileStmt.AsWhileStatement().Statement)
	assert.Equal(t, whileBody.Kind, ast.KindBlock)

	forStmtNode := file.Statements.Nodes[2]
	assert.Equal(t, forStmtNode.Kind, ast.KindForStatement)
	forStmt := forStmtNode.AsForStatement()
	initializer := (*ast.Node)(forStmt.Initializer)
	assert.Equal(t, initializer.Kind, ast.KindVariableDeclarationList)
	declarations := initializer.AsVariableDeclarationList().Declarations.Nodes
	assert.Equal(t, len(declarations), 1)
	declaration := declarations[0].AsVariableDeclaration()
	declName := (*ast.Node)(declaration.Name())
	assert.Equal(t, declName.Kind, ast.KindIdentifier)
	assert.Equal(t, declName.AsIdentifier().Text, "i")
	assert.Assert(t, declaration.Initializer != nil)
	condition := (*ast.Node)(forStmt.Condition)
	assert.Equal(t, condition.Kind, ast.KindBinaryExpression)
	incrementor := (*ast.Node)(forStmt.Incrementor)
	assert.Equal(t, incrementor.Kind, ast.KindPostfixUnaryExpression)
	forBody := (*ast.Node)(forStmt.Statement)
	assert.Equal(t, forBody.Kind, ast.KindBlock)

	switchStmt := file.Statements.Nodes[3]
	assert.Equal(t, switchStmt.Kind, ast.KindSwitchStatement)
	switchExpression := (*ast.Node)(switchStmt.AsSwitchStatement().Expression)
	assert.Equal(t, switchExpression.Kind, ast.KindIdentifier)
	caseBlock := (*ast.Node)(switchStmt.AsSwitchStatement().CaseBlock)
	assert.Equal(t, caseBlock.Kind, ast.KindCaseBlock)
	clauses := caseBlock.AsCaseBlock().Clauses.Nodes
	assert.Equal(t, len(clauses), 2)
	firstClauseNode := clauses[0]
	assert.Equal(t, firstClauseNode.Kind, ast.KindCaseClause)
	firstClause := firstClauseNode.AsCaseOrDefaultClause()
	assert.Assert(t, firstClause.Expression != nil)
	assert.Assert(t, len(firstClause.Statements.Nodes) > 0)
	secondClauseNode := clauses[1]
	assert.Equal(t, secondClauseNode.Kind, ast.KindDefaultClause)
	secondClause := secondClauseNode.AsCaseOrDefaultClause()
	assert.Assert(t, secondClause.Expression == nil)
	assert.Assert(t, len(secondClause.Statements.Nodes) > 0)
}

func FuzzParser(f *testing.F) {
	repo.SkipIfNoTypeScriptSubmodule(f)

	tests := []string{
		"src",
		"scripts",
		"Herebyfile.mjs",
		// "tests/cases",
	}

	var extensions collections.Set[string]
	for _, es := range tspath.AllSupportedExtensionsWithJson {
		for _, e := range es {
			extensions.Add(e)
		}
	}

	for _, test := range tests {
		root := filepath.Join(repo.TypeScriptSubmodulePath, test)

		for file := range allParsableFiles(f, root) {
			sourceText, err := os.ReadFile(file.path)
			assert.NilError(f, err)
			extension := tspath.TryGetExtensionFromPath(file.path)
			f.Add(extension, string(sourceText), int(core.ScriptTargetESNext), int(ast.JSDocParsingModeParseAll))
		}
	}

	f.Fuzz(func(t *testing.T, extension string, sourceText string, scriptTarget_ int, jsdocParsingMode_ int) {
		scriptTarget := core.ScriptTarget(scriptTarget_)
		jsdocParsingMode := ast.JSDocParsingMode(jsdocParsingMode_)

		if !extensions.Has(extension) {
			t.Skip()
		}

		if scriptTarget < core.ScriptTargetNone || scriptTarget > core.ScriptTargetLatest {
			t.Skip()
		}

		if jsdocParsingMode < ast.JSDocParsingModeParseAll || jsdocParsingMode > ast.JSDocParsingModeParseNone {
			t.Skip()
		}

		fileName := "/index" + extension
		path := tspath.Path(fileName)

		opts := ast.SourceFileParseOptions{
			FileName:         fileName,
			Path:             path,
			JSDocParsingMode: jsdocParsingMode,
		}

		ParseSourceFile(opts, sourceText, core.GetScriptKindFromFileName(fileName))
	})
}
