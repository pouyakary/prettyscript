//// [tests/cases/compiler/moduleNodeDefaultImports.ts] ////

//// [mod.cts]
declare function fun(): void;
export default fun;
//// [b.mts]
import a from "./mod.cjs";
import { default as b } from "./mod.cjs";
import c, { default as d } from "./mod.cjs";
import * as self from "./b.mjs";
export { default } from "./mod.cjs";
export { default as def } from "./mod.cjs";

a === b;
b === c;
c === d;
d === self.default;
self.default === self.def;

// should all fail
a();
b();
c();
d();
self.default();
self.def();

// should all work
a.default();
b.default();
c.default();
d.default();
self.default.default();
self.def.default();

//// [mod.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = fun;
//// [b.mjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.def = exports.default = void 0;
const mod_cjs_1 = require("./mod.cjs");
const mod_cjs_2 = require("./mod.cjs");
const mod_cjs_3 = require("./mod.cjs");
const self = require("./b.mjs");
const mod_cjs_4 = require("./mod.cjs");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return mod_cjs_4.default; } });
const mod_cjs_5 = require("./mod.cjs");
Object.defineProperty(exports, "def", { enumerable: true, get: function () { return mod_cjs_5.default; } });
mod_cjs_1.default === mod_cjs_2.default;
mod_cjs_2.default === mod_cjs_3.default;
mod_cjs_3.default === mod_cjs_3.default;
mod_cjs_3.default === self.default;
self.default === self.def;
// should all fail
(0, mod_cjs_1.default)();
(0, mod_cjs_2.default)();
(0, mod_cjs_3.default)();
(0, mod_cjs_3.default)();
self.default();
self.def();
// should all work
mod_cjs_1.default.default();
mod_cjs_2.default.default();
mod_cjs_3.default.default();
mod_cjs_3.default.default();
self.default.default();
self.def.default();
