# TypeScript: Truthiness Checks and `instanceof`

## 1. Truthiness Checks

A **truthiness check** uses a value directly inside a condition to determine whether it is truthy or falsy.

JavaScript has two categories of values:

- **Truthy:** Values that behave like `true` in a condition.
- **Falsy:** Values that behave like `false` in a condition.

TypeScript uses these checks to narrow types.

### Falsy Values in JavaScript

| Value | Type |
|---|---|
| `false` | boolean |
| `0` | number |
| `-0` | number |
| `0n` | bigint |
| `""` | string |
| `null` | object |
| `undefined` | undefined |
| `NaN` | number |

Everything else is truthy, including:

- `"Hello"`
- `"0"`
- `[]`
- `{}`
- `-1`

**Important:** Empty arrays and empty objects are truthy in JavaScript.

### A. Basic Truthiness Check

```ts
function printName(name: string | null) {

    if (name) {
        console.log(name.toUpperCase());
    }
    else {
        console.log("Name is not available");
    }
}

printName("Prithvi"); // PRITHVI
printName(null);     // Name is not available
```

**What's happening?**

1. Initially, `name` can be either `string` or `null`.
2. The `if (name)` condition checks whether the value is truthy.
3. Inside the `if` block, TypeScript knows `name` is a string.
4. Inside the `else` block, TypeScript knows it is `null`.

### B. Truthiness Checks with Numbers

```ts
function calculateDiscount(discount: number | undefined) {

    if (discount) {
        console.log(`Discount: ${discount}%`);
    }
    else {
        console.log("No discount available");
    }
}

calculateDiscount(20);        // Discount: 20%
calculateDiscount(undefined); // No discount available
calculateDiscount(0);         // No discount available
```

Notice something important: `0` is also falsy.

If zero is a valid value, this condition might not behave as intended.

Instead, use an explicit check:

```ts
function calculateDiscount(discount: number | undefined) {

    if (discount !== undefined) {
        console.log(`Discount: ${discount}%`);
    }
    else {
        console.log("No discount available");
    }
}
```

### C. Truthiness Checks with Optional Properties

Truthiness checks are useful when handling optional object properties.

```ts
type Student = {
    name: string;
    email?: string;
};

function displayStudent(student: Student) {

    if (student.email) {
        console.log("Email:", student.email.toLowerCase());
    }
    else {
        console.log("Email not provided");
    }
}
```

Here, `email` can be a string or `undefined`.

TypeScript narrows it to a string inside the `if` block.

**Important:** Truthiness checks also reject valid values such as `0`, `false`, and `""`. Use explicit comparisons when those values are meaningful.

---

## 2. `instanceof` Operator

The `instanceof` operator checks whether an object is an instance of a particular class or constructor.

In TypeScript, it can also be used as a type guard to narrow down object types.

### A. Basic Example

```ts
class Car {
    drive() {
        console.log("Car is driving");
    }
}

class Bike {
    ride() {
        console.log("Bike is riding");
    }
}

const vehicle = new Car();

console.log(vehicle instanceof Car);  // true
console.log(vehicle instanceof Bike); // false
```

Here:

- `vehicle instanceof Car` returns `true`.
- `vehicle instanceof Bike` returns `false`.

This is because `vehicle` was created using `new Car()`.

### B. Using `instanceof` for Type Narrowing

Let's say a function accepts either a `Car` or a `Bike`.

```ts
class Car {
    drive() {
        console.log("Car is driving");
    }
}

class Bike {
    ride() {
        console.log("Bike is riding");
    }
}

function startVehicle(vehicle: Car | Bike) {

    if (vehicle instanceof Car) {
        vehicle.drive();
    }
    else {
        vehicle.ride();
    }
}

startVehicle(new Car());  // Car is driving
startVehicle(new Bike()); // Bike is riding
```

**What's happening?**

1. The function accepts `Car | Bike`.
2. `instanceof Car` checks whether the object is an instance of `Car`.
3. Inside the `if` block, TypeScript narrows `vehicle` to `Car`.
4. Inside the `else` block, TypeScript narrows `vehicle` to `Bike`.

This allows us to access methods belonging to each class safely.

### C. `instanceof` with Built-in Classes

We can also use `instanceof` with built-in JavaScript classes.

```ts
const currentDate = new Date();
const names = ["Prithvi", "John", "Alex"];

console.log(currentDate instanceof Date); // true
console.log(names instanceof Array);       // true
console.log(names instanceof Object);      // true
```

You can use it with:

- `Date`
- `Array`
- `Error`
- Your own classes
- Other constructor functions

### D. Important Limitation of `instanceof`

`instanceof` is designed for checking class instances and constructor relationships. It does not directly check whether an object matches a TypeScript interface or type alias.

For example:

```ts
interface Student {
    name: string;
    age: number;
}

const student = {
    name: "Prithvi",
    age: 20
};

// Error: Student is not a runtime constructor
// console.log(student instanceof Student);
```

**Why?**

TypeScript interfaces and type aliases are removed during compilation. They do not exist as runtime constructors.

For checking object structures, use the `in` operator or a custom type guard instead.

---


## 3. When Should You Use Them?

- Use **truthiness checks** when checking whether optional values exist.
- Use **explicit comparisons** when values like `0`, `false`, or `""` are valid.
- Use **`instanceof`** when distinguishing between objects created from different classes.
- Use **`in`** or custom type guards when checking the structure of plain objects.

---
