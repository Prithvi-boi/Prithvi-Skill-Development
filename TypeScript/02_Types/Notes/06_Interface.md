# TypeScript Interfaces

## 1. What is an Interface?

An **interface** is a way to define the structure of an object in TypeScript.

It specifies:
- What properties an object should have.
- What data types those properties should contain.
- Which properties are optional or readonly.
- What methods an object should implement.

In simple words, an interface acts like a contract that an object must follow.

### Example

```ts
interface Student {
    name: string;
    age: number;
    rollNumber: number;
}

const student1: Student = {
    name: "Prithvi",
    age: 20,
    rollNumber: 101
};
```

Here, `Student` defines the structure that every object assigned to this type must follow.

If a required property is missing or has an incorrect type, TypeScript reports an error.

---

## 2. Optional Properties (`?`)

Sometimes, an object doesn't need to contain every property.

We can make a property optional using `?`.

```ts
interface Student {
    name: string;
    age: number;
    email?: string;
}

const student1: Student = {
    name: "Prithvi",
    age: 20
};

const student2: Student = {
    name: "Vicky",
    age: 19,
    email: "vicky@example.com"
};
```

Both objects are valid because `email` is optional.

**Remember:** An optional property can be `undefined` when it isn't provided.

---

## 3. Readonly Properties

The `readonly` modifier prevents a property from being reassigned after an object has been created.

```ts
interface User {
    readonly id: number;
    name: string;
}

const user: User = {
    id: 101,
    name: "Prithvi"
};

user.name = "Vicky"; // Allowed

// Error: Cannot assign to 'id' because it is readonly.
user.id = 102;
```

**Note:** `readonly` provides a TypeScript compile-time restriction. It does not freeze the object at runtime.

---

## 4. Interface with Arrays

Interfaces can also describe arrays containing objects.

```ts
interface Student {
    name: string;
    age: number;
    marks: number[];
}

const students: Student[] = [
    {
        name: "Prithvi",
        age: 20,
        marks: [90, 85, 95]
    },
    {
        name: "Vicky",
        age: 19,
        marks: [70, 80, 75]
    }
];
```

Here:
- `Student` represents one student object.
- `Student[]` represents an array of student objects.

---

## 5. Interface with Functions

An interface can define the structure of a function property.

```ts
interface Calculator {
    add: (a: number, b: number) => number;
    subtract: (a: number, b: number) => number;
}

const calculator: Calculator = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b
};

console.log(calculator.add(10, 20)); // 30
```

The interface ensures that both functions accept two numbers and return a number.

### Method syntax

You can also define methods using method syntax.

```ts
interface User {
    name: string;

    introduce(): void;
}

const user: User = {
    name: "Prithvi",

    introduce() {
        console.log(`Hello, I am ${this.name}`);
    }
};

user.introduce();
```

---

## 6. Nested Interfaces

An interface can contain another interface as a property type.

This is useful when an object has multiple levels of data.

```ts
interface Address {
    city: string;
    country: string;
    pincode: number;
}

interface Student {
    name: string;
    age: number;
    address: Address;
}

const student: Student = {
    name: "Prithvi",
    age: 20,
    address: {
        city: "Mumbai",
        country: "India",
        pincode: 400001
    }
};
```

Here, `Student` contains an `address` property that must follow the `Address` interface.

---

## 7. Extending Interfaces (`extends`)

An interface can inherit properties from another interface using `extends`.

This helps us reuse existing interface structures instead of repeating properties.

```ts
interface Person {
    name: string;
    age: number;
}

interface Student extends Person {
    rollNumber: number;
    course: string;
}

const student: Student = {
    name: "Prithvi",
    age: 20,
    rollNumber: 101,
    course: "BCA"
};
```

The `Student` interface automatically gets the `name` and `age` properties from `Person`.

### Extending multiple interfaces

An interface can also extend multiple interfaces.

```ts
interface Person {
    name: string;
}

interface Employee {
    salary: number;
}

interface Developer extends Person, Employee {
    programmingLanguage: string;
}

const developer: Developer = {
    name: "Prithvi",
    salary: 50000,
    programmingLanguage: "TypeScript"
};
```

---

## 8. Using Union Types in Interfaces

Interface properties can use union types.

This allows a property to accept more than one data type.

```ts
interface Product {
    name: string;
    price: number | string;
}

const product1: Product = {
    name: "Laptop",
    price: 50000
};

const product2: Product = {
    name: "Keyboard",
    price: "₹2,000"
};
```

You can also use literal unions.

```ts
interface User {
    name: string;
    status: "Active" | "Inactive";
}

const user: User = {
    name: "Prithvi",
    status: "Active"
};
```

---

## 9. Interface with Enums

Interfaces can use enums as property types.

```ts
enum Department {
    BCA = "BCA",
    BCOM = "BCOM",
    BBA = "BBA"
}

interface Student {
    name: string;
    department: Department;
}

const student: Student = {
    name: "Prithvi",
    department: Department.BCA
};
```

The `department` property must contain a valid `Department` enum member.

---

## 10. Implementing Interfaces in Classes

Classes can use interfaces through the `implements` keyword.

The class must provide the properties and methods required by the interface.

```ts
interface Person {
    name: string;
    age: number;

    introduce(): void;
}

class Student implements Person {
    constructor(
        public name: string,
        public age: number
    ) {}

    introduce(): void {
        console.log(`I am ${this.name}, age ${this.age}`);
    }
}

const student = new Student("Prithvi", 20);

student.introduce();
```

Here:
- `Person` defines the structure.
- `Student` implements that structure.
- The class provides the actual implementation of `introduce()`.

---

## 11. Interface vs Type Alias

Both `interface` and `type` can describe object structures.

### Using an interface

```ts
interface Student {
    name: string;
    age: number;
}
```

### Using a type alias

```ts
type Student = {
    name: string;
    age: number;
};
```

Both can be used to type objects.

### Main differences

| Interface | Type Alias |
|---|---|
| Uses `interface` keyword | Uses `type` keyword |
| Mainly used to describe object structures | Can describe objects, unions, primitives, tuples, and more |
| Supports `extends` | Uses intersections (`&`) to combine types |
| Supports declaration merging | Does not support declaration merging |

### When should you use them?

- Use `interface` when defining object structures, especially when working with classes and object-oriented code.
- Use `type` when defining unions, tuples, primitives, or more complex type combinations.

Both are valid for object structures. You don't need to force yourself to use only one.

---
## Important Things to Remember

1. Interfaces define the structure of objects.
2. Required properties must be provided.
3. Optional properties use `?`.
4. Readonly properties cannot be reassigned.
5. Interfaces can describe arrays, functions, and nested objects.
6. Interfaces can extend other interfaces.
7. Interfaces can use enums and union types.
8. Classes can implement interfaces using `implements`.
9. Interfaces are removed during TypeScript compilation and do not exist at runtime.

## Official Documentation

- [TypeScript Handbook – Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html)
- [TypeScript Handbook – Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)