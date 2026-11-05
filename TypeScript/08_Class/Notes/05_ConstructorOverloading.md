# TypeScript: Constructor Overloading

## 1. What is Constructor Overloading?

Constructor overloading allows us to define multiple ways to initialize an object.

For example, imagine a `Student` class.

We might want to create students in two ways:

1. Provide only the student's name.
2. Provide both the student's name and age.

Instead of creating separate classes, we can use constructor overloading.

**Important:** TypeScript supports multiple constructor signatures, but only one actual constructor implementation.

---

## 2. Basic Syntax

```ts
class ClassName {
    constructor(value: string);
    constructor(value: number);

    constructor(value: string | number) {
        // Implementation
    }
}
```

Here:
- The first constructor declaration is an overload signature.
- The second constructor declaration is another overload signature.
- The last constructor contains the actual implementation.

You cannot write multiple constructor implementations in one class.

---

## 3. Basic Example

Let's create a `Student` class that supports two ways of creating objects.

```ts
class Student {
    name: string;
    age: number;

    constructor(name: string);
    constructor(name: string, age: number);

    constructor(name: string, age?: number) {
        this.name = name;
        this.age = age ?? 18;
    }
}

const student1 = new Student("Prithvi");
const student2 = new Student("Rahul", 21);

console.log(student1);
console.log(student2);
```

Output:

```text
Student { name: 'Prithvi', age: 18 }
Student { name: 'Rahul', age: 21 }
```

### How does it work?

Consider these two signatures:

```ts
constructor(name: string);
constructor(name: string, age: number);
```

They define the valid ways to create a `Student` object.

The implementation:

```ts
constructor(name: string, age?: number) {
    this.name = name;
    this.age = age ?? 18;
}
```

Handles both possibilities.

- If age is provided, it uses that value.
- If age is omitted, it uses `18`.

---

## 4. Constructor Overloading with Different Parameter Types

We can also support different types of arguments.

For example, let's create a `Product` class that can be initialized using either a product ID or a product name.

```ts
class Product {
    productId: number;
    productName: string;

    constructor(productId: number);
    constructor(productName: string);

    constructor(value: number | string) {
        if (typeof value === "number") {
            this.productId = value;
            this.productName = "Unknown";
        } else {
            this.productId = 0;
            this.productName = value;
        }
    }
}

const product1 = new Product(101);
const product2 = new Product("Laptop");

console.log(product1);
console.log(product2);
```

Output:

```text
Product { productId: 101, productName: 'Unknown' }
Product { productId: 0, productName: 'Laptop' }
```

### Understanding the implementation

```ts
constructor(value: number | string)
```

The implementation accepts either a number or a string.

We use `typeof` to determine which type of argument was provided.

```ts
if (typeof value === "number") {
    // Number handling
} else {
    // String handling
}
```

This is called type narrowing.

---

## 5. Constructor Overloading with Multiple Parameters

We can define overloads with different combinations of parameters.

Example:

```ts
class Employee {
    name: string;
    salary: number;
    department: string;

    constructor(name: string);
    constructor(name: string, salary: number);
    constructor(name: string, salary: number, department: string);

    constructor(
        name: string,
        salary?: number,
        department?: string
    ) {
        this.name = name;
        this.salary = salary ?? 0;
        this.department = department ?? "Unassigned";
    }
}

const emp1 = new Employee("Prithvi");
const emp2 = new Employee("Rahul", 30000);
const emp3 = new Employee("Amit", 50000, "IT");

console.log(emp1);
console.log(emp2);
console.log(emp3);
```

Output:

```text
Employee {
    name: 'Prithvi',
    salary: 0,
    department: 'Unassigned'
}

Employee {
    name: 'Rahul',
    salary: 30000,
    department: 'Unassigned'
}

Employee {
    name: 'Amit',
    salary: 50000,
    department: 'IT'
}
```

Here, we have three constructor signatures but only one implementation.

---

## 6. Constructor Overloading vs Default Parameters

These concepts can look similar, but they serve different purposes.

### Default parameters

```ts
class Student {
    constructor(
        public name: string,
        public age: number = 18
    ) {}
}

const student1 = new Student("Prithvi");
const student2 = new Student("Rahul", 21);
```

Default parameters provide fallback values when arguments are omitted.

### Constructor overloading

```ts
class Student {
    constructor(name: string);
    constructor(name: string, age: number);

    constructor(name: string, age?: number) {}
}
```

Constructor overloading explicitly declares which combinations of arguments are valid.

| Default Parameters | Constructor Overloading |
|---|---|
| Provides fallback values. | Defines multiple valid constructor signatures. |
| Uses one constructor signature. | Uses multiple overload signatures. |
| Useful for optional arguments. | Useful for different ways of initializing objects. |

---