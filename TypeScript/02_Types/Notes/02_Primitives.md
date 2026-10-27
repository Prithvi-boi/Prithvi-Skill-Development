
# TypeScript Primitive Types

## Introduction

In TypeScript, **primitive types** represent the most basic values that are not objects. They are the building blocks used to define the types of variables, parameters, and return values.

JavaScript has **7 primitive data types**, and TypeScript provides corresponding type annotations for them.

The seven primitive types are:

1. `string`
2. `number`
3. `boolean`
4. `bigint`
5. `symbol`
6. `undefined`
7. `null`

---

## 1. String

The `string` type is used to represent textual data, such as names, messages, addresses, and other text.

### Example

```ts
let username: string = "Prithvi";
let message: string = "Hello World";

console.log(username);
console.log(message);
```

You can use single quotes, double quotes, or template literals.

```ts
let firstName: string = "Prithvi";
let lastName: string = 'Beldar';

let fullName: string = `${firstName} ${lastName}`;

console.log(fullName);
```

> **Key Thing — String Literal Types**
>
> TypeScript supports string literal types, which restrict a variable to specific string values.

```ts
let direction: "left" | "right" | "center";

direction = "left";  // Valid
direction = "right"; // Valid

// direction = "up"; // Error
```

Useful when defining fixed options, such as themes, status values, and button variants.

---

## 2. Number

The `number` type represents all numeric values, including:

- Integers (`10`, `20`, `100`)
- Floating-point numbers (`10.5`, `20.75`)
- Negative numbers (`-10`)
- Special numeric values (`Infinity`, `-Infinity`, `NaN`)

### Example

```ts
let age: number = 21;
let price: number = 499.99;
let temperature: number = -5;

console.log(age);
console.log(price);
console.log(temperature);
```

Unlike some other programming languages, TypeScript does not have separate `int`, `float`, or `double` types. All of them are represented by `number`.

### Example — Type Safety

```ts
let score: number = 100;

score = 200;   // Valid
score = 10.5;  // Valid

// score = "100"; // Error
```

> **Key Thing**
>
> TypeScript prevents you from assigning a string to a variable declared as `number`.

---

## 3. Boolean

The `boolean` type represents logical values. It has only two possible values:

- `true`
- `false`

### Example

```ts
let isLoggedIn: boolean = true;
let isAdmin: boolean = false;

console.log(isLoggedIn);
console.log(isAdmin);
```

### Practical Example

```ts
let age: number = 20;

let canVote: boolean = age >= 18;

console.log(canVote); // true
```

> **Key Thing — Truthy and Falsy Values**
>
> JavaScript has truthy and falsy values, but TypeScript's `boolean` type accepts only actual boolean values.

```ts
let isActive: boolean = true;

// isActive = 1;       // Error
// isActive = "true";  // Error
```

---

## 4. BigInt

The `bigint` type represents integers that are larger than the maximum safe integer supported by JavaScript's `number` type.

JavaScript's maximum safe integer is:

```ts
Number.MAX_SAFE_INTEGER;
// 9007199254740991
```

When you need to work with integers larger than this, you can use `bigint`.

### Example

```ts
let bigNumber: bigint = 9007199254740992n;

let anotherNumber: bigint = 12345678901234567890n;

console.log(bigNumber);
console.log(anotherNumber);
```

Notice the `n` at the end of the number. It identifies a BigInt literal.

### Important Difference

```ts
let num: number = 100;
let bigNum: bigint = 100n;

// let result = num + bigNum; // Error
```

You cannot directly perform arithmetic between `number` and `bigint`.

> **Key Things**
>
> - BigInt is intended for large integers, not decimal numbers.
> - BigInt cannot be mixed directly with `number` in arithmetic operations.
> - Your TypeScript compilation target should be `ES2020` or newer.

In `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020"
  }
}
```

---

## 5. Symbol

The `symbol` type represents a unique and immutable identifier.

Every time you create a Symbol, it produces a unique value, even if you provide the same description.

### Example

```ts
let id1: symbol = Symbol("id");
let id2: symbol = Symbol("id");

console.log(id1 === id2); // false
```

Even though both Symbols have the same description (`"id"`), they are different.

