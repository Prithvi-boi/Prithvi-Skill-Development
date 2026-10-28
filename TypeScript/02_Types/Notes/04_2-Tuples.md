# TypeScript Tuples

A **Tuple** is a special type of array in TypeScript that allows you to define the exact type of each element based on its position.

Unlike normal arrays, where elements generally share the same type, tuples allow different types at specific positions.

---

## 1. Basic Tuple Declaration

To declare a tuple, use square brackets `[]` and specify the type of each element in order.

### Example

```ts
let user: [string, number] = ["Prithvi", 21];
```

Here:
- The first element must be a `string`.
- The second element must be a `number`.
- The tuple expects exactly two elements.

### Valid Example

```ts
let user: [string, number] = ["Prithvi", 21];

console.log(user[0]); // Prithvi
console.log(user[1]); // 21
```

### Invalid Examples

```ts
// Wrong element types
let user1: [string, number] = [21, "Prithvi"];

// Missing an element
let user2: [string, number] = ["Prithvi"];

// Too many elements
let user3: [string, number] = ["Prithvi", 21, true];
```

TypeScript reports errors because the values don't match the tuple definition.

---

## 2. Difference Between Arrays and Tuples

Both arrays and tuples are used to store multiple values, but they have different purposes.

### Normal Array

```ts
let user: (string | number)[] = ["Prithvi", 21];

user.push("Developer");
user.push(100);
```

Here, the array can contain any number of strings or numbers in any order.

### Tuple

```ts
let user: [string, number] = ["Prithvi", 21];

// user = [21, "Prithvi"]; // Error
// user = ["Prithvi"];     // Error
```

Here, the element types and their positions are predefined.

### Comparison

| Feature | Array | Tuple |
|---|---|---|
| Element types | Usually same or union | Can differ by position |
| Element positions | Flexible | Predefined |
| Expected length | Flexible | Known |
| Accessing elements | Based on array index | Based on index and predefined type |
| Example | `number[]` | `[string, number]` |

**Important:** Tuples are still JavaScript arrays at runtime. Their additional type information exists only during TypeScript type checking.

---

## 3. Tuple Destructuring

Tuples support JavaScript array destructuring.

Destructuring allows you to extract tuple elements into separate variables.

### Example

```ts
let user: [string, number] = ["Prithvi", 21];

let [name, age] = user;

console.log(name); // Prithvi
console.log(age);  // 21
```

TypeScript automatically infers the types:

```ts
let [name, age] = user;

// name: string
// age: number
```

You can also skip elements while destructuring.

```ts
let user: [string, number, boolean] = [
    "Prithvi",
    21,
    true
];

let [name, , status] = user;

console.log(name);   // Prithvi
console.log(status); // true
```

---

## 4. Optional Tuple Elements (`?`)

Sometimes you might want a tuple to contain an optional element.

You can use the question mark (`?`) after an element's type to make it optional.

### Example

```ts
type User = [string, number, boolean?];

let user1: User = ["Prithvi", 21];

let user2: User = ["John", 25, true];
```

Here:
- First element (`string`) is required.
- Second element (`number`) is required.
- Third element (`boolean`) is optional.

You can provide either two or three elements.

### Important Rules

1. Optional tuple elements must come after required elements.
2. Optional elements can only appear at the end of a tuple.
3. An optional element may contain `undefined`.
4. Optional elements affect the possible tuple length.

### Example: Optional Element Type

```ts
type Coordinate = [number, number, number?];

let point: Coordinate = [10, 20];

let [x, y, z] = point;

// x: number
// y: number
// z: number | undefined
```

The third element might not exist, so TypeScript considers it potentially `undefined`.

### Tuple Length with Optional Elements

```ts
type Coordinate = [number, number, number?];

let point1: Coordinate = [10, 20];
let point2: Coordinate = [10, 20, 30];

console.log(point1.length); // 2
console.log(point2.length); // 3
```

The possible length is `2 | 3`.

---

## 5. Rest Elements in Tuples (`...`)

Rest elements allow a tuple to contain a variable number of elements.

You can use the spread syntax (`...`) followed by an array or tuple type.

### Example 1: Rest Elements at the End

```ts
type UserData = [string, number, ...boolean[]];

let user1: UserData = ["Prithvi", 21];

let user2: UserData = ["John", 25, true];

let user3: UserData = [
    "Alex",
    30,
    true,
    false,
    true
];
```

Here:
- First element must be a `string`.
- Second element must be a `number`.
- Remaining elements can be any number of `boolean` values.

### Example 2: Rest Elements in the Middle

