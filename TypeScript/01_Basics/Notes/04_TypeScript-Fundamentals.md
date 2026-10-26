# TypeScript Fundamentals: Compilation & Type System

## 1. Emitting JavaScript with Errors (`noEmitOnError`)

By default, TypeScript can generate JavaScript files even when the code contains type-checking errors.

This follows one of TypeScript's core philosophies: **TypeScript should not prevent you from running JavaScript that may already work, just because its type checker reports an error.**

### Example

```typescript
let username: string = "Prithvi";

username = 123; // TypeScript Error
```

Even though TypeScript reports an error, running `tsc` will still generate the JavaScript file by default.

### `noEmitOnError`

The `noEmitOnError` compiler option controls whether TypeScript should generate JavaScript files when compilation errors exist.

```bash
tsc --noEmitOnError hello.ts
```

Alternatively, configure it in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "noEmitOnError": true
  }
}
```

| Setting | Behavior |
|---|---|
| `false` (default) | Generates JavaScript even if errors exist. |
| `true` | Prevents JavaScript generation if errors exist. |

**Why is the default `false`?**

- **Gradual migration:** Allows existing JavaScript projects to migrate to TypeScript without immediately fixing every type error.
- **Development flexibility:** Developers can continue testing code even when type errors exist.
- **Type errors aren't always runtime errors:** JavaScript may still execute correctly despite TypeScript reporting a type mismatch.

> **Recommendation:** Use `noEmitOnError: true` for new projects and production builds to avoid generating JavaScript from code that fails type-checking.

---

## 2. Explicit Types (Type Annotations)

Type annotations allow us to explicitly specify the types of values that variables, parameters, and other expressions should accept.

### Example

```typescript
function greet(person: string, date: Date) {
    console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}
```

Here:

- `person: string` means the parameter must receive a string.
- `date: Date` means the parameter must receive a Date object.

These declarations are called **type annotations**.

### Type Checking in Function Arguments

TypeScript checks whether the arguments passed to a function match their declared types.

```typescript
function greet(person: string, date: Date) {
    console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}

greet("Maddison", Date()); // Error
```

**Why does this produce an error?**

In JavaScript:

- `Date()` returns the current date as a `string`.
- `new Date()` creates and returns a `Date` object.

Therefore, the correct approach is:

```typescript
greet("Maddison", new Date()); // Correct
```

---

## 3. Type Inference

TypeScript does not always require us to explicitly declare types.

It can automatically determine the type of a variable based on the value assigned to it. This feature is called **Type Inference**.

### Example

```typescript
let message = "Hello World";
```

TypeScript automatically infers that `message` is a `string`.

Its inferred type is equivalent to:

```typescript
let message: string = "Hello World";
```

### Why is Type Inference useful?

- Reduces unnecessary type annotations.
- Makes code cleaner and easier to read.
- Still provides type checking and editor support.

> **Best Practice:** Avoid adding explicit type annotations when TypeScript can already infer the correct type.

---

## 4. Erased Types

TypeScript is a superset of JavaScript, meaning it provides additional features such as type annotations that JavaScript itself does not support.

When TypeScript compiles `.ts` files into `.js` files, most TypeScript-specific syntax is removed. This process is called **Type Erasure**.

### Example: TypeScript Code

```typescript
function greet(person: string, date: Date) {
    console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}

greet("Maddison", new Date());
```

### Generated JavaScript

```javascript
function greet(person, date) {
    console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}

greet("Maddison", new Date());
```

Notice that:

1. `person: string` was removed.
2. `date: Date` was removed.
3. The remaining JavaScript code can execute without TypeScript.

### Important Points

- Type annotations are removed during compilation.
- JavaScript runtimes do not understand TypeScript type annotations.
- TypeScript types provide development-time checking, not runtime type enforcement.

> **Remember:** Type annotations do not change the runtime behavior of your JavaScript program.

---

## 5. Downleveling (`target`)

Downleveling is the process of converting newer JavaScript syntax into older JavaScript syntax to support environments that may not understand newer features.

TypeScript can perform this transformation using the `target` compiler option.

### Example

Consider this TypeScript code:

```typescript
function greet(person: string) {
    console.log(`Hello ${person}!`);
}
```

The template literal syntax (backticks) was introduced in ES2015.

When targeting an older JavaScript version, TypeScript can transform it into:

```javascript
function greet(person) {
    console.log("Hello ".concat(person, "!"));
}
```

The functionality remains the same, but the syntax is compatible with older JavaScript environments.

### Setting the Target

You can specify the JavaScript version using the `target` option.

```bash
tsc --target es2015 hello.ts
```

Or in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2015"
  }
}
```

