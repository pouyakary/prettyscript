package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAddSignaturePartial(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = ``
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.Insert(t, "interface Number { toFixed")
	f.Insert(t, "(")
}
