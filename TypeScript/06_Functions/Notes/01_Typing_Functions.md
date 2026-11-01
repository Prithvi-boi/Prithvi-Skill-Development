# Functions in Typescript

TypeScript allows you to specify the types of both the *input and output* values of functions.

Functions in TypeScript work similarly to JavaScript functions, but TypeScript allows us to define types for parameters, return values, and function structures.

## 1. Basic Function Syntax

In TypeScript, we can specify the type of each parameter.

```ts
function greet(name: string) {
    console.log(`Hello, ${name}`);
}

greet("Prithvi"); // Hello, Prithvi

// Error: Argument must be a string
// greet(100);
```

Here:
- `name: string` specifies that the parameter must be a string.
- TypeScript checks the argument passed to the function.
- The function returns `void` because it does not return a value.

---

## 2. Return Types

We can explicitly define the return type of a function using a type annotation after its parameter list.

**Syntax:**

```ts
function functionName(parameters): returnType {
    // Function body
}
```

### Example

```ts
function add(a: number, b: number): number {
    return a + b;
}

const result = add(10, 20);

console.log(result); // 30
```

Here, `: number` specifies that the function must return a number.

### Different Return Types

```ts
function getName(): string {
    return "Prithvi";
}

function getAge(): number {
    return 20;
}

function isActive(): boolean {
    return true;
}
```

### Using `void`

The `void` return type indicates that a function does not return a meaningful value.

```ts
function displayMessage(message: string): void {
    console.log(message);
}
```

**Important:** A `void` function can technically return `undefined`, but it cannot return a meaningful value such as a string or number.

### Using `never`

The `never` type represents a function that never completes normally.

It is commonly used for functions that always throw an error or run indefinitely.

```ts
function throwError(message: string): never {
    throw new Error(message);
}
```

Another example:

```ts
function infiniteLoop(): never {
    while (true) {
        console.log("Running...");
    }
}
```

---

## 3. Optional Parameters

Optional parameters allow us to call a function without providing every argument.

We use the `?` symbol after the parameter name.

**Syntax:**

```ts
function functionName(parameter?: type) {
    // Function body
}
```

### Example

```ts
function greet(name: string, age?: number): void {

    if (age !== undefined) {
        console.log(`Hello ${name}, you are ${age} years old.`);
    }
    else {
        console.log(`Hello ${name}`);
    }
}

greet("Prithvi");
greet("John", 25);
```

**Output:**

```text
Hello Prithvi
Hello John, you are 25 years old.
```

**Important points:**
- Optional parameters can be omitted when calling a function.
- Their type effectively includes `undefined`.
- Optional parameters must come after required parameters.

---

## 4. Default Parameters

Default parameters allow us to provide a default value when an argument is not supplied or is explicitly `undefined`.

### Example

```ts
function greet(name: string = "Guest"): void {
    console.log(`Hello ${name}`);
}

greet("Prithvi"); // Hello Prithvi
greet();          // Hello Guest
```

We can also override the default value.

```ts
function calculatePrice(price: number, tax: number = 18): number {
    return price + (price * tax / 100);
}

console.log(calculatePrice(1000));     // 1180
console.log(calculatePrice(1000, 10)); // 1100
```

**Optional vs Default Parameters**

| Optional Parameter | Default Parameter |
|---|---|
| Uses `?` | Uses `=` |
| Can be omitted | Can be omitted |
| Value becomes `undefined` if omitted | Uses the default value if omitted or passed as `undefined` |
| Example: `age?: number` | Example: `age: number = 20` |

---

## 5. Rest Parameters

Rest parameters allow a function to accept multiple arguments and collect them into an array.

We use the `...` syntax.

### Example

```ts
function calculateTotal(...prices: number[]): number {

    let total = 0;

    for (const price of prices) {
        total += price;
    }

    return total;
}

console.log(calculateTotal(100, 200, 300)); // 600
console.log(calculateTotal(50, 75));        // 125
```

Here:
- `...prices` collects all arguments into an array.
- `number[]` specifies that the array contains numbers.
- A function can have only one rest parameter, and it must be the last parameter.

---

## 6. Function Type Expressions

We can define the structure of a function using a function type expression.

This allows us to describe the types of parameters and the return value of a function.

**Syntax:**

```ts
(parameterTypes) => returnType
```

### Example

```ts
let add: (a: number, b: number) => number;

add = (a, b) => {
    return a + b;
};

console.log(add(10, 20)); // 30
```

Here:
- `a: number` and `b: number` define the parameter types.
- `=> number` specifies the return type.
- The function assigned to `add` must follow this structure.

### Using Type Aliases

We can make function types reusable using type aliases.

```ts
type Operation = (a: number, b: number) => number;

const add: Operation = (a, b) => a + b;

const subtract: Operation = (a, b) => a - b;

console.log(add(20, 10));      // 30
console.log(subtract(20, 10)); // 10
```

---

## 7. Anonymous Functions

An anonymous function is a function without a name.

It is commonly assigned to a variable or passed as an argument to another function.

### Example

```ts
const greet = function(name: string): void {
    console.log(`Hello ${name}`);
};

greet("Prithvi");
```

Here, the function does not have its own name. It is assigned to the `greet` variable.

---

## 8. Arrow Functions

Arrow functions provide a shorter syntax for writing functions.

### Example

```ts
const add = (a: number, b: number): number => {
    return a + b;
};

console.log(add(10, 20)); // 30
```

We can also use implicit returns when the function contains a single expression.

```ts
const multiply = (a: number, b: number): number => a * b;

console.log(multiply(5, 4)); // 20
```

### Arrow Functions with Type Aliases

```ts
type Calculator = (a: number, b: number) => number;

const divide: Calculator = (a, b) => a / b;

console.log(divide(20, 5)); // 4
```

---

## 9. Contextual Typing

Contextual typing occurs when TypeScript automatically infers the types of parameters based on the context in which a function is used.

### Example

```ts
type Operation = (a: number, b: number) => number;

const add: Operation = (a, b) => {
    return a + b;
};
```

Notice that we did not explicitly specify the types of `a` and `b` inside the arrow function.

TypeScript automatically infers both as `number` from the `Operation` type.

This is called **Contextual Typing**.

---

## 10. Function Parameters with Object Types

We can pass objects to functions by defining their structure using interfaces or type aliases.

### Example

```ts
type Student = {
    name: string;
    age: number;
    marks: number;
};

function displayStudent(student: Student): void {
    console.log(`Name: ${student.name}`);
    console.log(`Age: ${student.age}`);
    console.log(`Marks: ${student.marks}`);
}

displayStudent({
    name: "Prithvi",
    age: 20,
    marks: 85
});
```

This ensures that the object passed to the function follows the `Student` structure.

---

# Practice Exercises

1. Create a function that accepts two numbers and returns their sum.
2. Create a function with an optional `age` parameter.
3. Create a function with a default `department` parameter.
4. Create a function that accepts multiple marks using rest parameters and calculates their average.
5. Create a reusable function type using a type alias.
6. Create a function that accepts a `Student` object and displays its details.
7. Create an array of numbers and use an arrow function with `map()` to return their squares.