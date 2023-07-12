// types
export interface JSType {
  "string": string;
  "number": number;
  "bigint": bigint;
  "boolean": boolean;
  "symbol": symbol;
  "object": object;
  "function": Function;
  "undefined": undefined;
}

export type NonUndefined<T> = T extends undefined ? never : T;


// primitives

/**
 * Exactly the same as a `typeof` (`typeof o === t`) used
 * by other functions of this library to reduce bundle
 * size.
 * 
 * You should check the other functions provided by
 * this library first before using this one.
 */
export function isType<T extends keyof JSType>(o: unknown, t: T): o is JSType[T] {
  return typeof o === t;
}

/** Checks if `o` is a `string` */
export function isStr(o: unknown): o is string {
  return isType(o, "string");
}

/** Checks if `o` is a `number` */
export function isNum(o: unknown): o is number {
  return isType(o, "number");
}

/**
 * Checks if `o` is an `object`
 * 
 * This will include class instances, if you don't want
 * that, look at {@link isObjStrict}
 * 
 * For typescript convenience, the inferred type is a Record
 * 
 * *Note*: this function won't include functions and null
 * (`typeof null === "object"` is truthy)
 */
export function isObj(o: unknown): o is Record<keyof any, any> {
  return o !== null && isType(o, "object") && !isArr(o);
}

/** Checks if `o` is a `function` */
export function isFunc(o: unknown): o is Function {
  return isType(o, "function");
}

/**
 * Checks if `o` is neither `null` nor `undefined`
 * 
 * This function is just here for coding preferences but
 * can actually save some bundle size if you use it a
 * lot in your code.
 * 
 * Doing `o != null` is exactly the same (since it does
 * that under the hood)
 * 
 * Also see {@link isUndef}
 */
export function isDef(o: unknown): o is NonNullable<typeof o> {
  return o != null;
}

/**
 * Checks if `o` is either `null` or `undefined`
 * 
 * This function is just here for coding preferences but
 * can actually save some bundle size if you use it a
 * lot in your code.
 * 
 * Doing `o == null` is exactly the same (since it does
 * that under the hood)
 * 
 * Also see {@link isDef}
 */
export function isUndef(o: unknown): o is null | undefined {
  return o == null;
}

/**
 * Checks if `o` is not `undefined` (but can be `null`)
 * 
 * This function is just here for coding preferences but
 * can actually save some bundle size if you use it a
 * lot in your code.
 * 
 * Doing `o !== undefined` is exactly the same (since it
 * does that under the hood)
 * 
 * Also see {@link isDef}
 */
 export function isDefNull(o: unknown): o is NonUndefined<typeof o> {
  return o !== undefined;
}

export function isBigInt(o: unknown): o is bigint {
  return isType(o, "bigint");
}

export function isBool(o: unknown): o is boolean {
  return isType(o, "boolean");
}

export function isSymbol(o: unknown): o is symbol {
  return isType(o, "symbol")
}

// objects

/** Checks if `o` is an `Array` (`any[]`, for convenience) */
export function isArr(o: unknown): o is any[] {
  return Array.isArray(o);
}

/**
 * Will ensure that `o` is an `object` created using `{}`,
 * `Object()` or `Object.create({})`
 * 
 * *Warning*: this method is much slower than {@link isObj}
 * 
 * This function won't include class instances, if you
 * want that, look at {@link isObj}
 */
export function isObjStrict(o: unknown): o is Record<keyof any, any> {
  return o !== null && isType(o, "object") && Object.getPrototypeOf(o) === Object.prototype;
}

// helpers

/** Checks if `o` is a `string` with a least one character */
export function isNonEmptyStr(o: unknown): o is string {
  return isStr(o) && o.length > 0;
}

/** Checks if `o` is an `Array` (`any[]`, for convenience) with a least one element */
export function isNonEmptyArr(o: unknown): o is any[] {
  return isArr(o) && o.length > 0;
}

/** Checks if `o` is an `Array` and all of its members satisfy the specified predicate to infer the type of that predicate */
export function isArrTyped<T>(o: unknown, predicate: (value: unknown, index: number, array: unknown[]) => value is T): o is T[] {
  return isArr(o) && o.every(predicate);
}

// assertion
export class AssertionError extends TypeError {}

export function assert<T>(o: unknown, predicate: (value: unknown) => value is T, message?: string): asserts o is T {
  if (!predicate(o)) throw new AssertionError(message);
}
