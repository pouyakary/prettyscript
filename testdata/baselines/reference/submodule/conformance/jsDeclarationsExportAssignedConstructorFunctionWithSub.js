//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsExportAssignedConstructorFunctionWithSub.ts] ////

//// [jsDeclarationsExportAssignedConstructorFunctionWithSub.js]
/**
 * @param {number} p
 */
module.exports = function (p) {
    this.t = 12 + p;
}
module.exports.Sub = function() {
    this.instance = new module.exports(10);
}
module.exports.Sub.prototype = { }


//// [jsDeclarationsExportAssignedConstructorFunctionWithSub.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @param {number} p
 */
export = function (p) {
    this.t = 12 + p;
};
/**
 * @param {number} p
 */
module.exports = function (p) {
    this.t = 12 + p;
};
export var Sub = function () {
    this.instance = new module.exports(10);
};
module.exports.Sub = function () {
    this.instance = new module.exports(10);
};
module.exports.Sub.prototype = {};


//// [jsDeclarationsExportAssignedConstructorFunctionWithSub.d.ts]
declare const _default: (p: any) => void;
export = _default;
export var Sub = function ();;
