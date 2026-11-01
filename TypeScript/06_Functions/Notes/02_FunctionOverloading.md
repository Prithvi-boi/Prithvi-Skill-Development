# Function Overloading in TypeScript

## 1. What is Function Overloading?

Function overloading allows us to define **multiple function signatures for a single function**, allowing it to accept different combinations of parameters and return different types.

> A function signature describes the structure of a function, including:Function name, Parameter names and its types, and Return type

In simple words, we can use the same function name for different types of inputs.

For example, imagine a function called `display()`:
- If we pass a string, it displays a message.
- If we pass a number, it displays a number.
- If we pass two numbers, it can return their sum.

TypeScript supports this through function overloading.

## 2. Basic Syntax

Function overloading consists of two parts:

1. **Overload signatures:** Define the different ways a function can be called.
2. **Implementation signature:** Contains the actual function implementation.

```ts
// Overload signatures
function display(value: string): void;
function display(value: number): void;

// Implementation
function display(value: string | number): void {
    console.log(value);
}

display("Hello"); // Hello
display(100);     // 100
```

**Important:** The implementation signature must be compatible with all overload signatures.

## 3. Multiple Parameters and Return Types

We can define different parameter combinations and return types.

```ts
function calculate(a: number, b: number): number;
function calculate(a: string, b: string): string;

function calculate(a: number | string, b: number | string): number | string {
    if (typeof a === "number" && typeof b === "number") {
        return a + b;
    }

    if (typeof a === "string" && typeof b === "string") {
        return a + b;
    }

    throw new Error("Invalid arguments");
}

console.log(calculate(10, 20));       // 30
console.log(calculate("Hello ", "TS")); // Hello TS
```

Here:
- Two numbers produce a number.
- Two strings produce a string.
- Mixing a number and a string is not allowed by the overload signatures.

## 4. Why Do We Need Function Overloading?

Consider this function without overloading:

```ts
function getValue(value: string | number): string | number {
    return value;
}

let result = getValue(100);
```

The inferred type of `result` is:

```ts
string | number
```

Even though we passed a number, TypeScript cannot determine that the return value will specifically be a number.

Now let's use function overloading:

```ts
function getValue(value: string): string;
function getValue(value: number): number;

function getValue(value: string | number): string | number {
    return value;
}

let result1 = getValue(100);
let result2 = getValue("Hello");

console.log(result1); // 100
console.log(result2); // Hello
```

Now TypeScript knows:
- `result1` is a `number`.
- `result2` is a `string`.

This gives us better type safety and more accurate return types.

## 5. Function Overloading with Optional Parameters

We can also overload functions with different numbers of parameters.

```ts
function createUser(name: string): string;
function createUser(name: string, age: number): string;

function createUser(name: string, age?: number): string {
    if (age !== undefined) {
        return `Name: ${name}, Age: ${age}`;
    }

    return `Name: ${name}`;
}

console.log(createUser("Prithvi"));
console.log(createUser("Prithvi", 20));
```

Output:

```text
Name: Prithvi
Name: Prithvi, Age: 20
```

## 6. Important Rules

1. Every overload signature must use the same function name.
2. The implementation signature must be compatible with all overload signatures.
3. The implementation signature is not directly visible when calling the function.
4. The function implementation must handle all valid overload cases.
5. The overload signatures determine which arguments are allowed and what return type is expected.
6. Function overloading is a TypeScript feature. It does not create multiple implementations at runtime.

### Understanding the Implementation Signature

Consider:

```ts
function display(value: string): void;
function display(value: number): void;

function display(value: string | number): void {
    console.log(value);
}
```

These calls are valid:

```ts
display("Hello");
display(100);
```

But this is invalid:

```ts
display(true); // Error
```

Even though the implementation uses a union type, callers can only use the overload signatures.

## 7. Function Overloading vs Union Types

Both can accept multiple types, but they serve different purposes.

### Without Overloading

```ts
function getData(value: string | number): string | number {
    return value;
}
```

The return type is always `string | number`, regardless of the input.

### With Overloading

```ts
function getData(value: string): string;
function getData(value: number): number;

function getData(value: string | number): string | number {
    return value;
}
```

The return type depends on the argument:
- String input → String output.
- Number input → Number output.

**Use function overloading when different input combinations should have different, predictable return types.**

## 8. Practice Exercises

1. Create an overloaded function called `add()` that accepts:
   - Two numbers and returns their sum.
   - Two strings and returns their concatenation.

2. Create an overloaded function called `getLength()` that accepts:
   - A string and returns its length.
   - An array of numbers and returns its length.

3. Create an overloaded function called `formatValue()` that accepts:
   - A number and returns a formatted string.
   - A string and returns it in uppercase.

4. Create an overloaded function called `getStudent()` that accepts:
   - A roll number.
   - A student name.