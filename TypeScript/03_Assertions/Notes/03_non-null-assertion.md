# TypeScript: Non-null Assertion (`!`)

## 1. What is Non-null Assertion?

The Non-null Assertion operator (`!`) tells TypeScript that a value is not `null` or `undefined`, even when TypeScript cannot guarantee it.

It is useful when you know a value exists, but TypeScript still considers it potentially `null` or `undefined`.

### Syntax

```ts
value!
```

### Example

```ts
let username: string | null = "Prithvi";

console.log(username.length); // Error may occur if username is null
```

TypeScript knows that `username` could be either a `string` or `null`.

We can use the non-null assertion operator:

```ts
let username: string | null = "Prithvi";

console.log(username!.length);
```

Here, `!` tells TypeScript:

"Trust me, this value is not null or undefined."

---

## 2. Why Do We Need Non-null Assertion?

Consider this example using the DOM:

```ts
const input = document.getElementById("username");

console.log(input.value);
```

TypeScript gives an error because `getElementById()` returns:

```ts
HTMLElement | null
```

This means the element might not exist in the HTML document.

### Using Non-null Assertion

```ts
const input = document.getElementById("username")!;

console.log(input.id);
```

The `!` tells TypeScript that the element definitely exists.

**Important:** This does not check whether the element actually exists. If it is missing, your code can still throw a runtime error.

---

## 3. Non-null Assertion with `undefined`

The operator also works with `undefined`.

```ts
let age: number | undefined = 20;

console.log(age!.toFixed(2));
```

TypeScript now treats `age` as a number instead of `number | undefined`.

---

## 4. Non-null Assertion Does NOT Change the Actual Value

Just like other TypeScript assertions, the non-null assertion operator only affects type checking.

It does not change the actual runtime value.

### Example

```ts
let username: string | null = null;

console.log(username!.length);
```

Even though we used `!`, the actual value is still `null`.

Therefore, this code throws a runtime error.

**Remember:** Non-null assertion is not runtime validation. It simply tells TypeScript to trust you.

---

## 5. Non-null Assertion vs Type Assertion

Both are used to influence TypeScript's type checking, but they have different purposes.

| Non-null Assertion (`!`) | Type Assertion (`as`) |
|---|---|
| Removes `null` and `undefined` from the type | Treats a value as a specified type |
| Uses `!` | Uses `as Type` |
| Does not perform runtime checks | Does not perform runtime checks |
| Example: `username!` | Example: `value as string` |

### Example

```ts
let value: string | null = "Hello";

// Non-null Assertion
let a = value!;

// Type Assertion
let b = value as string;
```

Both tell TypeScript to treat the value as a string in this example, but they communicate different intentions.

---

## 6. Better Alternative: Optional Chaining

Sometimes you don't need to force TypeScript to trust you.

You can use optional chaining (`?.`) to safely access a property when a value might be null or undefined.

### Using Non-null Assertion

```ts
const input = document.getElementById("username")!;

console.log(input.id);
```

### Using Optional Chaining

```ts
const input = document.getElementById("username");

console.log(input?.id);
```

If `input` is `null` or `undefined`, optional chaining returns `undefined` instead of throwing an error.

---

## 7. Better Alternative: Conditional Checking

Another safe approach is to check whether the value exists before accessing it.

```ts
const input = document.getElementById("username");

if (input !== null) {
    console.log(input.id);
}
```

TypeScript understands that `input` cannot be `null` inside the `if` block.

This is called **Type Narrowing**.

---

## 8. Important Things to Remember

- `!` is called the Non-null Assertion operator.
- It tells TypeScript that a value is not `null` or `undefined`.
- It removes `null` and `undefined` from the type for that expression.
- It does not change the actual runtime value.
- It does not perform any runtime validation.
- Incorrect use can cause runtime errors.
- Prefer conditional checks or optional chaining when possible.

### Quick Summary

```ts
// Non-null Assertion
let username: string | null = "Prithvi";
console.log(username!.length);

// Optional Chaining
console.log(username?.length);

// Conditional Checking
if (username !== null) {
    console.log(username.length);
}
```

**Final takeaway:** Use `!` only when you are certain that a value cannot be `null` or `undefined`. Otherwise, prefer optional chaining or proper null checks.