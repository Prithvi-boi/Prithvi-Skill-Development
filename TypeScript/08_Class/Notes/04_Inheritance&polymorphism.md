# TypeScript: Inheritance and Polymorphism

# Part 1: Inheritance

## 1. What is Inheritance?

**Inheritance** is an object-oriented programming concept that allows one class to acquire the properties and methods of another class.

Instead of writing the same code repeatedly, we can create a common class and reuse its functionality in other classes.

For example, imagine we have an `Animal` class containing:
- `name`
- `age`
- `eat()`
- `sleep()`

Now, we want to create `Dog` and `Cat` classes.

Both animals have names, ages, and can eat and sleep. Instead of defining these properties and methods again, we can inherit them from the `Animal` class.

### Basic Syntax

```ts
class Parent {
    // Properties and methods
}

class Child extends Parent {
    // Additional properties and methods
}
```

- `Parent` is the base class (parent class).
- `Child` is the derived class (child class).
- `extends` establishes inheritance.

---

## 2. Basic Inheritance Example

```ts
class Animal {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    eat(): void {
        console.log(`${this.name} is eating`);
    }
}

class Dog extends Animal {
    bark(): void {
        console.log(`${this.name} is barking`);
    }
}

const dog1 = new Dog("Buddy");

dog1.eat();
dog1.bark();
```

Output:

```text
Buddy is eating
Buddy is barking
```

### How does it work?

1. `Animal` contains the `name` property and `eat()` method.
2. `Dog` extends `Animal`.
3. `Dog` automatically gets the accessible members of `Animal`.
4. We can use those members through the `dog1` object.

**Important:** Inheritance allows us to reuse existing code without rewriting it.

---

## 3. The `super` Keyword

The `super` keyword is used inside a child class to access its parent class's constructor and methods.

It is especially important when the child class defines its own constructor.

### Calling the Parent Constructor

Consider this example:

```ts
class Animal {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

class Dog extends Animal {
    breed: string;

    constructor(name: string, breed: string) {
        super(name);
        this.breed = breed;
    }
}

const dog1 = new Dog("Buddy", "Golden Retriever");

console.log(dog1.name);  // Buddy
console.log(dog1.breed); // Golden Retriever
```

### Understanding `super(name)`

When we create the object:

```ts
const dog1 = new Dog("Buddy", "Golden Retriever");
```

The following happens:

1. The `Dog` constructor receives both arguments.
2. `super(name)` calls the `Animal` constructor.
3. The parent constructor initializes `name`.
4. The child constructor initializes `breed`.

**Important rules:**
- If a child class defines a constructor, it must call `super()` before accessing `this`.
- `super()` calls the parent constructor.
- A child class without its own constructor can use the parent's constructor automatically.

---

## 4. Accessing Parent Methods Using `super`

We can also use `super` to call a method from the parent class.

```ts
class Animal {
    makeSound(): void {
        console.log("Animal makes a sound");
    }
}

class Dog extends Animal {
    makeSound(): void {
        super.makeSound();
        console.log("Dog barks");
    }
}

const dog1 = new Dog();

dog1.makeSound();
```

Output:

```text
Animal makes a sound
Dog barks
```

Here:

```ts
super.makeSound();
```

Calls the `makeSound()` method defined in the parent class.

---

## 5. Types of Inheritance

TypeScript supports several inheritance structures through classes.

### A. Single Inheritance

One child class inherits from one parent class.

```ts
class Animal {
    eat(): void {
        console.log("Eating");
    }
}

class Dog extends Animal {
    bark(): void {
        console.log("Barking");
    }
}
```

Structure:

```text
Animal
   |
   v
  Dog
```

### B. Multilevel Inheritance

A class inherits from another child class, creating multiple levels.

```ts
class Animal {
    eat(): void {
        console.log("Eating");
    }
}

class Mammal extends Animal {
    walk(): void {
        console.log("Walking");
    }
}

class Dog extends Mammal {
    bark(): void {
        console.log("Barking");
    }
}
```

Structure:

```text
Animal
   |
   v
Mammal
   |
   v
 Dog
```

The `Dog` class can access the accessible methods from both `Mammal` and `Animal`.

### C. Hierarchical Inheritance

Multiple child classes inherit from the same parent class.

```ts
class Animal {
    eat(): void {
        console.log("Eating");
    }
}

class Dog extends Animal {
    bark(): void {
        console.log("Barking");
    }
}

class Cat extends Animal {
    meow(): void {
        console.log("Meowing");
    }
}
```

Structure:

```text
       Animal
       /    \
      v      v
     Dog    Cat
```

Both `Dog` and `Cat` inherit the `eat()` method.

### D. Multiple Inheritance

Multiple inheritance means a class inherits directly from more than one class.

