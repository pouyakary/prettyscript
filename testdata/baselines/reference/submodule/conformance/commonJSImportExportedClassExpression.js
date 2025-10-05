//// [tests/cases/conformance/salsa/commonJSImportExportedClassExpression.ts] ////

//// [main.js]
const { K } = require("./mod1");
/** @param {K} k */
function f(k) {
    k.values()
}

//// [mod1.js]
exports.K = class K {
    values() {
    }
};


//// [mod1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
export var K = class K {
    values() {
    }
};
exports.K = class K {
    values() {
    }
};
//// [main.js]
"use strict";
const { K } = require("./mod1");
/** @param {K} k */
function f(k) {
    k.values();
}


//// [mod1.d.ts]
export var K = class K {
    values(): void;
};
export {};
//// [main.d.ts]
export {};
