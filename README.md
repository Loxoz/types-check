# @loxoz/types-check

A collection of handy functions to quickly check types in your code.

[**npm**](https://www.npmjs.com/package/@loxoz/types-check)

✨ This library **fully supports TypeScript** and **will infer the checked type** to the variable.

👉 The main goal of this library is to **reduce bundle size** when checking for types (like more than two or three times) in your **web app**, but i also like this way of writing code with type checks.

It will also work using commonjs's `require` like this: `const { isStr } = require('@loxoz/types-check);`

## Examples

```js
import { isObj, isStr } from '@loxoz/types-check';

let data = null;

fetch("/api/data")
  .then(res => res.json())
  .then(json => {
    if (isObj(json)) data = json;
  });

// ... somewhere else ...

if (isStr(data.name)) {
    // data.name is now a string
    // ...
}
```

## API

## 🧪 primitives

### isType

```ts
isType(o: any, t: string): o is JSType[T];
```
Exactly the same as a `typeof` (`typeof o === t`) used by other functions of this library to reduce bundle size.

You should check the other functions provided by this library first before using this one.

### isStr

```ts
isStr(o: any): boolean
```

Checks if `o` is a `string`

### isNum

```ts
isNumber(o: any): boolean
```

Checks if `o` is a `number`

### isObj

```ts
isObj(o: any): boolean
```

Checks if `o` is an `object`

This will include class instances, if you don't want that, look at [isObjStrict](#isobjstrict)

For typescript convenience, the inferred type is a Record

*Note*: this function won't include functions and null (`typeof null === "object"` is truthy)

### isFunc

```ts
isFunc(o: any): boolean
```

Checks if `o` is a `function`

> The inferred type is `(...args: unknown[]) => unknown`

### isDef

```ts
isDef(o: any): boolean
```

Checks if `o` is neither `null` nor `undefined`

This function is just here for coding preferences but can actually save some bundle size if you use it a lot in your code.

Doing `o != null` is exactly the same (since it does that under the hood)

Also see [isUndef](#isundef)

### isUndef

```ts
isUndef(o: any): boolean
```

Checks if `o` is either `null` or `undefined`

This function is just here for coding preferences but can actually save some bundle size if you use it a lot in your code.

Doing `o == null` is exactly the same (since it does that under the hood)

Also see [isDef](#isdef)

### isDefNull

```ts
isDefNull(o: any): boolean
```

Checks if `o` is not `undefined` (but can be `null`)

This function is just here for coding preferences but can actually save some bundle size if you use it a lot in your code.

Doing `o !== undefined` is exactly the same (since it does that under the hood)

Also see [isDef](#isdef)

### other

There is also `isBigInt`, `isBool` and `isSymbol`, but they aren't used often so omitted from the docs

## 📦 objects

### isArr

```ts
isArr(o: any): boolean
```

Checks if `o` is an `Array` (`unkown[]`, can be changed using the `T` type parameter for `T[]`)

### isObjStrict

```ts
isObjStrict(o: any): boolean
```

Will ensure that `o` is an `object` created using `{}`, `Object()` or `Object.create()`

*Warning*: this method is much slower than [isObj](#isobj)

This function won't include class instances, if you want that, look at [isObj](#isobj)

> The inferred type is `{ [x: string | symbol]: any }`

## 🧱 helpers

### isNonEmptyStr

```ts
isNonEmptyStr(o: any): boolean
```

Checks if `o` is a `string` with a least one character

### isNonEmptyArr

```ts
isNonEmptyArr(o: any): boolean
```

Checks if `o` is an `Array` (`unkown[]`, can be changed using the `T` type parameter for `T[]`) with a least one element

### isArrTyped

```ts
isArrTyped(o: any, predicate: (value: unknown, index: number, array: unknown[]) => boolean): boolean
```

Checks if `o` is an `Array` and all of its members satisfy the specified predicate to infer the type of that predicate  
For e.g. `isArrTyped(arr, isStr)` will infer the type `string[]`

## Advices

If you need more complex type checking for example on objects or arrays, i recommend you take a look at [superstruct](https://www.npmjs.com/package/superstruct).