TypeScript does **not** support multiple class inheritance.

For example, this is invalid:

```ts
class Animal {
    eat(): void {}
}

class Machine {
    start(): void {}
}

// Invalid TypeScript syntax
class RobotDog extends Animal, Machine {}
```

However, TypeScript supports implementing multiple interfaces using `implements`.

---

## 6. Method Overriding

Method overriding happens when a child class provides its own implementation of a method that already exists in its parent class.

This allows the child class to customize inherited behavior.

### Example

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

const animal = new Animal();
const dog = new Dog();

animal.makeSound(); // Animal makes a sound
dog.makeSound();    // Dog barks
```

Here:
- `Animal` defines `makeSound()`.
- `Dog` provides a different implementation.
- The `override` keyword explicitly indicates that the method is overriding a parent method.

### Why use `override`?

TypeScript's `override` keyword helps prevent mistakes.

For example, if you accidentally write the wrong method name, TypeScript can report that there is no method to override.

**Remember:** The `override` keyword is optional unless the `noImplicitOverride` compiler option is enabled.

---

# Part 2: Polymorphism

## 7. What is Polymorphism?

The word **polymorphism** means "many forms."

In object-oriented programming, polymorphism allows the same method or interface to behave differently depending on the object using it.

For example, different animals make different sounds:

- Dog → Woof
- Cat → Meow
- Cow → Moo

Although all animals use the same method name, `makeSound()`, each class provides different behavior.

---

## 8. Polymorphism Through Method Overriding

One common way to achieve polymorphism is through method overriding.

```ts
class Animal {
    makeSound(): void {
        console.log("Animal makes a sound");
    }
}

class Dog extends Animal {
    override makeSound(): void {
        console.log("Woof!");
    }
}

class Cat extends Animal {
    override makeSound(): void {
        console.log("Meow!");
    }
}

const dog = new Dog();
const cat = new Cat();

dog.makeSound(); // Woof!
cat.makeSound(); // Meow!
```

Both objects call the same method name:

```ts
makeSound()
```

But the output depends on the actual object.

This is polymorphism.

---

## 9. Polymorphism Through Parent Class References

We can also use a parent class type to refer to different child class objects.

This is one of the most important uses of polymorphism.

```ts
class Animal {
    makeSound(): void {
        console.log("Animal makes a sound");
    }
}

class Dog extends Animal {
    override makeSound(): void {
        console.log("Woof!");
    }
}

class Cat extends Animal {
    override makeSound(): void {
        console.log("Meow!");
    }
}

const animals: Animal[] = [
    new Dog(),
    new Cat(),
    new Dog()
];

animals.forEach((animal) => {
    animal.makeSound();
});
```

Output:

```text
Woof!
Meow!
Woof!
```

### How does this work?

Look at this declaration:

```ts
const animals: Animal[] = [
    new Dog(),
    new Cat()
];
```

- `Animal[]` means an array of values compatible with the `Animal` type.
- `Dog` and `Cat` extend `Animal`.
- Therefore, their objects can be stored in this array.
- When `makeSound()` is called, the actual object's implementation runs.

This allows us to work with different object types through one common parent type.

---

## 10. Polymorphism Using Abstract Classes

Abstract classes are another way to define a common structure for polymorphic behavior.

They can require subclasses to implement particular methods.

```ts
abstract class Shape {
    abstract calculateArea(): number;
}

class Rectangle extends Shape {
    constructor(
        private width: number,
        private height: number
    ) {
        super();
    }

    override calculateArea(): number {
        return this.width * this.height;
    }
}

class Circle extends Shape {
    constructor(private radius: number) {
        super();
    }

    override calculateArea(): number {
        return Math.PI * this.radius ** 2;
    }
}

const shapes: Shape[] = [
    new Rectangle(10, 5),
    new Circle(7)
];

shapes.forEach((shape) => {
    console.log(shape.calculateArea());
});
```

Here:
- `Shape` defines a common method.
- `Rectangle` calculates its area differently.
- `Circle` calculates its area differently.
- Both objects can be handled through the `Shape` type.

---

## 11. Inheritance vs Polymorphism

These concepts are related, but they are not the same.

| Inheritance | Polymorphism |
|---|---|
| Allows one class to reuse another class's functionality. | Allows the same operation to behave differently for different objects. |
| Uses `extends` between classes. | Often uses overriding and a common parent type. |
| Focuses on code reuse and class relationships. | Focuses on flexible behavior. |
| Example: `Dog extends Animal`. | Example: `Dog` and `Cat` implement `makeSound()` differently. |

### Simple way to remember

**Inheritance:** A child class gets functionality from a parent class.

**Polymorphism:** Different objects respond differently to the same method call.

---