# TypeScript Classes

#### Topics Covered
1. What is a Class?
2. Class Properties and Type Annotations
3. `Constructor`
   - Optional constructor parameters `?`
   - Constructor parameter properties
4. Class Methods
5. Access Modifiers
   - `public`
   - `private`
   - `protected`
6. `Readonly` Properties
7. Getters and Setters
8. `Inheritance` (extends)
   - `super()`
9. Method `Overriding` (override)
10. Static Properties and Methods (static)
11. `Abstract Classes`
- Abstract methods
12. Implementing `Interfaces in Classes` (implements)
13. Classes as Types
14. `Generic Classes`
15. Class vs Interface

---

## 1. What is a Class?

A **class** is a blueprint or template used to create objects.

It defines the properties (data) and methods (behaviours) that objects created from it can have.

For example, imagine creating multiple student objects. Instead of manually creating every object with the same structure, we can define a `Student` class.

```ts
class Student {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    introduce(): void {
        console.log(`Hi, I am ${this.name} and I am ${this.age} years old.`);
    }
}

const student1 = new Student("Prithvi", 20);
const student2 = new Student("Vicky", 19);

student1.introduce();
student2.introduce();
```

> ## Why Don't We Use `let` or `const` Inside Classes?
> In TypeScript, class properties are declared directly using their names and types. We don't use `let` or `const` because they are used for declaring variables, not class properties.
> **Remember:** Use `let` and `const` for local variables, and `readonly` when you want a class property that cannot be reassigned.

### Understanding the code

- `class Student`: Defines a class named Student.
- `name` and `age`: Properties of the class.
- `constructor()`: Special method called when creating a new object.
- `this`: Refers to the current object.
- `introduce()`: A method defined inside the class.
- `new Student()`: Creates a new instance of the Student class.

**Important:** A class is a blueprint. An object created from that class is called an instance.

---

## 2. Class Properties and Type Annotations

Just like variables, class properties can have TypeScript types.

```ts
class Product {
    name: string;
    price: number;
    inStock: boolean;

    constructor(name: string, price: number, inStock: boolean) {
        this.name = name;
        this.price = price;
        this.inStock = inStock;
    }
}

const laptop = new Product("Laptop", 50000, true);
```

You can also assign default values to properties.

```ts
class User {
    name: string = "Guest";
    age: number = 18;
}

const user1 = new User();

console.log(user1.name); // Guest
console.log(user1.age);  // 18
```

If you provide a default value, you don't need to initialize that property again in the constructor.

---

## 3. Constructor

The `constructor` is a special method that runs automatically whenever a new instance of a class is created.

```ts
class Car {
    brand: string;
    model: string;

    constructor(brand: string, model: string) {
        this.brand = brand;
        this.model = model;
    }
}

const car1 = new Car("Toyota", "Fortuner");
const car2 = new Car("BMW", "M5");
```

### Constructor with optional parameters

You can also make constructor parameters optional.

```ts
class Employee {
    name: string;
    department?: string;

    constructor(name: string, department?: string) {
        this.name = name;
        this.department = department;
    }
}

const employee1 = new Employee("Prithvi");
const employee2 = new Employee("Vicky", "IT");
```

### Constructor parameter properties

TypeScript provides a shortcut for declaring and initializing class properties directly inside the constructor parameters.

Instead of writing:

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

You can write:

```ts
class Student {
    constructor(
        public name: string,
        public age: number
    ) {}
}

const student = new Student("Prithvi", 20);
```

The `public` keyword automatically declares the properties and assigns the constructor arguments to them.

This is called **parameter properties**.

---

## 4. Class Methods

Methods are functions defined inside a class.

They describe what an object can do.

```ts
class Calculator {
    add(a: number, b: number): number {
        return a + b;
    }

    subtract(a: number, b: number): number {
        return a - b;
    }

    multiply(a: number, b: number): number {
        return a * b;
    }
}

const calculator = new Calculator();

console.log(calculator.add(10, 20));      // 30
console.log(calculator.subtract(20, 5));  // 15
console.log(calculator.multiply(5, 5));   // 25
```

Methods can also access properties using `this`.

```ts
class BankAccount {
    balance: number;

    constructor(balance: number) {
        this.balance = balance;
    }

    deposit(amount: number): void {
        this.balance += amount;
    }

    showBalance(): void {
        console.log(`Balance: ${this.balance}`);
    }
}

const account = new BankAccount(1000);

account.deposit(500);
account.showBalance(); // Balance: 1500
```

---

## 5. Access Modifiers

Access modifiers control where class properties and methods can be accessed.

TypeScript provides three main access modifiers:

