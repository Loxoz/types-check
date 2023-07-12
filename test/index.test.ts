import { describe, expect, test } from "@jest/globals";
import { TestClass } from "./entities";
import { JSType, assert, isArr, isArrTyped, isBigInt, isBool, isDef, isDefNull, isFunc, isNonEmptyArr, isNonEmptyStr, isNum, isObj, isObjStrict, isStr, isSymbol, isType, isUndef } from "../src/index";

describe("types-check", () => {
  test("isType - should test for default correct javascript types as `typeof`", () => {
    const types: (keyof JSType)[] = ["string", "number", "bigint", "boolean", "symbol", "object", "function", "undefined"];
    const test_values = ["string", 42, 128n, true, Symbol(), {}, () => {}, undefined];

    for (const [idx_t, type] of types.entries()) {
      for (const [idx_v, value] of test_values.entries()) {
        let result = isType(value, type);
        if (idx_t === idx_v) expect(result).toBeTruthy();
        else expect(result).toBeFalsy();
      }
    }
  });

  test("isStr - should check for `string`", () => {
    expect(isStr("hello world")).toBeTruthy();

    expect(isStr(42)).toBeFalsy();
  });

  test("isNum - should check for `number`", () => {
    expect(isNum(42)).toBeTruthy();

    expect(isNum(new Number(42))).toBeFalsy();
    expect(isNum("0")).toBeFalsy();
    expect(isNum({})).toBeFalsy();
  });

  test("isObj - should check for objects, records and class instances", () => {
    expect(isObj({})).toBeTruthy();
    expect(isObj(Object.create(null))).toBeTruthy();
    expect(isObj(new TestClass())).toBeTruthy();
    expect(isObj(new Map())).toBeTruthy();

    expect(isObj(null)).toBeFalsy();
    expect(isObj("hello world")).toBeFalsy();
    expect(isObj(42)).toBeFalsy();
  });

  test("isFunc - should check for `Function`", () => {
    expect(isFunc(function () {})).toBeTruthy();
    expect(isFunc(() => {})).toBeTruthy();
    expect(isFunc(isNaN)).toBeTruthy();
    expect(isFunc("hello world".toUpperCase)).toBeTruthy();

    expect(isFunc("hello world")).toBeFalsy();
    expect(isFunc(true)).toBeFalsy();
  });

  test("isDef - should check for non nullable value", () => {
    expect(isDef("hello world")).toBeTruthy();
    expect(isDef(42)).toBeTruthy();
    expect(isDef(0)).toBeTruthy();
    expect(isDef("")).toBeTruthy();

    expect(isDef(null)).toBeFalsy();
    expect(isDef(undefined)).toBeFalsy();
  });

  test("isUndef - should check for `null` and `undefined`", () => {
    expect(isUndef(null)).toBeTruthy();
    expect(isUndef(undefined)).toBeTruthy();
    expect(isUndef(void 0)).toBeTruthy();

    expect(isUndef("")).toBeFalsy();
    expect(isUndef(0)).toBeFalsy();
    expect(isUndef([])).toBeFalsy();
  });

  test("isDefNull - should check for a value that is not undefined", () => {
    expect(isDefNull("hello world")).toBeTruthy();
    expect(isDefNull(42)).toBeTruthy();
    expect(isDefNull(0)).toBeTruthy();
    expect(isDefNull("")).toBeTruthy();
    expect(isDefNull(null)).toBeTruthy();
    
    expect(isDefNull(undefined)).toBeFalsy();
  });

  test("isBigInt - should check for `bigint`", () => {
    expect(isBigInt(128n)).toBeTruthy();
    expect(isBigInt(BigInt(128))).toBeTruthy();

    expect(isBigInt(128)).toBeFalsy();
    expect(isBigInt("hello world")).toBeFalsy();
  });

  test("isBool - should check for `boolean`", () => {
    expect(isBool(true)).toBeTruthy();
    expect(isBool(false)).toBeTruthy();
    expect(isBool(!1)).toBeTruthy();

    expect(isBool("true")).toBeFalsy();
    expect(isBool(1)).toBeFalsy();
  });

  test("isSymbol - should check for `symbol`", () => {
    expect(isSymbol(Symbol())).toBeTruthy();
    expect(isSymbol(Symbol.iterator)).toBeTruthy();
    expect(isSymbol(Symbol.toPrimitive)).toBeTruthy();

    expect(isSymbol("hello world")).toBeFalsy();
    expect(isSymbol(42)).toBeFalsy();
  });

  test("isArr - should check for `Array` (`any[]`)", () => {
    expect(isArr([])).toBeTruthy();
    expect(isArr(["hello", "world", 42])).toBeTruthy();
    expect(isArr(new Array(10))).toBeTruthy();

    expect(isArr({})).toBeFalsy();
    expect(isArr(new TestClass())).toBeFalsy();
    expect(isArr(new Set())).toBeFalsy();
    expect(isArr("hello world")).toBeFalsy();
  });

  test("isObjStrict - should check for strict `object`", () => {
    expect(isObjStrict({})).toBeTruthy();

    expect(isObjStrict(Object.create(null))).toBeFalsy();
    expect(isObjStrict(new Number(42))).toBeFalsy();
    expect(isObjStrict(new TestClass())).toBeFalsy();
    expect(isObjStrict(new Map())).toBeFalsy();
  });

  test("isNonEmptyStr - should check for non empty `string`", () => {
    expect(isNonEmptyStr("hello world")).toBeTruthy();
    expect(isNonEmptyStr(String(42))).toBeTruthy();

    expect(isNonEmptyStr("")).toBeFalsy();
    expect(isNonEmptyStr(null)).toBeFalsy();
    expect(isNonEmptyStr(undefined)).toBeFalsy();
    expect(isNonEmptyStr([])).toBeFalsy();
    expect(isNonEmptyStr(0)).toBeFalsy();
    expect(isNonEmptyArr({ length: 10 })).toBeFalsy();
  });

  test("isNonEmptyArr - should check for non empty `Array`", () => {
    expect(isNonEmptyArr(["hello", 42, null])).toBeTruthy();
    expect(isNonEmptyArr(new Array(10))).toBeTruthy();

    expect(isNonEmptyArr([])).toBeFalsy();
    expect(isNonEmptyArr(0)).toBeFalsy();
    expect(isNonEmptyArr({ length: 10 })).toBeFalsy();
  });

  test("isArrTyped - should check for `Array<T>`", () => {
    expect(isArrTyped(["Lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipisicing"], isStr)).toBeTruthy();
    expect(isArrTyped([-16, 0, 24, 42, 127], isNum)).toBeTruthy();

    expect(isArrTyped(["hello", "world", 42, null], isStr)).toBeFalsy();
    expect(isArrTyped("", isStr)).toBeFalsy();
    expect(isArrTyped(null, isNum)).toBeFalsy();
  });

  test("assert - should throw is predicate fails", () => {
    expect(() => assert("hello world", isStr)).not.toThrow();

    expect(() => assert(null, isDef)).toThrow();
    expect(() => assert("1", isNum)).toThrow();
  });
});
