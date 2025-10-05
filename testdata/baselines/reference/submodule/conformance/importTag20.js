//// [tests/cases/conformance/jsdoc/importTag20.ts] ////

//// [a.ts]
export interface Foo {}

//// [b.js]
/**
 * @import
 * { Foo
 * } from './a'
 */

/**
 * @param {Foo} a
 */
export function foo(a) {}




//// [a.d.ts]
export interface Foo {
}
//// [b.d.ts]
import type { Foo } from './a';
/**
 * @import
 * { Foo
 * } from './a'
 */
/**
 * @param {Foo} a
 */
export declare function foo(a: Foo): void;
