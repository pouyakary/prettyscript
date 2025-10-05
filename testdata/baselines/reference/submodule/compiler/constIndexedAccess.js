//// [tests/cases/compiler/constIndexedAccess.ts] ////

//// [constIndexedAccess.ts]
const enum numbers {
    zero,
    one
}

interface indexAccess {
    0: string;
    1: number;
}

let test: indexAccess;

let s = test[0];
let n = test[1];

let s1 = test[numbers.zero];
let n1 = test[numbers.one];

let s2 = test[numbers["zero"]];
let n2 = test[numbers["one"]];

enum numbersNotConst {
    zero,
    one
}

let s3 = test[numbersNotConst.zero];
let n3 = test[numbersNotConst.one];


//// [constIndexedAccess.js]
let test;
let s = test[0];
let n = test[1];
let s1 = test[0 /* numbers.zero */];
let n1 = test[1 /* numbers.one */];
let s2 = test[0 /* numbers["zero"] */];
let n2 = test[1 /* numbers["one"] */];
var numbersNotConst;
(function (numbersNotConst) {
    numbersNotConst[numbersNotConst["zero"] = 0] = "zero";
    numbersNotConst[numbersNotConst["one"] = 1] = "one";
})(numbersNotConst || (numbersNotConst = {}));
let s3 = test[numbersNotConst.zero];
let n3 = test[numbersNotConst.one];
