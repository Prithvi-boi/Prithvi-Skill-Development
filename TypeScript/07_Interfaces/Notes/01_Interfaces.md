# TypeScript: Interfaces

## 1. What is an Interface?

An **interface** in TypeScript defines the structure of an object. It specifies which properties and methods an object should have and what types they should follow.

In simple words, an interface acts like a blueprint for an object.

### Example

```ts
interface Student {
    name: string;
    age: number;
    rollNumber: number;
}

const student: Student = {
    name: "Prithvi",
    age: 20,
    rollNumber: 10
};
```

Here, the `Student` interface defines the required properties of a student object.

If we miss a required property or assign an incorrect type, TypeScript reports an error.

---

## 2. Optional Properties (`?`)

Sometimes, an object may not contain every property.

We can make a property optional using the `?` symbol.

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
    name: "Rahul",
    age: 21,
    email: "rahul@example.com"
};
```

Both objects are valid because `email` is optional.

**Important:** An optional property can be `undefined` when accessed.

```ts
console.log(student1.email); // undefined
```

---

## 3. Readonly Properties (`readonly`)

The `readonly` keyword prevents a property from being reassigned after the object is created.

```ts
interface Student {
    readonly rollNumber: number;
    name: string;
}

const student: Student = {
    rollNumber: 10,
    name: "Prithvi"
};

student.name = "Rahul"; // Allowed

student.rollNumber = 20; // Error
```

Here:
- `name` can be modified.
- `rollNumber` cannot be reassigned.

**Note:** `readonly` provides compile-time protection. It does not freeze the object at runtime.

---

## 4. Interfaces with Functions

Interfaces can also describe the structure of functions.

### Function as a Property

```ts
interface Calculator {
    add: (a: number, b: number) => number;
    subtract: (a: number, b: number) => number;
}

const calculator: Calculator = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b
};

console.log(calculator.add(10, 5));
```

### Method Syntax

```ts
interface Student {
    name: string;

    displayDetails(): void;
}

const student: Student = {
    name: "Prithvi",

    displayDetails() {
        console.log(this.name);
    }
};

student.displayDetails();
```

Both syntaxes describe function behavior, but use different syntax.

---

## 5. Interfaces with Arrays

We can use interfaces to define the structure of objects stored inside arrays.

```ts
interface Student {
    name: string;
    age: number;
}

const students: Student[] = [
    { name: "Prithvi", age: 20 },
    { name: "Rahul", age: 21 },
    { name: "Amit", age: 19 }
];
```

Now every element in the `students` array must follow the `Student` interface.

We can also use:

```ts
const students: Array<Student> = [];
```

Both `Student[]` and `Array<Student>` represent arrays of students.

---

## 6. Extending Interfaces (`extends`)

An interface can inherit properties and methods from another interface using `extends`.

This helps us reuse existing structures instead of writing the same properties repeatedly.

### Example

```ts
interface Person {
    name: string;
    age: number;
}

interface Student extends Person {
    rollNumber: number;
    department: string;
}

const student: Student = {
    name: "Prithvi",
    age: 20,
    rollNumber: 10,
    department: "BCA"
};
```

The `Student` interface automatically includes the properties of `Person`.

We can also extend multiple interfaces:

```ts
interface Person {
    name: string;
}

interface Employee {
    salary: number;
}

interface Manager extends Person, Employee {
    department: string;
}
```

Now `Manager` contains properties from both `Person` and `Employee`, along with its own property.

---

## 7. Interface Declaration Merging

Unlike type aliases, interfaces with the same name can be declared multiple times.

TypeScript automatically merges their properties.

```ts
interface Student {
    name: string;
}

interface Student {
    age: number;
}

const student: Student = {
    name: "Prithvi",
    age: 20
};
```

TypeScript treats both declarations as one interface:

```ts
interface Student {
    name: string;
    age: number;
}
```

**Important:** If both declarations contain the same property, its type must be compatible. Conflicting property types cause an error.

---

## 8. Interfaces with Index Signatures

Sometimes we don't know the exact property names of an object, but we know the types of its keys and values.

We can use an index signature for this.

### Example

```ts
interface StudentMarks {
    [subject: string]: number;
}

const marks: StudentMarks = {
    Mathematics: 90,
    English: 85,
    Science: 92
};
```

Here:
- Property names must be strings.
- Property values must be numbers.

Another example:

```ts
interface User {
    [key: string]: string | number;
}

const user: User = {
    name: "Prithvi",
    age: 20,
    rollNumber: 10
};
```

**Note:** Index signatures describe the types of properties, not a fixed list of property names.

---