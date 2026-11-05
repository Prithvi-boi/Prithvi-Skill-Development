# TypeScript: Abstract Classes

## 1. What is an Abstract Class?

An **abstract class** is a class that acts as a blueprint for other classes.

Unlike a normal class, an abstract class **cannot be instantiated directly**.

It is designed to provide a common structure that other classes can build upon.

We use the `abstract` keyword to declare an abstract class.

### Syntax

```ts
abstract class ClassName {
    // Properties and methods
}
```

### Example

```ts
abstract class Animal {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    displayName(): void {
        console.log(this.name);
    }
}
```

We cannot create an object directly from this class:

```ts
// Error: Cannot create an instance of an abstract class.
const animal1 = new Animal("Dog");
```

However, other classes can extend it and use its functionality.

---

## 2. Abstract Methods

An abstract method is a method that is declared inside an abstract class but does not contain an implementation.

The class that extends the abstract class must provide an implementation for that method.

### Syntax

```ts
abstract class Animal {
    abstract makeSound(): void;
}
```

Notice that:
- We use the `abstract` keyword.
- We declare the method's name, parameters, and return type.
- We do not provide a method body.

### Example

```ts
abstract class Animal {
    abstract makeSound(): void;
}

class Dog extends Animal {
    makeSound(): void {
        console.log("Woof!");
    }
}

class Cat extends Animal {
    makeSound(): void {
        console.log("Meow!");
    }
}

const dog = new Dog();
const cat = new Cat();

dog.makeSound(); // Woof!
cat.makeSound(); // Meow!
```

Here:
- `Animal` declares what every concrete animal class must implement.
- `Dog` and `Cat` provide their own implementations.
- Both classes follow the structure defined by `Animal`.

**Important:** A class containing an abstract method must itself be declared abstract.

---

## 3. Abstract Classes Can Have Normal Methods

An abstract class does not need to contain only abstract methods.

It can also contain normal methods with complete implementations.

These methods can be used directly by classes that extend it.

### Example

```ts
abstract class Animal {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    displayName(): void {
        console.log(`Animal: ${this.name}`);
    }

    abstract makeSound(): void;
}

class Dog extends Animal {
    makeSound(): void {
        console.log("Woof!");
    }
}

const dog = new Dog("Buddy");

dog.displayName(); // Animal: Buddy
dog.makeSound();   // Woof!
```

Here:
- `displayName()` already has an implementation.
- `makeSound()` must be implemented by the concrete subclass.
- `Dog` gets the existing `displayName()` method and provides its own `makeSound()` implementation.

---

## 4. Abstract Properties

Abstract classes can also declare abstract properties.

An abstract property specifies that a subclass must provide a property with the required name and type.

### Example

```ts
abstract class Employee {
    abstract department: string;

    displayDepartment(): void {
        console.log(this.department);
    }
}

class Developer extends Employee {
    department: string = "IT";
}

class Accountant extends Employee {
    department: string = "Finance";
}

const developer = new Developer();

developer.displayDepartment(); // IT
```

Here:
- `Employee` declares the required `department` property.
- `Developer` and `Accountant` provide their own values.
- The abstract class defines the structure without deciding the actual department.

---

## 5. Abstract Classes with Constructors

An abstract class can have a constructor.

The constructor initializes properties when an object of a concrete subclass is created.

You cannot call the abstract class constructor directly by creating an abstract class object. Instead, the subclass constructor invokes it through `super()`.

### Example

```ts
abstract class Employee {
    name: string;
    salary: number;

    constructor(name: string, salary: number) {
        this.name = name;
        this.salary = salary;
    }

    abstract calculateBonus(): number;
}

class Developer extends Employee {
    calculateBonus(): number {
        return this.salary * 0.10;
    }
}

const developer = new Developer("Prithvi", 50000);

console.log(developer.name);           // Prithvi
console.log(developer.calculateBonus()); // 5000
```

The `Developer` object receives its initial values through the constructor defined in `Employee`.

If the subclass defines its own constructor, it must call `super()` before accessing `this`.

```ts
class Developer extends Employee {
    constructor(name: string, salary: number) {
        super(name, salary);
    }

    calculateBonus(): number {
        return this.salary * 0.10;
    }
}
```

---

## 6. Abstract Classes as Types

An abstract class can also be used as a type.

This allows us to create variables or function parameters that accept objects belonging to concrete subclasses of that abstract class.

### Example

```ts
abstract class Animal {
    abstract makeSound(): void;
}

class Dog extends Animal {
    makeSound(): void {
        console.log("Woof!");
    }
}

class Cat extends Animal {
    makeSound(): void {
        console.log("Meow!");
    }
}

function playSound(animal: Animal): void {
    animal.makeSound();
}

const dog = new Dog();
const cat = new Cat();

playSound(dog); // Woof!
playSound(cat); // Meow!
```

Here:

```ts
function playSound(animal: Animal): void
```

The parameter accepts any compatible concrete subclass instance.

We cannot pass a plain `Animal` object because abstract classes cannot be instantiated.

---


## 7. Abstract Class vs Normal Class

| Feature | Normal Class | Abstract Class |
|---|---|---|
| Can create objects directly | Yes | No |
| Can have properties | Yes | Yes |
| Can have constructors | Yes | Yes |
| Can have normal methods | Yes | Yes |
| Can have abstract methods | No | Yes |
| Can have abstract properties | No | Yes |
| Can be extended | Yes | Yes |
| Can be used as a type | Yes | Yes |

---

# TypeScript: Abstract Classes – Practice Questions

## 1. Animal System
Create an abstract `Animal` class with an abstract `makeSound()` method. Implement it in `Dog` and `Cat` classes.

## 2. Employee Management
Create an abstract `Employee` class with `name`, `salary`, and an abstract `calculateBonus()` method. Implement it in `Developer` and `Manager`.

## 3. Shape Calculator
Create an abstract `Shape` class with an abstract `calculateArea()` method. Implement it in `Circle` and `Rectangle`.

## 4. Payment System
Create an abstract `Payment` class with an `amount` property, constructor, and abstract `pay()` method. Implement it in `UPIPayment` and `CardPayment`.

## 5. Vehicle Rental System
Create an abstract `Vehicle` class with `brand`, `rentPrice`, and an abstract `calculateRent(days: number)` method. Implement it in `Car` and `Bike` classes.