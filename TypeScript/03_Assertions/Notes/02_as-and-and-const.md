# TypeScript: `as any` and `as const`

## 1. Type Assertion: `as any`

`as any` tells TypeScript to treat a value as `any`, effectively bypassing type checking for that expression.

Normally, TypeScript checks whether we're accessing properties or performing operations that are valid for a particular type.

### Example without `as any`

```ts
let value: unknown = "Hello";

console.log(value.toUpperCase()); // Error
```

Because `value` is `unknown`, TypeScript does not allow us to access its properties without narrowing or assertion.

### Example with `as any`

```ts
let value: unknown = "Hello";

console.log((value as any).toUpperCase()); // Works
```

Here, `as any` tells TypeScript:

"Don't check the type of this expression. Allow me to perform the operation."

### Dangerous Example

```ts
let value: unknown = 100;

console.log((value as any).toUpperCase()); // Runtime error
```

Why?

- `as any` bypasses TypeScript's type checking.
- It does not change the actual value.
- The actual value is still a number.
- Numbers do not have the `toUpperCase()` method.

### When is `as any` useful?

- Working with poorly typed third-party libraries.
- Temporarily handling legacy JavaScript code.
- Testing or debugging situations where you need to bypass type checking.

**Important:** Avoid using `any` unnecessarily because it weakens TypeScript's type safety. Prefer `unknown` with proper type narrowing whenever possible.

---

## 2. Type Assertion: `as const`

`as const` tells TypeScript to infer the most specific possible types for a value instead of widening them to general types.

It also makes object properties and array elements readonly in the resulting type.

### Example 1: Normal Type Inference

```ts
let name = "Prithvi";
```

TypeScript infers:

```ts
let name: string;
```

Even though the current value is `"Prithvi"`, TypeScript considers it a general string because it can be reassigned.

### Example 2: Using `as const`

```ts
let name = "Prithvi" as const;
```

Now TypeScript infers:

```ts
let name: "Prithvi";
```

The type is the exact string literal `"Prithvi"`, not the general `string` type.

```ts
name = "Rahul"; // Error
```

Why?

Because `"Rahul"` is not assignable to the literal type `"Prithvi"`.

---

## 3. `as const` with Objects

Consider this object:

```ts
const student = {
    name: "Prithvi",
    age: 20
};
```

Normally, TypeScript infers:

```ts
{
    name: string;
    age: number;
}
```

Now use `as const`:

```ts
const student = {
    name: "Prithvi",
    age: 20
} as const;
```

TypeScript infers:

```ts
{
    readonly name: "Prithvi";
    readonly age: 20;
}
```

Notice two things:

1. Properties become `readonly`.
2. Values become literal types.

Therefore:

```ts
student.name = "Rahul"; // Error
student.age = 21;       // Error
```

**Important:** `as const` provides compile-time readonly protection. It does not freeze the object at runtime.

---

## 4. `as const` with Arrays

### Without `as const`

```ts
const departments = ["BCA", "BCOM", "BBA"];
```

TypeScript infers:

```ts
string[];
```

This means the array can contain any string.

### With `as const`

```ts
const departments = ["BCA", "BCOM", "BBA"] as const;
```

TypeScript infers:

```ts
readonly ["BCA", "BCOM", "BBA"]
```

This is a readonly tuple containing three exact string literal types.

You cannot modify its elements:

```ts
departments.push("MBA"); // Error
departments[0] = "MBA";  // Error
```

---

## 5. Practical Example: `as const` with `keyof typeof`

This combination is especially useful when working with objects and dynamic property access.

### Step 1: Create an object using `as const`

```ts
const departments = {
    BCA: "Bachelor of Computer Application",
    BCOM: "Bachelor of Commerce",
    BBA: "Bachelor of Business Administration"
} as const;
```

### Step 2: Extract the keys

```ts
type DepartmentKeys = keyof typeof departments;
```

Result:

```ts
type DepartmentKeys = "BCA" | "BCOM" | "BBA";
```

### Step 3: Extract the values

```ts
type DepartmentValues =
    typeof departments[keyof typeof departments];
```

Result:

```ts
type DepartmentValues =
    | "Bachelor of Computer Application"
    | "Bachelor of Commerce"
    | "Bachelor of Business Administration";
```

### Step 4: Use the types in a function

```ts
function getDepartment(key: DepartmentKeys): DepartmentValues {
    return departments[key];
}

console.log(getDepartment("BCA"));

// Error: Invalid department key
getDepartment("MBA");
```

This pattern allows TypeScript to understand the exact possible keys and values of an object.

---

## 6. Difference Between `as any` and `as const`

| Feature | `as any` | `as const` |
|---|---|---|
| Purpose | Bypass type checking | Preserve literal types |
| Type safety | Weakens type safety | Makes types more restrictive |
| Object properties | No special readonly behavior | Becomes readonly |
| Arrays | No special readonly behavior | Becomes readonly tuples |
| Literal types | No | Yes |
| Runtime effect | None | None |

---

## 7. Important Things to Remember

### `as any`

- Tells TypeScript to treat an expression as `any`.
- Bypasses type checking for that expression.
- Does not change the actual runtime value.
- Can lead to runtime errors if used incorrectly.
- Prefer `unknown` when handling uncertain data.

### `as const`

- Preserves exact literal types.
- Makes object properties readonly.
- Converts arrays into readonly tuples.
- Does not freeze objects or arrays at runtime.
- Useful for constants, configuration objects, routes, and fixed option lists.

### Quick Summary

```ts
// Bypass type checking
let value = someValue as any;

// Preserve exact literal types
const name = "Prithvi" as const;

// Readonly object with literal types
const student = {
    name: "Prithvi",
    age: 20
} as const;

// Readonly tuple
const departments = ["BCA", "BCOM", "BBA"] as const;

// Extract object keys
type DepartmentKeys = keyof typeof departments;
```

**Final takeaway:**

- `as any` gives TypeScript less information and weakens type safety.
- `as const` gives TypeScript more precise information and makes the resulting type more restrictive.