- `public`
- `private`
- `protected`

### A. Public

A public property or method can be accessed from anywhere.

It is also the default access modifier if you don't specify one.

```ts
class Student {
    public name: string;

    constructor(name: string) {
        this.name = name;
    }
}

const student = new Student("Prithvi");

console.log(student.name); // Prithvi
student.name = "Vicky";    // Allowed
```

### B. Private

A private property or method can only be accessed within the class where it is declared.

```ts
class BankAccount {
    private balance: number;

    constructor(balance: number) {
        this.balance = balance;
    }

    deposit(amount: number): void {
        this.balance += amount;
    }

    getBalance(): number {
        return this.balance;
    }
}

const account = new BankAccount(5000);

account.deposit(1000);

console.log(account.getBalance()); // 6000

// Error: Property 'balance' is private.
console.log(account.balance);
```

This helps prevent direct access to sensitive internal data.

**Important:** TypeScript's `private` modifier is enforced during type checking. It does not provide the same runtime privacy as JavaScript's `#private` fields.

### C. Protected

A protected property or method can be accessed:

- Inside the class where it is declared.
- Inside classes that inherit from it.

It cannot be accessed directly from outside the class hierarchy.

```ts
class Animal {
    protected name: string;

    constructor(name: string) {
        this.name = name;
    }
}

class Dog extends Animal {
    introduce(): void {
        console.log(`My name is ${this.name}`);
    }
}

const dog = new Dog("Tommy");

dog.introduce(); // My name is Tommy

// Error: Property 'name' is protected.
console.log(dog.name);
```

### Access Modifier Comparison

| Modifier | Inside class | Subclass | Outside class |
|---|---|---|---|
| public | Yes | Yes | Yes |
| private | Yes | No | No |
| protected | Yes | Yes | No |

---

## 6. Readonly Properties

The `readonly` modifier prevents a property from being reassigned after initialization.

It can be initialized:
- During property declaration.
- Inside the constructor.

```ts
class User {
    readonly id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}

const user = new User(101, "Prithvi");

user.name = "Vicky"; // Allowed

// Error: Cannot assign to 'id' because it is readonly.
user.id = 102;
```

**Note:** `readonly` is a TypeScript compile-time restriction. It does not automatically freeze objects at runtime.

---

## 7. Getters and Setters

Getters and setters allow us to control how class properties are accessed and modified.

- `get`: Used to retrieve a value.
- `set`: Used to modify a value.

```ts
class Person {
    private _age: number;

    constructor(age: number) {
        this._age = age;
    }

    get age(): number {
        return this._age;
    }

    set age(value: number) {
        if (value < 0) {
            throw new Error("Age cannot be negative");
        }

        this._age = value;
    }
}

const person = new Person(20);

console.log(person.age); // 20

person.age = 21;

console.log(person.age); // 21

// Throws an error
person.age = -5;
```

Notice that we access `age` like a normal property instead of calling it like a method.

```ts
person.age;    // Getter
person.age = 21; // Setter
```

This is useful when you want validation before modifying a property.

---

## 8. Inheritance (`extends`)

Inheritance allows one class to reuse the properties and methods of another class.

The original class is called the **parent/base class**.

The class that inherits from it is called the **child/derived class**.

```ts
class Animal {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    makeSound(): void {
        console.log("Animal makes a sound");
    }
}

class Dog extends Animal {
    bark(): void {
        console.log(`${this.name} is barking`);
    }
}

const dog = new Dog("Tommy");

dog.makeSound(); // Animal makes a sound
dog.bark();      // Tommy is barking
```

The `Dog` class automatically inherits the `name` property and `makeSound()` method.

### Using `super()`

The `super()` keyword calls the parent class constructor.

```ts
class Animal {
    constructor(public name: string) {}

    introduce(): void {
        console.log(`I am ${this.name}`);
    }
}

class Dog extends Animal {
    constructor(name: string, public breed: string) {
        super(name);
    }
}

const dog = new Dog("Tommy", "Labrador");

dog.introduce();
console.log(dog.breed);
```

**Important:** If a derived class defines a constructor, it must call `super()` before accessing `this`.

---

## 9. Method Overriding

A child class can provide its own implementation of a method inherited from the parent class.

This is called method overriding.

```ts
class Animal {
    makeSound(): void {
        console.log("Animal makes a sound");
    }
}

class Dog extends Animal {
    override makeSound(): void {
        console.log("Dog barks");
    }
}

const dog = new Dog();

dog.makeSound(); // Dog barks
```

The `override` keyword tells TypeScript that you intend to replace a method from the parent class.

It also helps catch mistakes if the parent class does not actually contain the method you're trying to override.

