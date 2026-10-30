# TypeScript: Intersection Types (`&`)

## 1. What is an Intersection Type?

An Intersection Type combines multiple types into one.

It means a value must satisfy **ALL the specified types simultaneously**.

We use the ampersand (`&`) symbol to define an intersection.

### Syntax

```ts
type NewType = Type1 & Type2;
```

### Example

```ts
type Student = {
    name: string;
    age: number;
};

type Employee = {
    employeeId: number;
    salary: number;
};

type StudentEmployee = Student & Employee;
```

Now `StudentEmployee` contains all the properties from both `Student` and `Employee`.

```ts
const person: StudentEmployee = {
    name: "Prithvi",
    age: 20,
    employeeId: 101,
    salary: 25000
};
```

The object must contain all four properties.

---


## --> What Happens When Same Properties Have Different Types?

This is an important case to understand.

Consider:

```ts
type A = {
    value: string;
};

type B = {
    value: number;
};

type C = A & B;
```

Here, both types contain a property called `value`, but their types are different.

The resulting property type is:

```ts
type C = {
    value: string & number;
};
```

Since a value cannot be both a string and a number, this property becomes `never`.

Therefore, it is impossible to assign a normal value to `value`.

```ts
const data: C = {
    value: "Hello" // Error
};
```

**Important:** When combining types, make sure properties with the same names have compatible types.

---

## 2. Understanding How Intersection Works

Consider two types:

```ts
type A = {
    name: string;
};

type B = {
    age: number;
};
```

We can combine them:

```ts
type C = A & B;
```

The resulting type is conceptually:

```ts
type C = {
    name: string;
    age: number;
};
```

This means the resulting object must satisfy both `A` and `B`.

### What happens if a property is missing?

```ts
const person: C = {
    name: "Prithvi"
};
```

TypeScript gives an error because the `age` property is missing.

---

## 3. Intersection Types with Multiple Types

We can combine more than two types.

```ts
type PersonalInfo = {
    name: string;
    age: number;
};

type AcademicInfo = {
    rollnum: number;
    department: string;
};

type ContactInfo = {
    email: string;
    phone: number;
};

type Student = PersonalInfo & AcademicInfo & ContactInfo;
```

Now `Student` contains all properties from the three types.

```ts
const student: Student = {
    name: "Prithvi",
    age: 20,
    rollnum: 101,
    department: "BCA",
    email: "student@example.com",
    phone: 9876543210
};
```

This is useful when an object needs to combine multiple independent sets of properties.

---

## 4. Intersection Types with Interfaces

We can also combine interfaces using intersection types.

```ts
interface Person {
    name: string;
    age: number;
}

interface Employee {
    employeeId: number;
    salary: number;
}

type WorkingPerson = Person & Employee;
```

Example:

```ts
const employee: WorkingPerson = {
    name: "Prithvi",
    age: 20,
    employeeId: 101,
    salary: 25000
};
```

**Note:** We can use both interfaces and type aliases in intersections.

---

## 5. Intersection Types with Functions

Intersection types can also combine function types.

```ts
type NameFunction = (name: string) => void;

type AgeFunction = (age: number) => void;

type CombinedFunction = NameFunction & AgeFunction;
```

However, this does not mean one ordinary function can accept both signatures as separate calls automatically. A function implementing the combined type must support both call signatures.

Example:

```ts
type CombinedFunction =
    ((value: string) => void) &
    ((value: number) => void);

const display: CombinedFunction = (value: string | number) => {
    console.log(value);
};

display("Prithvi");
display(20);
```

Here, the function supports both signatures.

---

## 6. Intersection vs Union Types

These are two important concepts in TypeScript.

### Union Type (`|`)

A value can satisfy one of the specified types.

```ts
type A = {
    name: string;
};

type B = {
    age: number;
};

type Person = A | B;
```

A value can satisfy `A` or `B`, or even both.

### Intersection Type (`&`)

A value must satisfy both types.

```ts
type Person = A & B;
```

Now the value must contain both `name` and `age`.

### Comparison

| Union (`\|`) | Intersection (`&`) |
|---|---|
| Either type | Both types |
| A OR B | A AND B |
| Allows alternatives | Combines requirements |
| Can be narrowed to a specific type | Provides combined requirements |

---