# TypeScript: Classes and Constructors

## 1. What is a Class?

A **class** is a blueprint for creating objects.

It defines the properties (data) and methods (functions) that objects created from it will have.

For example, imagine we are building a Student Management System. Every student has a name, age, roll number, and some actions they can perform.

Instead of creating every student object manually, we can define a `Student` class.

```ts
class Student {
    name: string;
    age: number;
    rollNumber: number;

    displayDetails(): void {
        console.log(`Name: ${this.name}`);
        console.log(`Age: ${this.age}`);
        console.log(`Roll Number: ${this.rollNumber}`);
    }
}
```

Here:
- `Student` is the class name.
- `name`, `age`, and `rollNumber` are properties.
- `displayDetails()` is a method.

**Important:** A class is a blueprint. It does not automatically create an object.

---

## 2. Creating Objects Using a Class

To create an object from a class, we use the `new` keyword.

```ts
class Student {
    name: string;
    age: number;

    displayDetails(): void {
        console.log(`Name: ${this.name}`);
        console.log(`Age: ${this.age}`);
    }
}

const student1 = new Student();
const student2 = new Student();
```

Here:
- `student1` and `student2` are separate objects.
- Both objects are created using the `Student` class.
- Each object has its own properties.

However, there is a problem: we have not assigned values to the properties.

TypeScript will report that the properties have not been initialized under strict property initialization.

We can solve this using a constructor.

---

## 3. What is a Constructor?

A **constructor** is a special method that runs automatically whenever an object is created using the `new` keyword.

Its main purpose is to initialize an object's properties.

### Syntax

```ts
class ClassName {
    constructor() {
        // Initialization code
    }
}
```

Example:

```ts
class Student {
    name: string;
    age: number;

    constructor() {
        this.name = "Unknown";
        this.age = 0;
    }
}

const student1 = new Student();

console.log(student1.name); // Unknown
console.log(student1.age);  // 0
```

When `new Student()` executes, the constructor runs automatically and initializes the properties.

### Important points about constructors

- A constructor must be named `constructor`.
- It runs automatically when an object is created.
- A class can have only one constructor implementation.
- Constructors are mainly used to initialize object properties.
- A constructor does not have an explicit return type annotation like `void` or `number`.

---

## 4. Constructor Parameters

We can pass values to a constructor instead of assigning fixed values.

```ts
class Student {
    name: string;
    age: number;

    constructor(studentName: string, studentAge: number) {
        this.name = studentName;
        this.age = studentAge;
    }
}

const student1 = new Student("Prithvi", 20);
const student2 = new Student("Rahul", 21);

console.log(student1.name); // Prithvi
console.log(student2.name); // Rahul
```

### How does it work?

When we write:

```ts
const student1 = new Student("Prithvi", 20);
```

The values are passed to the constructor:

- `"Prithvi"` is assigned to `studentName`.
- `20` is assigned to `studentAge`.

Then the constructor assigns those values to the object's properties using `this`.

---

## 5. Understanding the `this` Keyword

The `this` keyword refers to the current object.

It allows us to access the properties and methods belonging to that particular object.

Example:

```ts
class Student {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    displayName(): void {
        console.log(this.name);
    }
}

const student1 = new Student("Prithvi");
const student2 = new Student("Rahul");

student1.displayName(); // Prithvi
student2.displayName(); // Rahul
```

### Why do we use `this`?

Look at this statement:

```ts
this.name = name;
```

There are two different things:

- `this.name` refers to the object's property.
- `name` refers to the constructor parameter.

The statement assigns the parameter value to the object's property.

Without `this`, TypeScript would treat `name` as the local constructor parameter.

---

## 6. Properties and Methods Inside a Class

A class can contain multiple properties and methods.

Properties store information, while methods define what an object can do.

Example:

```ts
class Student {
    name: string;
    marks: number[];

    constructor(name: string, marks: number[]) {
        this.name = name;
        this.marks = marks;
    }

    calculateAverage(): number {
        const total = this.marks.reduce((sum, mark) => sum + mark, 0);
        return total / this.marks.length;
    }

    displayDetails(): void {
        console.log(`Name: ${this.name}`);
        console.log(`Average: ${this.calculateAverage()}`);
    }
}

const student1 = new Student("Prithvi", [90, 85, 95]);

student1.displayDetails();
```

Output:

```text
Name: Prithvi
Average: 90
```

### Important

Methods can access the object's properties using `this`.

Methods can also call other methods using `this`.

For example:

```ts
this.calculateAverage();
```

---

## 7. Default Parameter Values in Constructors

We can provide default values to constructor parameters.

If an argument is not provided when creating an object, the default value will be used.

```ts
class Student {
    name: string;
    age: number;

    constructor(name: string = "Unknown", age: number = 18) {
        this.name = name;
        this.age = age;
    }
}

const student1 = new Student("Prithvi", 20);
const student2 = new Student();

console.log(student1.name); // Prithvi
console.log(student2.name); // Unknown
console.log(student2.age);  // 18
```