### Common ECMAScript Versions

| Version | Description |
|---|---|
| ES5 | Older JavaScript standard |
| ES2015 (ES6) | Introduced features like `let`, `const`, arrow functions and template literals |
| ES2016+ | Introduced additional modern JavaScript features |

> **Note:** TypeScript traditionally defaults to ES5 when compiling without a configuration file. Most modern projects can target a newer ECMAScript version, depending on their runtime requirements.

---

## 6. Strictness in TypeScript

TypeScript provides several strictness options that control how carefully it checks your code.

By default, TypeScript allows some potentially unsafe operations to provide flexibility, especially when migrating existing JavaScript projects.

However, for new projects, enabling strict type checking is recommended.

### Enabling Strict Mode

You can enable all major strict type-checking options using:

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

The `strict` option enables multiple strictness checks simultaneously.

Two important options are:

- `noImplicitAny`
- `strictNullChecks`

---

## 7. `noImplicitAny`

Sometimes TypeScript cannot determine the type of a variable or parameter.

In certain situations, it falls back to the `any` type.

The `any` type disables type checking for that value, making it behave more like ordinary JavaScript.

### Example

```typescript
function greet(person) {
    console.log("Hello " + person);
}
```

Here, TypeScript may infer `person` as `any`.

This means you lose some of the benefits of TypeScript's type checking.

### Enabling `noImplicitAny`

```json
{
  "compilerOptions": {
    "noImplicitAny": true
  }
}
```

Now TypeScript reports an error when it cannot infer a type and would otherwise implicitly use `any`.

You can fix it by explicitly declaring the type:

```typescript
function greet(person: string) {
    console.log("Hello " + person);
}
```

**Why use it?**

- Prevents accidental use of `any`.
- Encourages proper type declarations.
- Improves type safety and editor support.

> **Remember:** `noImplicitAny` prevents implicit `any`, but it does not prevent you from explicitly writing `any`.

---

## 8. `strictNullChecks`

In JavaScript, `null` and `undefined` represent missing or absent values.

By default, TypeScript allows these values to be assigned to many other types.

This can lead to runtime errors when we try to use a value that does not actually exist.

### Example

```typescript
let username: string = null;
```

Without `strictNullChecks`, this assignment is allowed.

However, with strict null checking enabled, TypeScript reports an error because `null` is not a `string`.

### Enabling `strictNullChecks`

```json
{
  "compilerOptions": {
    "strictNullChecks": true
  }
}
```

Now you must explicitly account for `null` and `undefined`.

### Handling Nullable Values

If a variable can contain either a string or `null`, use a union type:

```typescript
let username: string | null = null;

username = "Prithvi"; // Valid
username = null;      // Also valid
```

**Why use it?**

- Prevents accidental use of missing values.
- Helps avoid common runtime errors.
- Encourages explicit handling of nullable data.

---

## 9. Quick Revision

| Concept | Purpose |
|---|---|
| `noEmitOnError` | Controls JavaScript generation when errors exist. |
| Type Annotations | Explicitly declare the expected types. |
| Type Inference | Automatically determines types from values. |
| Type Erasure | Removes TypeScript-specific type syntax during compilation. |
| Downleveling | Converts newer JavaScript syntax into older syntax. |
| `target` | Specifies the JavaScript version to compile for. |
| `strict` | Enables strict type-checking options. |
| `noImplicitAny` | Prevents implicit `any` types. |
| `strictNullChecks` | Requires explicit handling of `null` and `undefined`. |

### Recommended Configuration for New Projects

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "strict": true,
    "noEmitOnError": true
  }
}
```

This provides strict type checking, prevents implicit `any`, enforces null safety, and prevents JavaScript output when compilation errors exist.