```ts
type UserData = [string, ...boolean[], number];

let user: UserData = ["Prithvi", 21];

let user2: UserData = [
    "John",
    true,
    false,
    25
];
```

Here:
- First element must be a `string`.
- Middle elements can be any number of booleans.
- Last element must be a `number`.

### Example 3: Rest Elements at the Beginning

```ts
type UserData = [...boolean[], string, number];

let user: UserData = ["Prithvi", 21];

let user2: UserData = [
    true,
    false,
    "John",
    25
];
```

Here:
- Beginning elements can contain any number of booleans.
- Second-last element must be a `string`.
- Last element must be a `number`.

### Important Points

- Rest elements allow variable-length tuples.
- They must use an array or tuple type.
- They allow you to define flexible tuple structures while keeping specific positions type-safe.
- A tuple with rest elements does not have one fixed length.

---

## 6. Readonly Tuples

Sometimes you want to prevent a tuple from being modified after initialization.

You can use the `readonly` modifier before the tuple declaration.

### Example

```ts
let user: readonly [string, number] = [
    "Prithvi",
    21
];

// user[0] = "John"; // Error
// user.push(25);    // Error
```

Here:
- You can read tuple elements.
- You cannot modify existing elements.
- You cannot add or remove elements through the readonly reference.

### Another Example

```ts
type Point = readonly [number, number];

let coordinates: Point = [10, 20];

console.log(coordinates[0]); // 10
console.log(coordinates[1]); // 20
```

**Important:** Readonly is a compile-time restriction. It does not freeze the underlying JavaScript array at runtime.

### Using `as const`

TypeScript also supports const assertions using `as const`.

```ts
let point = [3, 4] as const;
```

TypeScript infers the type as:

```ts
readonly [3, 4]
```

Notice that:
- The tuple is readonly.
- The values are inferred as literal types (`3` and `4`), not just `number`.

---

## 7. Tuples with Functions

Tuples are useful when working with functions that return multiple values or accept multiple arguments.

### Example 1: Returning a Tuple

```ts
function getUser(): [string, number] {
    return ["Prithvi", 21];
}

let user = getUser();

console.log(user[0]); // Prithvi
console.log(user[1]); // 21
```

Here, the function returns a tuple containing a string and a number.

### Example 2: Using Tuples as Function Parameters

```ts
function printUser(user: [string, number]): void {
    const [name, age] = user;

    console.log(`Name: ${name}`);
    console.log(`Age: ${age}`);
}

printUser(["Prithvi", 21]);
```

The function expects a tuple containing a string followed by a number.

---

## 8. Tuples with Rest Parameters

Tuples can also be used with function rest parameters.

This is useful when a function needs a variable number of arguments but requires specific types and positions for some arguments.

### Example

```ts
function readButtonInput(
    ...args: [string, number, ...boolean[]]
): void {

    const [name, version, ...input] = args;

    console.log(name);
    console.log(version);
    console.log(input);
}

readButtonInput("Submit", 1, true, false, true);
```

Here:
- First argument must be a `string`.
- Second argument must be a `number`.
- Remaining arguments can be booleans.

This is equivalent to writing:

```ts
function readButtonInput(
    name: string,
    version: number,
    ...input: boolean[]
): void {

    console.log(name);
    console.log(version);
    console.log(input);
}
```

Both approaches provide the same parameter structure.

---

## 9. Labeled Tuple Elements

TypeScript also allows you to give names to tuple elements.

Labels improve readability by explaining what each position represents.

### Example

```ts
type User = [name: string, age: number];

let user: User = ["Prithvi", 21];
```

Here:
- `name` describes the first element.
- `age` describes the second element.

Labels do not change the actual types or behavior of the tuple. They are only descriptive.

### Without Labels

```ts
type User = [string, number];
```

### With Labels

```ts
type User = [name: string, age: number];
```

Both declarations represent the same tuple structure.

---

## 10. When Should You Use Tuples?

Tuples are useful when the position of each value has a specific meaning.

### Example 1: Coordinates

```ts
type Point = [number, number];

let location: Point = [10, 20];
```

The first value represents the X coordinate, and the second represents the Y coordinate.

### Example 2: API Response

```ts
type ApiResponse = [number, string];

let response: ApiResponse = [
    200,
    "Request successful"
];
```

The first value represents the status code, and the second represents the message.

### Example 3: React Hook Pattern

```ts
type CounterState = [
    count: number,
    setCount: (value: number) => void
];
```

This demonstrates how a tuple can represent a value and its corresponding update function.

---