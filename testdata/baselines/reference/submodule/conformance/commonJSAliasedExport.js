//// [tests/cases/conformance/salsa/commonJSAliasedExport.ts] ////

//// [commonJSAliasedExport.js]
const donkey = (ast) =>  ast;

function funky(declaration) {
    return false;
}
module.exports = donkey;
module.exports.funky = funky;

//// [bug43713.js]
const { funky } = require('./commonJSAliasedExport');
/** @type {boolean} */
var diddy
var diddy = funky(1)



//// [commonJSAliasedExport.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const donkey = (ast) => ast;
function funky(declaration) {
    return false;
}
export = donkey;
module.exports = donkey;
export var funky = funky;
module.exports.funky = funky;
//// [bug43713.js]
const { funky } = require('./commonJSAliasedExport');
/** @type {boolean} */
var diddy;
var diddy = funky(1);


//// [commonJSAliasedExport.d.ts]
export = donkey;
export var funky = funky;
//// [bug43713.d.ts]
export {};
