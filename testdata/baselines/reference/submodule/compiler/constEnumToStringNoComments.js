//// [tests/cases/compiler/constEnumToStringNoComments.ts] ////

//// [constEnumToStringNoComments.ts]
const enum Foo {
    X = 100,
    Y = 0.5,
    Z = 2.,
    A = -1,
    B = -1.5,
    C = -1.
}

let x0 = Foo.X.toString();
let x1 = Foo["X"].toString();
let y0 = Foo.Y.toString();
let y1 = Foo["Y"].toString();
let z0 = Foo.Z.toString();
let z1 = Foo["Z"].toString();
let a0 = Foo.A.toString();
let a1 = Foo["A"].toString();
let b0 = Foo.B.toString();
let b1 = Foo["B"].toString();
let c0 = Foo.C.toString();
let c1 = Foo["C"].toString();


//// [constEnumToStringNoComments.js]
let x0 = 100..toString();
let x1 = 100..toString();
let y0 = 0.5.toString();
let y1 = 0.5.toString();
let z0 = 2..toString();
let z1 = 2..toString();
let a0 = (-1).toString();
let a1 = (-1).toString();
let b0 = (-1.5).toString();
let b1 = (-1.5).toString();
let c0 = (-1).toString();
let c1 = (-1).toString();