Default values make constructor arguments optional when calling `new`.

---

## 8. Optional Constructor Parameters

We can also make constructor parameters optional using `?`.

```ts
class Student {
    name: string;
    age: number;

    constructor(name: string, age?: number) {
        this.name = name;
        this.age = age ?? 18;
    }
}

const student1 = new Student("Prithvi", 20);
const student2 = new Student("Rahul");

console.log(student1.age); // 20
console.log(student2.age); // 18
```

Here:
- `age?: number` means the argument is optional.
- `age ?? 18` uses `18` if `age` is `null` or `undefined`.

**Note:** Optional parameters must come after required parameters.

---

## 9. Readonly Properties in Classes

The `readonly` keyword prevents a property from being reassigned after initialization.

A readonly property can be initialized:
- Directly where it is declared.
- Inside the constructor.

Example:

```ts
class Student {
    readonly rollNumber: number;
    name: string;

    constructor(rollNumber: number, name: string) {
        this.rollNumber = rollNumber;
        this.name = name;
    }
}

const student1 = new Student(101, "Prithvi");

student1.name = "Rahul"; // Allowed

// Error: Cannot assign to 'rollNumber' because it is readonly.
student1.rollNumber = 102;
```

**Important:** `readonly` is a TypeScript type-system restriction. It does not automatically freeze the object at runtime.

---

## 10. Shorthand Property Initialization (Parameter Properties)

TypeScript provides a shorter way to declare and initialize class properties through constructor parameters.

Instead of declaring properties separately and assigning them inside the constructor, we can use parameter properties.

Example:

### Without parameter properties

```ts
class Student {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}
```

### With parameter properties

```ts
class Student {
    constructor(
        public name: string,
        public age: number
    ) {}
}
```

Both examples create a class with `name` and `age` properties initialized from the constructor arguments.

Parameter properties automatically:
1. Declare the corresponding class property.
2. Assign the constructor argument to that property.

**Note:** Parameter properties are a TypeScript feature. The `public` keyword shown here is part of their syntax; this section only demonstrates the shorthand and does not cover access modifiers.

---

## 11. Static Properties and Methods

Normally, properties and methods belong to individual objects.

However, sometimes we want a property or method to belong to the class itself rather than each object.

We can use the `static` keyword.

Example:

```ts
class Student {
    static schoolName: string = "ABC College";

    name: string;

    constructor(name: string) {
        this.name = name;
    }

    static displaySchoolName(): void {
        console.log(Student.schoolName);
    }
}

const student1 = new Student("Prithvi");

console.log(student1.name); // Prithvi

console.log(Student.schoolName); // ABC College

Student.displaySchoolName();
```

### Important points

- Static properties belong to the class itself.
- Static methods are called using the class name.
- We do not need to create an object to access static members.
- Static methods cannot directly access instance properties using `this`.

For example:

```ts
Student.displaySchoolName(); // Correct

// student1.displaySchoolName(); // Error
```

---

## 12. Getters and Setters

Getters and setters allow us to control how a property is accessed and updated.

They look like properties when used, but internally they execute methods.

### Getter

A getter retrieves or calculates a value.

### Setter

A setter allows us to update a value with additional logic.

Example:

```ts
class Student {
    private _marks: number;

    constructor(marks: number) {
        this._marks = marks;
    }

    get marks(): number {
        return this._marks;
    }

    set marks(value: number) {
        if (value < 0 || value > 100) {
            throw new Error("Marks must be between 0 and 100");
        }

        this._marks = value;
    }
}

const student1 = new Student(85);

console.log(student1.marks); // 85

student1.marks = 95;

console.log(student1.marks); // 95
```

### Important points

- A getter uses the `get` keyword.
- A setter uses the `set` keyword.
- A getter must return a value.
- A setter accepts exactly one parameter.
- We access getters and setters like normal properties, without parentheses.

---

## 13. Class Expressions

Just like functions, classes can also be created using expressions.

Instead of declaring a class directly, we can assign a class to a variable.

Example:

```ts
const Student = class {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    displayName(): void {
        console.log(this.name);
    }
};

const student1 = new Student("Prithvi");

student1.displayName(); // Prithvi
```

Here, the class is assigned to the `Student` variable.

Class expressions are useful when we want to assign classes dynamically or pass them around as values.

---

## 14. The `instanceof` Operator

The `instanceof` operator checks whether an object was created from a particular class or its prototype chain.

Example:

```ts
class Student {
    constructor(public name: string) {}
}

const student1 = new Student("Prithvi");

console.log(student1 instanceof Student); // true
console.log(student1 instanceof Object);  // true
```

It returns a boolean value:

- `true` if the object matches the specified class.
- `false` otherwise.

This is useful when checking the type of an object at runtime.

---