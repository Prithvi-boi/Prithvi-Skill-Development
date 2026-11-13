# TypeScript – Advanced Types

Advanced Types allow us to create more flexible, reusable, and powerful types by transforming or combining existing types.

## 1. Mapped Types

Mapped Types allow us to create a new type by looping through the properties of an existing type and modifying them.

**In simple words:** Take an existing type, go through each property, and change its type or behavior.

### Syntax

```ts
type NewType = {
  [Key in keyof ExistingType]: NewType;
};
```

### Example

```ts
interface User {
  name: string;
  age: number;
  email: string;
}

// Make every property optional
type OptionalUser = {
  [Key in keyof User]?: User[Key];
};

const user: OptionalUser = {
  name: "Prithvi"
};
```

### Important Concepts

- `keyof User`: Gets all property names of User as a union (`"name" | "age" | "email"`).
- `Key in keyof User`: Loops through every property.
- `User[Key]`: Gets the type of the current property.
- `?`: Makes each property optional.

### Common Mapped Type Modifiers

| Modifier | Meaning |
|---|---|
| `?` | Makes properties optional |
| `-?` | Removes optionality |
| `readonly` | Makes properties read-only |
| `-readonly` | Removes readonly |

### Example: Make All Properties Readonly

```ts
type ReadonlyUser = {
  readonly [Key in keyof User]: User[Key];
};
```

**Real-world use:** Creating optional versions of interfaces, readonly objects, and modifying existing types without rewriting them.

---

## 2. Conditional Types

Conditional Types allow us to create types based on a condition.

**In simple words:** Just like an `if-else` statement, but instead of checking values, we check types.

### Syntax

```ts
type Result = Condition extends Type1
  ? Type2
  : Type3;
```

- `extends`: Checks whether one type is assignable to another.
- `?`: Type to return if the condition is true.
- `:`: Type to return if the condition is false.

### Example

```ts
type Check<T> = T extends string
  ? "It's a string"
  : "It's not a string";

type A = Check<string>;
// "It's a string"

type B = Check<number>;
// "It's not a string"
```

### Practical Example

```ts
type ApiResponse<T> = T extends string
  ? { message: T }
  : { data: T };

type StringResponse = ApiResponse<string>;
// { message: string }

type NumberResponse = ApiResponse<number>;
// { data: number }
```

### Conditional Types with `infer`

`infer` allows TypeScript to extract a type from another type inside a conditional type.

```ts
type GetReturnType<T> =
  T extends (...args: any[]) => infer R
    ? R
    : never;

function getAge() {
  return 20;
}

type Result = GetReturnType<typeof getAge>;
// number
```

Here:
- `infer R` extracts the function's return type.
- `R` becomes `number`.
- If the condition fails, the result is `never`.

**Real-world use:** Creating types that behave differently depending on the input type, extracting function return types, and building reusable utility types.

---

## 3. Literal Types

Literal Types allow us to specify an exact value instead of allowing an entire type like `string` or `number`.

**In simple words:** Instead of accepting any string, we restrict a variable to specific values.

### Example

```ts
let username: string = "Prithvi";

let status: "success" | "error" | "loading";

status = "success"; // Valid
status = "error";   // Valid

// status = "pending"; // Error
```

Here, `status` can only contain three specific string values.

### Number Literal Types

```ts
type Direction = 1 | 2 | 3 | 4;

let direction: Direction = 1;

// direction = 5; // Error
```

### Boolean Literal Types

```ts
type IsLoggedIn = true;

let loggedIn: IsLoggedIn = true;

// loggedIn = false; // Error
```

### `as const`

`as const` tells TypeScript to preserve literal values instead of widening them to general types.

```ts
const user = {
  name: "Prithvi",
  age: 20
} as const;
```

Without `as const`, the properties would normally have types `string` and `number`.

With `as const`:
- `name` becomes `"Prithvi"`.
- `age` becomes `20`.
- Properties become readonly.

**Real-world use:** Defining user roles, application statuses, payment methods, directions, and other fixed values.

---

## 4. Template Literal Types

Template Literal Types allow us to create new string types by combining existing string literal types.

**In simple words:** Just like JavaScript template strings, but used to generate types instead of actual strings.

### Syntax

```ts
type Result = `some text ${Type}`;
```

### Example

```ts
type FirstName = "Prithvi" | "Rahul";
type LastName = "Beldar" | "Sharma";

type FullName = `${FirstName} ${LastName}`;
```

TypeScript automatically creates these possible values:

```ts
// "Prithvi Beldar"
// "Prithvi Sharma"
// "Rahul Beldar"
// "Rahul Sharma"
```

### Practical Example: Event Names

```ts
type Events = "click" | "scroll" | "focus";

type EventHandler = `on${Capitalize<Events>}`;

// "onClick" | "onScroll" | "onFocus"
```

Here, `Capitalize` is a built-in TypeScript utility type that capitalizes the first character.

### Other Useful String Utility Types

| Utility Type | Result |
|---|---|
| `Uppercase<T>` | Converts to uppercase |
| `Lowercase<T>` | Converts to lowercase |
| `Capitalize<T>` | Capitalizes first character |
| `Uncapitalize<T>` | Makes first character lowercase |

Example:

```ts
type A = Uppercase<"hello">;     // "HELLO"
type B = Lowercase<"HELLO">;     // "hello"
type C = Capitalize<"hello">;    // "Hello"
type D = Uncapitalize<"Hello">;  // "hello"
```

**Real-world use:** Creating event names, API routes, CSS property names, and automatically generating string-based types.

---

## 5. Recursive Types

Recursive Types are types that refer to themselves.

**In simple words:** A type that uses itself to describe data that can contain more data of the same structure.

They are especially useful when working with nested or hierarchical data.

### Example: Nested Objects

```ts
type NestedObject = {
  value: string;
  child?: NestedObject;
};

const data: NestedObject = {
  value: "Level 1",
  child: {
    value: "Level 2",
    child: {
      value: "Level 3"
    }
  }
};
```

Here, `NestedObject` refers to itself through the `child` property.

### Example: Nested Arrays

```ts
type NestedArray = number | NestedArray[];

const values: NestedArray = [
  1,
  2,
  [3, 4],
  [5, [6, 7]]
];
```

An array can contain numbers or other arrays of the same type.

### Example: Recursive Conditional Type

```ts
type DeepArray<T> =
  T extends (infer U)[]
    ? DeepArray<U>
    : T;

type Result = DeepArray<number[][][]>;

// number
```

Here:
1. Checks whether `T` is an array.
2. `infer U` extracts the array's element type.
3. Calls `DeepArray` again with the extracted type.
4. Continues until it reaches a non-array type.

**Real-world use:** Representing file systems, nested comments, folder structures, JSON data, and tree-like structures.

---

## Important Things to Remember

- `keyof` gets the keys of an object type.
- `T[K]` gets the type of a property.
- `extends` checks type compatibility in conditional types.
- `infer` extracts a type inside conditional types.
- `as const` preserves literal values and makes properties readonly.
- Template Literal Types use backticks and `${}`.
- Recursive Types are useful for nested data structures.