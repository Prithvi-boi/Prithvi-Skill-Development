# TypeScript Special Types: `any`, `unknown`, and `never`

TypeScript provides some special types that behave differently from normal types like `string`, `number`, and `boolean`.

The three important special types are:

- `any`
- `unknown`
- `never`

---

## 1. `any` Type

The `any` type disables TypeScript's type checking for a variable. You can assign any value to it and perform any operation without TypeScript reporting a type error.

### Example

```ts
let value: any = 10;

value = "Hello";
value = true;
value = { name: "Prithvi" };

console.log(value.toUpperCase()); // No TypeScript error
```

**Important points:**
- Accepts values of any type.
- Allows any operation without type checking.
- Removes type safety.
- Should be avoided unless necessary.

---

## 2. `unknown` Type

The `unknown` type can store any value, just like `any`. However, TypeScript requires you to check the type before performing operations on it.

### Example

```ts
let value: unknown = "Hello";

// console.log(value.toUpperCase()); // Error

if (typeof value === "string") {
    console.log(value.toUpperCase()); // Works
}
```

**Important points:**
- Accepts values of any type.
- Does not allow operations without type checking.
- Provides better type safety than `any`.
- Useful when handling data from APIs or other uncertain sources.

---

## 3. `never` Type

The `never` type represents a value that can never occur.

It is commonly used for functions that never finish execution normally, such as functions that throw errors or run infinite loops.

### Example 1: Function that throws an error

```ts
function throwError(message: string): never {
    throw new Error(message);
}
```

### Example 2: Infinite loop

```ts
function infiniteLoop(): never {
    while (true) {
        console.log("Running...");
    }
}
```

**Important points:**
- Represents values that never occur.
- Cannot be assigned a normal value.
- Used for functions that never return normally.
- Also useful for exhaustive type checking.

---

## 4. Difference Between `any` and `unknown` 

| Feature | `any` | `unknown` |
|---|---|---|
| Accepts any value | Yes | Yes | 
| Allows operations without checking | Yes | No | 
| Provides type safety | No | Yes | Yes |
| Can be assigned to other types | Yes | Only after narrowing or assertion | 
| Represents | Any value without checking | Any value with checking | 


## 5. Top Types and Bottom Types

These are concepts used to describe the TypeScript type system.

### Top Types

A top type is a type that can represent any possible value in the type system.

TypeScript has two important top types:

- `unknown`
- `any`

**`unknown`** is the safer top type because it requires type checking before performing operations.

**`any`** is an unsafe top type because it bypasses normal type checking.

### Bottom Type

A bottom type represents a type with no possible values.

In TypeScript, `never` is the bottom type.

```ts
let value: never;

// value = 10;      // Error
// value = "Hello"; // Error
```

Why?

Because `never` represents something that cannot exist.

### Visual Representation

```text
          TOP TYPES
       ┌──────────────┐
       │ unknown / any│
       └──────────────┘
               |
               v
       ┌──────────────┐
       │ Other Types  │
       │              │
       │ string       │
       │ number       │
       │ boolean      │
       │ object       │
       └──────────────┘
               |
               v
       ┌──────────────┐
       │    never     │
       └──────────────┘
         BOTTOM TYPE
```

**Note:** `any` is special because it escapes normal type-system rules. Technically, `unknown` is the safe top type and `never` is the bottom type.

---