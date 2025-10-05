//// [tests/cases/conformance/types/stringLiteral/stringLiteralTypesOverloads03.ts] ////

//// [stringLiteralTypesOverloads03.ts]
interface Base {
    x: string;
    y: number;
}

interface HelloOrWorld extends Base {
    p1: boolean;
}

interface JustHello extends Base {
    p2: boolean;
}

interface JustWorld extends Base {
    p3: boolean;
}

let hello: "hello";
let world: "world";
let helloOrWorld: "hello" | "world";

function f(p: "hello"): JustHello;
function f(p: "hello" | "world"): HelloOrWorld;
function f(p: "world"): JustWorld;
function f(p: string): Base;
function f(...args: any[]): any {
    return undefined;
}

let fResult1 = f(hello);
let fResult2 = f(world);
let fResult3 = f(helloOrWorld);

function g(p: string): Base;
function g(p: "hello"): JustHello;
function g(p: "hello" | "world"): HelloOrWorld;
function g(p: "world"): JustWorld;
function g(...args: any[]): any {
    return undefined;
}

let gResult1 = g(hello);
let gResult2 = g(world);
let gResult3 = g(helloOrWorld);

//// [stringLiteralTypesOverloads03.js]
let hello;
let world;
let helloOrWorld;
function f(...args) {
    return undefined;
}
let fResult1 = f(hello);
let fResult2 = f(world);
let fResult3 = f(helloOrWorld);
function g(...args) {
    return undefined;
}
let gResult1 = g(hello);
let gResult2 = g(world);
let gResult3 = g(helloOrWorld);


//// [stringLiteralTypesOverloads03.d.ts]
interface Base {
    x: string;
    y: number;
}
interface HelloOrWorld extends Base {
    p1: boolean;
}
interface JustHello extends Base {
    p2: boolean;
}
interface JustWorld extends Base {
    p3: boolean;
}
declare let hello: "hello";
declare let world: "world";
declare let helloOrWorld: "hello" | "world";
declare function f(p: "hello"): JustHello;
declare function f(p: "hello" | "world"): HelloOrWorld;
declare function f(p: "world"): JustWorld;
declare function f(p: string): Base;
declare let fResult1: JustHello;
declare let fResult2: JustWorld;
declare let fResult3: HelloOrWorld;
declare function g(p: string): Base;
declare function g(p: "hello"): JustHello;
declare function g(p: "hello" | "world"): HelloOrWorld;
declare function g(p: "world"): JustWorld;
declare let gResult1: JustHello;
declare let gResult2: JustWorld;
declare let gResult3: Base;
