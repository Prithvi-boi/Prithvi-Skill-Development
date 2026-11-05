# TypeScript: Access Modifiers in Classes

## 1. What are Access Modifiers?

Access modifiers control **where class properties and methods can be accessed**.

They help us control which parts of our code can access or modify an object's data.

TypeScript provides three main access modifiers:

1. `public`
2. `private`
3. `protected`

---

## 2. Public

The `public` modifier allows a property or method to be accessed from anywhere.

It is the default access modifier in TypeScript. This means you don't need to write `public` explicitly.

### Example

```ts
class Student {
    public name: string;

    constructor(name: string) {
        this.name = name;
    }

    public displayName(): void {
        console.log(this.name);
    }
}

const student1 = new Student("Prithvi");

console.log(student1.name); // Prithvi
student1.displayName();     // Prithvi
```

We can access `name` and `displayName()` from outside the class.

### Without explicitly writing public

```ts
class Student {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}
```

Both declarations behave the same way because class members are public by default.

**Remember:** Use `public` when you want a property or method to be accessible from anywhere.

---

## 3. Private

The `private` modifier restricts access to a property or method to the class in which it is declared.

It cannot be accessed directly from outside that class.

### Example

```ts
class BankAccount {
    private balance: number;

    constructor(balance: number) {
        this.balance = balance;
    }

    displayBalance(): void {
        console.log(this.balance);
    }
}

const account1 = new BankAccount(5000);

account1.displayBalance(); // 5000

// Error: Property 'balance' is private.
console.log(account1.balance);
```

Here:
- `balance` is private.
- We can access it inside the `BankAccount` class.
- We cannot access it directly using `account1.balance`.

### Why use private?

Imagine a banking application.

We don't want external code to directly change an account's balance.

Instead, we can provide methods that control how the balance is updated.

```ts
class BankAccount {
    private balance: number;

    constructor(balance: number) {
        this.balance = balance;
    }

    deposit(amount: number): void {
        if (amount <= 0) {
            console.log("Invalid deposit amount");
            return;
        }

        this.balance += amount;
    }

    withdraw(amount: number): void {
        if (amount <= 0 || amount > this.balance) {
            console.log("Invalid withdrawal");
            return;
        }

        this.balance -= amount;
    }

    displayBalance(): void {
        console.log(`Balance: ${this.balance}`);
    }
}

const account1 = new BankAccount(5000);

account1.deposit(1000);
account1.withdraw(2000);

account1.displayBalance(); // Balance: 4000
```

Now, the balance can only be changed through the methods we provide.

**Remember:** `private` helps protect class data from direct access and modification through normal TypeScript code.

---

## 4. Protected

The `protected` modifier allows a property or method to be accessed:

- Inside the class where it is declared.
- Inside classes that inherit from it.

It cannot be accessed directly from outside the class.

### Example

```ts
class Employee {
    protected salary: number;

    constructor(salary: number) {
        this.salary = salary;
    }

    displaySalary(): void {
        console.log(this.salary);
    }
}

class Developer extends Employee {
    showSalary(): void {
        console.log(this.salary);
    }
}

const employee1 = new Employee(30000);

employee1.displaySalary(); // 30000

// Error: salary is protected.
console.log(employee1.salary);
```

Here:
- `salary` is declared as protected inside `Employee`.
- `Employee` can access it.
- `Developer` can also access it because it inherits from `Employee`.
- External code cannot access it directly.

**Remember:** `protected` is useful when a property or method should be available inside a class and its subclasses, but not to outside code.

---

## 5. Access Modifiers in Constructors

TypeScript allows us to use access modifiers directly in constructor parameters.

This is called **parameter properties**.

It automatically declares and initializes class properties.

### Without parameter properties

```ts
class Student {
    private name: string;
    private age: number;

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
        private name: string,
        public age: number
    ) {}
}
```

Both examples create the same properties with the same access restrictions.

Notice:
- `name` is automatically created as a private property.
- `age` is automatically created as a public property.
- Their values are initialized from the constructor arguments.

You can use `public`, `private`, and `protected` in parameter properties.

---

## 6. TypeScript `private` vs JavaScript `#private`

TypeScript also supports JavaScript's native private fields using the `#` prefix.

These are different from TypeScript's `private` modifier.

### TypeScript private

```ts
class Student {
    private age: number = 20;
}

const student1 = new Student();

// TypeScript error:
console.log(student1.age);
```

TypeScript's `private` is primarily a compile-time restriction. It is not JavaScript runtime privacy.

### JavaScript private field

```ts
class Student {
    #age: number = 20;

    displayAge(): void {
        console.log(this.#age);
    }
}

const student1 = new Student();

student1.displayAge(); // 20

// Runtime error:
// console.log(student1.#age);
```

The `#age` field is enforced as private by JavaScript at runtime.

### Difference

| Feature | `private` | `#private` |
|---|---|---|
| TypeScript compile-time restriction | Yes | Yes |
| JavaScript runtime privacy | No | Yes |
| Can be accessed outside the class | Not through normal TypeScript checking | No |
| Syntax | `private age` | `#age` |

