# TypeScript: Union Types (`|`)

## 1. What is a Union Type?

A Union Type allows a variable to hold values of multiple types.

In simple words, it means a variable can be one type OR another type.

We use the pipe (`|`) symbol to define a union.

### Syntax

```ts
let variable: Type1 | Type2;
```

### Example

```ts
let value: string | number;

value = "Hello";
value = 100;

value = true; // Error
```

Here, `value` can contain either a `string` or a `number`, but not a boolean.

## 2. Union Types with Arrays

We can use union types with arrays in two different ways.

### A. Array containing multiple types

```ts
let values: (string | number)[];

values = ["Hello", 100, "World", 200];
```

Here, each array element can be either a string or a number.

### B. Union of two different array types

```ts
let values: string[] | number[];

values = ["Hello", "World"];
values = [100, 200, 300];

values = ["Hello", 100]; // Error
```

Here, the array must contain either only strings or only numbers.

### Difference

| Type | Meaning |
|---|---|
| `(string \| number)[]` | Array containing strings and numbers |
| `string[] \| number[]` | Array containing only strings OR only numbers |

---

## 3. Union Types with Objects

We can use union types to allow an object to follow one of multiple structures.

```ts
type Student = {
    name: string;
    rollnum: number;
};

type Teacher = {
    name: string;
    subject: string;
};

let person: Student | Teacher;
```

Now `person` can be either a `Student` or a `Teacher`.

```ts
person = {
    name: "Prithvi",
    rollnum: 101
};

person = {
    name: "Rahul",
    subject: "Mathematics"
};
```

However, TypeScript only allows direct access to properties that are common to both types without narrowing.

```ts
console.log(person.name); // Valid

console.log(person.rollnum); // Error
console.log(person.subject); // Error
```

Why?

Because TypeScript cannot guarantee whether `person` is a Student or a Teacher.

---

## 4. Type Narrowing with Union Types

Type Narrowing means checking a value's type or structure so TypeScript can determine which type is currently being used.

### Using `typeof`

```ts
function printValue(value: string | number): void {
    if (typeof value === "string") {
        console.log(value.toUpperCase());
    } else {
        console.log(value.toFixed(2));
    }
}
```

Here:
- If `value` is a string, TypeScript allows string methods.
- Otherwise, it knows that `value` is a number.

### Using `in` Operator

We can use the `in` operator to check whether an object contains a particular property.

```ts
type Student = {
    name: string;
    rollnum: number;
};

type Teacher = {
    name: string;
    subject: string;
};

function displayPerson(person: Student | Teacher): void {
    if ("rollnum" in person) {
        console.log("Student:", person.rollnum);
    } else {
        console.log("Teacher:", person.subject);
    }
}
```

The `in` operator helps TypeScript identify which object structure is being used.

---

## 5. Literal Union Types

Instead of allowing any string or number, we can restrict a variable to specific values.

```ts
type Status = "Active" | "Inactive" | "Pending";

let studentStatus: Status;

studentStatus = "Active";
studentStatus = "Pending";

studentStatus = "Deleted"; // Error
```

This is called a String Literal Union.

### Number Literal Union

```ts
type Rating = 1 | 2 | 3 | 4 | 5;

let rating: Rating;

rating = 5;
rating = 3;

rating = 6; // Error
```

Literal unions are useful when a variable should only accept a fixed set of values.

---

## 6. Union Types with Functions

Union types can be used in function parameters and return types.

### Function Parameters

```ts
function display(value: string | number): void {
    console.log(value);
}

display("Hello");
display(100);
```

### Function Return Types

```ts
function getValue(): string | number {
    if (Math.random() > 0.5) {
        return "Hello";
    }

    return 100;
}
```

The function can return either a string or a number.

---

## 7. Union Types with Type Aliases

We can use type aliases to make union types reusable.

```ts
type ID = string | number;

let studentId: ID;
let teacherId: ID;

studentId = 101;
teacherId = "T101";
```

Instead of repeatedly writing `string | number`, we can reuse the `ID` type.

---

## 8. Discriminated Unions

Discriminated Unions are a useful pattern for working with multiple object types.

Each object has a common property, usually called a discriminator, that contains a literal type.

### Example

```ts
type Student = {
    role: "student";
    name: string;
    rollnum: number;
};

type Teacher = {
    role: "teacher";
    name: string;
    subject: string;
};

type Person = Student | Teacher;
```

Notice that both objects have a `role` property, but its value is different.

We can use that property to identify the object:

```ts
function displayPerson(person: Person): void {
    if (person.role === "student") {
        console.log(person.rollnum);
    } else {
        console.log(person.subject);
    }
}
```

TypeScript automatically narrows the type based on the `role` property.

**Common use cases:**
- User roles
- API responses
- Application states
- Payment status
- Different types of notifications

---

## 9. Union Types vs Intersection Types

These two concepts are opposites in terms of how they combine types.

### Union (`|`)

A value can be one type OR another type.

```ts
type A = {
    name: string;
};

type B = {
    age: number;
};

type Person = A | B;
```

A value can satisfy either structure.

### Intersection (`&`)

A value must satisfy both types simultaneously.

```ts
type A = {
    name: string;
};

type B = {
    age: number;
};

type Person = A & B;
```

Now the object must contain both properties:

```ts
const person: Person = {
    name: "Prithvi",
    age: 20
};
```

### Comparison

| Union (`\|`) | Intersection (`&`) |
|---|---|
| Either type | Both types |
| Allows alternatives | Combines requirements |
| A OR B | A AND B |