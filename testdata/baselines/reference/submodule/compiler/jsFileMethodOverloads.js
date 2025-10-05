//// [tests/cases/compiler/jsFileMethodOverloads.ts] ////

//// [jsFileMethodOverloads.js]
/**
 * @template T
 */
 class Example {
  /**
   * @param {T} value 
   */
  constructor(value) {
    this.value = value;
  }

  /**
   * @overload
   * @param {Example<number>} this
   * @returns {'number'}
   */
  /**
   * @overload
   * @param {Example<string>} this
   * @returns {'string'}
   */
  /**
   * @returns {string}
   */
  getTypeName() {
    return typeof this.value;
  }

  /**
   * @template U
   * @overload
   * @param {(y: T) => U} fn
   * @returns {U}
   */
  /**
   * @overload
   * @returns {T}
   */
  /**
   * @param {(y: T) => unknown} [fn]
   * @returns {unknown}
   */
  transform(fn) {
    return fn ? fn(this.value) : this.value;
  }
}


//// [jsFileMethodOverloads.js]
/**
 * @template T
 */
class Example {
    /**
     * @param {T} value
     */
    constructor(value) {
        this.value = value;
    }
    /**
     * @overload
     * @param {Example<number>} this
     * @returns {'number'}
     */
    /**
     * @overload
     * @param {Example<string>} this
     * @returns {'string'}
     */
    /**
     * @returns {string}
     */
    getTypeName() {
        return typeof this.value;
    }
    /**
     * @template U
     * @overload
     * @param {(y: T) => U} fn
     * @returns {U}
     */
    /**
     * @overload
     * @returns {T}
     */
    /**
     * @param {(y: T) => unknown} [fn]
     * @returns {unknown}
     */
    transform(fn) {
        return fn ? fn(this.value) : this.value;
    }
}


//// [jsFileMethodOverloads.d.ts]
/**
 * @template T
 */
declare class Example<T> {
    /**
     * @param {T} value
     */
    constructor(value: T);
    /**
     * @overload
     * @param {Example<number>} this
     * @returns {'number'}
     */
    /**
     * @overload
     * @param {Example<string>} this
     * @returns {'string'}
     */
    /**
     * @returns {string}
     */
    getTypeName(this: Example<number>): 'number';
    /**
     * @overload
     * @param {Example<number>} this
     * @returns {'number'}
     */
    /**
     * @overload
     * @param {Example<string>} this
     * @returns {'string'}
     */
    /**
     * @returns {string}
     */
    getTypeName(this: Example<string>): 'string';
    /**
     * @template U
     * @overload
     * @param {(y: T) => U} fn
     * @returns {U}
     */
    /**
     * @overload
     * @returns {T}
     */
    /**
     * @param {(y: T) => unknown} [fn]
     * @returns {unknown}
     */
    transform<U>(fn: (y: T) => U): U;
    /**
     * @template U
     * @overload
     * @param {(y: T) => U} fn
     * @returns {U}
     */
    /**
     * @overload
     * @returns {T}
     */
    /**
     * @param {(y: T) => unknown} [fn]
     * @returns {unknown}
     */
    transform(): T;
}
