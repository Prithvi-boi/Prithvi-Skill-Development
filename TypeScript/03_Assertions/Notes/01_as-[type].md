# TypeScript: Type Assertion (`as`)

## 1. What is Type Assertion?

Type Assertion is a way of telling TypeScript to treat a value as a specific type.

It is useful when TypeScript cannot automatically determine the exact type of a value, but we know more about that value.

### Syntax

```ts
let value = someValue as Type;
```

Example:

```ts
let value: unknown = "Hello TypeScript";

let result = value as string;

console.log(result.toUpperCase());
```

Here, `value as string` tells TypeScript to treat `value` as a string.

---

## 2. Type Assertion Does NOT Change the Actual Type

**Important:** Type Assertion only affects how TypeScript understands a value. It does not change or convert the actual value at runtime.

Example:

```ts
let value: unknown = 100;

let result = value as string;

console.log(typeof result); // "number"
```

Although TypeScript treats `result` as a string, the actual value is still a number.

This is because type assertions are removed during compilation.

### Incorrect Assertion Example

```ts
let value: unknown = 100;

let result = value as string;

console.log(result.toUpperCase()); // Runtime error!
```

Why?

- TypeScript trusts our assertion.
- The actual value is still a number.
- Numbers do not have the `toUpperCase()` method.

**Remember:** TypeScript does not verify whether your assertion is correct at runtime.

---

## 3. Type Assertion vs Type Conversion

These two concepts are different.

| Type Assertion | Type Conversion |
|---|---|
| Tells TypeScript to treat a value as a particular type | Actually converts a value into another type |
| Uses `as` | Uses `String()`, `Number()`, etc. |
| No runtime conversion | Happens at runtime |
| Only affects type checking | Changes the actual value's type when conversion succeeds |

### Example

```ts
let value: unknown = "100";

// Type Assertion
let a = value as number;

// Type Conversion
let b = Number(value);

console.log(typeof a); // "string"
console.log(typeof b); // "number"
```

Notice that `a` is still a string at runtime, while `b` is an actual number.

---

## 4. Type Assertion with Objects

We can also assert an object's type using an interface.

```ts
interface Student {
    name: string;
    age: number;
}

const student = {
    name: "Prithvi",
    age: 20
} as Student;
```

Now TypeScript treats `student` as the `Student` type.

However, when creating a new object, prefer a normal type annotation:

```ts
const student: Student = {
    name: "Prithvi",
    age: 20
};
```

A type annotation checks that the object satisfies the interface, whereas an assertion tells TypeScript to trust the specified type.

---

## 5. Type Assertion with DOM Elements

A common use case is working with HTML elements.

```ts
const input = document.getElementById("username") as HTMLInputElement;

console.log(input.value);
```

`getElementById()` returns an `HTMLElement | null`.

Since not every HTML element has a `value` property, we assert that this particular element is an `HTMLInputElement`.

**Note:** An assertion does not check whether the element actually exists or is an input element. You should validate that when necessary.

---

## 6. Different Syntaxes

There are two ways to write type assertions.

### Using `as` (Recommended)

```ts
let value: unknown = "Hello";

let result = value as string;
```

### Using Angle Brackets

```ts
let value: unknown = "Hello";

let result = <string>value;
```

Both are equivalent.

**Recommendation:** Prefer `as` syntax because angle-bracket assertions can conflict with JSX syntax in React and TSX files.

---

## 7. Double Type Assertion

Sometimes TypeScript does not allow direct assertions between unrelated types.

```ts
let value = "Hello";

let result = value as number; // Error
```

We may encounter this syntax:

```ts
let result = value as unknown as number;
```

This forces the assertion through `unknown`.

However, it does not convert the string into a number. It only bypasses TypeScript's compatibility check.

Avoid using it unless you have a specific reason.

---

## 8. Important Things to Remember

- `as` is used for Type Assertion.
- It tells TypeScript to treat a value as a particular type.
- It does not actually change the value's type at runtime.
- It does not perform type conversion.
- Assertions are removed during TypeScript compilation.
- TypeScript trusts your assertion, even if it is incorrect.
- Use type annotations when declaring variables and objects.
- Prefer type narrowing and runtime validation when working with uncertain values.
- Avoid unnecessary type assertions.

### Quick Summary

```ts
// Type Assertion
let a = value as string;

// Type Conversion
let b = String(value);

// Type Annotation
let c: string = "Hello";
```

**Final takeaway:** Type Assertion changes how TypeScript *treats* a value, not what the value actually *is*.