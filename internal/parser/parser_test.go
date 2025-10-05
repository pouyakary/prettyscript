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
	source := "function foo(@x: number = 2, @y: string) {}"
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
	secondPropertyNode := members[1]
	assert.Assert(t, secondPropertyNode.PostfixToken() == nil)
}

func TestNamedArgumentCallDesugarsToObjectLiteral(t *testing.T) {
	source := "foo(x: 5, y: 6);"
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
	firstName := (*ast.Node)(firstProperty.AsPropertyAssignment().Name())
	assert.Equal(t, firstName.Kind, ast.KindIdentifier)
	assert.Equal(t, firstName.AsIdentifier().Text, "x")

	secondProperty := properties[1]
	assert.Equal(t, secondProperty.Kind, ast.KindPropertyAssignment)
	secondName := (*ast.Node)(secondProperty.AsPropertyAssignment().Name())
	assert.Equal(t, secondName.Kind, ast.KindIdentifier)
	assert.Equal(t, secondName.AsIdentifier().Text, "y")
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