### Practical Example

```ts
const userId = Symbol("userId");

const user = {
    name: "Prithvi",
    [userId]: 101
};

console.log(user[userId]); // 101
```

Here, Symbol is used as a unique object property key.

> **Key Things**
>
> - Every call to `Symbol()` creates a unique value.
> - Symbols are commonly used for unique object property keys.
> - They are not interchangeable with strings or numbers.

---

## 6. Undefined

The `undefined` type represents a value that has not been assigned or is missing.

### Example

```ts
let username: undefined = undefined;

console.log(username); // undefined
```

A common JavaScript example is declaring a variable without assigning a value.

```ts
let age: number;

console.log(age); // undefined
```

In TypeScript, the variable `age` is still typed as `number`, even though its runtime value is initially `undefined`.

### Another Example

```ts
function getUser() {
    // No return statement
}

let result = getUser();

console.log(result); // undefined
```

> **Key Thing**
>
> You will commonly encounter `undefined` when:
>
> - A variable has not been assigned a value.
> - An object property does not exist.
> - A function does not return a value.
> - An optional parameter or property is missing.

---

## 7. Null

The `null` type represents an intentional absence of a value.

In simple terms, you use `null` when you explicitly want to indicate that something has no value.

### Example

```ts
let selectedUser: null = null;

console.log(selectedUser); // null
```

### Practical Example

Imagine a user who has not selected a profile picture yet.

```ts
let profilePicture: string | null = null;

// Later, the user uploads a picture.
profilePicture = "profile.png";
```

Here, `string | null` means that the variable can contain either a string or `null`.

> **Key Thing — Null vs Undefined**
>
> `null` and `undefined` are different:
>
> | `null` | `undefined` |
> |---|---|
> | Intentional absence of a value | Value is missing or unassigned |
> | Explicitly assigned | Often occurs automatically |
> | Represents an empty value | Represents an uninitialized or missing value |

---

# Summary of Primitive Types

| Type | Description | Example |
|---|---|---|
| `string` | Textual data | `"Hello"` |
| `number` | Numeric values | `100`, `10.5` |
| `boolean` | Logical values | `true`, `false` |
| `bigint` | Large integers | `100n` |
| `symbol` | Unique identifiers | `Symbol("id")` |
| `undefined` | Missing/unassigned value | `undefined` |
| `null` | Intentional absence of value | `null` |

---

# Important Things You Should Know

These are additional TypeScript concepts worth understanding alongside primitive types.


## 1. `null` and `undefined` with `strictNullChecks`

This is particularly important.

TypeScript has a compiler option called `strictNullChecks`.

When enabled, `null` and `undefined` cannot be assigned to other types unless you explicitly allow them.

### Example

```ts
let username: string = "Prithvi";

// username = null;      // Error
// username = undefined; // Error
```

To allow both strings and null:

```ts
let username: string | null = "Prithvi";

username = null;   // Valid
username = "Alex"; // Valid
```

---

## 2. Primitive Types vs Wrapper Objects

This is a common beginner mistake.

Always use lowercase primitive types in TypeScript.

### Recommended

```ts
let username: string = "Prithvi";
let age: number = 21;
let isActive: boolean = true;
```

### Avoid

```ts
let username: String = "Prithvi";
let age: Number = 21;
let isActive: Boolean = true;
```

**Why?**

- `string`, `number`, and `boolean` represent primitive values.
- `String`, `Number`, and `Boolean` represent wrapper object types.

Use lowercase types unless you have a specific reason not to.

---

## 3. Check Types Using `typeof`

JavaScript provides the `typeof` operator, which also works in TypeScript.

### Example

```ts
let username = "Prithvi";
let age = 21;
let isActive = true;

console.log(typeof username); // "string"
console.log(typeof age);      // "number"
console.log(typeof isActive); // "boolean"
```

One interesting thing:

```ts
console.log(typeof null);      // "object"
console.log(typeof undefined); // "undefined"
console.log(typeof 100n);      // "bigint"
console.log(typeof Symbol());  // "symbol"
```

> **Key Thing**
>
> `typeof null` returning `"object"` is a historical JavaScript quirk. It does not mean that `null` is actually an object.

---