---

## 10. Static Properties and Methods

Normally, class properties and methods are accessed through an instance.

However, `static` members belong directly to the class itself.

```ts
class MathHelper {
    static PI: number = 3.14159;

    static square(number: number): number {
        return number * number;
    }
}

console.log(MathHelper.PI);
console.log(MathHelper.square(5)); // 25
```

Notice that we don't need to create an object.

```ts
MathHelper.square(5); // Correct

// Not necessary
const helper = new MathHelper();
```

Static members are useful for utility functions and values shared by the class.

---

## 11. Abstract Classes

An abstract class is a base class that cannot be instantiated directly.

It is designed to be inherited by other classes.

```ts
abstract class Animal {
    constructor(public name: string) {}

    abstract makeSound(): void;

    introduce(): void {
        console.log(`I am ${this.name}`);
    }
}

class Dog extends Animal {
    makeSound(): void {
        console.log("Woof!");
    }
}

const dog = new Dog("Tommy");

dog.introduce();
dog.makeSound();

// Error: Cannot create an instance of an abstract class.
// const animal = new Animal("Animal");
```

### Abstract methods

An abstract method is declared without an implementation.

Every non-abstract child class must implement it.

In the example, `Dog` must implement `makeSound()`.

Abstract classes are useful when multiple classes should follow a common structure but have different implementations.

---

## 12. Implementing Interfaces in Classes

A class can implement an interface using the `implements` keyword.

An interface defines the structure that a class must follow.

```ts
interface User {
    name: string;
    age: number;

    introduce(): void;
}

class Student implements User {
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

The class must provide the properties and methods required by the interface.

A class can implement multiple interfaces:

```ts
interface Person {
    name: string;
}

interface Employee {
    salary: number;
}

class Developer implements Person, Employee {
    constructor(
        public name: string,
        public salary: number
    ) {}
}

const developer = new Developer("Prithvi", 50000);
```

---

## 13. Classes as Types

A class name can also be used as a type.

```ts
class Student {
    constructor(
        public name: string,
        public age: number
    ) {}
}

const student1 = new Student("Prithvi", 20);

function displayStudent(student: Student): void {
    console.log(student.name);
}

displayStudent(student1);
```

TypeScript checks whether the supplied object has the required compatible structure and members.

**Important:** Class types have some differences from interfaces, especially when private or protected members are involved.

---

## 14. Generic Classes

Generics allow classes to work with different data types while maintaining type safety.

Instead of creating separate classes for different data types, we can create one reusable generic class.

```ts
class Box<T> {
    constructor(public value: T) {}

    getValue(): T {
        return this.value;
    }
}

const numberBox = new Box<number>(100);
const stringBox = new Box<string>("Hello");

console.log(numberBox.getValue()); // 100
console.log(stringBox.getValue()); // Hello
```

Here:

- `T` is a generic type parameter.
- `Box<number>` creates a box that stores a number.
- `Box<string>` creates a box that stores a string.

TypeScript can also infer the generic type:

```ts
const numberBox = new Box(100);
const stringBox = new Box("Hello");
```

---

## 15. Class vs Interface

Both classes and interfaces are important in TypeScript, but they serve different purposes.

| Class | Interface |
|---|---|
| Defines a blueprint for objects with implementation | Defines a structure or contract |
| Can contain properties and method implementations | Describes properties and method signatures |
| Can have a constructor | Cannot have a constructor |
| Supports inheritance using `extends` | Can extend other interfaces |
| Can be instantiated using `new` (if not abstract) | Cannot be instantiated |
| Exists at runtime as JavaScript class code | Erased during compilation |

### Example

Interface:

```ts
interface Student {
    name: string;
    age: number;
}
```

Class:

```ts
class CollegeStudent implements Student {
    constructor(
        public name: string,
        public age: number
    ) {}
}

const student = new CollegeStudent("Prithvi", 20);
```

The interface describes what a student should have.

The class provides an implementation for creating student objects.

---

## 16. Important Things to Remember

1. A class is a blueprint for creating objects.
2. Objects created from a class are called instances.
3. The constructor initializes an instance.
4. `this` refers to the current instance.
5. Access modifiers control accessibility.
6. `readonly` prevents property reassignment.
7. Getters and setters control property access.
8. `extends` enables inheritance.
9. `super()` calls the parent constructor.
10. `override` explicitly marks overridden methods.
11. `static` members belong to the class itself.
12. Abstract classes cannot be instantiated directly.
13. `implements` allows a class to follow an interface.
14. Generics make classes reusable with different types.

## Official Documentation

- [TypeScript Handbook – Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)
- [TypeScript Handbook – Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html)
