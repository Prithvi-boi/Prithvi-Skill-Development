# Arrays


## 1. Declaring Arrays


### Method 1: Using `type[]`

```ts
let numbers: number[] = [10, 20, 30, 40];
```

### Method 2: Using `Array<type>`

```ts
let names: Array<string> = ["Prithvi", "John"];
```

Both methods work exactly the same way.

**Recommendation:** Prefer `type[]` because it is shorter and commonly used.

---

## 2. Type Inference in Arrays

TypeScript can automatically determine the array's element type based on its initial values.

```ts
let numbers = [10, 20, 30];

numbers.push(40);      // Allowed
numbers.push("Hello"); // Error
```

---

## 3. Arrays with Multiple Types (Union Types)

Sometimes you might want an array to contain more than one type of value.

You can achieve this using **Union Types (`|`)**.

```ts
let values: (string | number)[] = ["Hello",10,'A'];
values.push(true); // Error
values.push(30);   // Allowed
```

Here, the array can contain either `string` or `number` values.

---

## 4. Readonly Arrays

Sometimes you want to prevent an array from being modified after initialization.

You can use `readonly` to achieve this.

```ts
let names: readonly string[] = ["Prithvi", "John", "Alex"];

// names.push("Sam");  // Error
// names[0] = "Peter"; // Error
```

Another way to declare readonly arrays:

```ts
let numbers: ReadonlyArray<number> = [10, 20, 30];
```

Both approaches prevent modifications through that array reference.

**Important:** `readonly` provides compile-time protection. It does not freeze the actual array at runtime.

---

## 5. Multidimensional Arrays

An array can also contain other arrays. These are commonly called multidimensional arrays.

### Example 1: Two-dimensional array

```ts
let matrix: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

console.log(matrix[0][1]); // 2
```

### Example 2: Three-dimensional array

```ts
let data: number[][][] = [
    [
        [1, 2],
        [3, 4]
    ],
    [
        [5, 6],
        [7, 8]
    ]
];
```

---

## 6. Arrays with Objects

You can also create arrays containing objects with specific property types.

```ts
let users: {
    id: number;
    name: string;
    isActive: boolean;
}[] = [
    {
        id: 1,
        name: "Prithvi",
        isActive: true
    },
    {
        id: 2,
        name: "John",
        isActive: false
    }
];
```

You can also use `type` or `interface` to make the structure reusable.

### Using Interface

```ts
interface User {
    id: number;
    name: string;
}

let users: User[] = [
    { id: 1, name: "Prithvi" },
    { id: 2, name: "John" }
];
```

Here, every object in the `users` array must follow the `User` interface structure.

---

## 7. Tuples vs Arrays

A tuple is similar to an array, but it allows you to specify the type of each element at a particular position.

### Normal Array

```ts
let user: (string | number)[] = ["Prithvi", 21];
```

Both positions can contain either a string or a number.

### Tuple

```ts
let user: [string, number] = ["Prithvi", 21];

// user = [21, "Prithvi"]; // Error
```

Here:
- First element must be a `string`.
- Second element must be a `number`.
- The positions and types are predefined.

### Difference Between Arrays and Tuples

| Feature | Array | Tuple |
|---|---|---|
| Element types | Usually same or union | Can differ by position |
| Element positions | Flexible | Predefined |
| Length | Flexible | Fixed by default |
| Example | `number[]` | `[string, number]` |

**Note:** Tuples can also have optional elements and rest elements, so their length is not always fixed.

---
