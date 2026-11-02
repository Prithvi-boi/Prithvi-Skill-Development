# TypeScript: Type Aliases (`type`) and Type vs Interface

## 1. What is a Type Alias?

A **type alias** allows us to create a custom name for an existing type.

We use the `type` keyword to define it.

### Syntax

```ts
type TypeName = ExistingType;
```

### Example

```ts
type Username = string;

let user: Username = "Prithvi";
```

Here, `Username` is an alias for the `string` type.

Instead of writing `string` everywhere, we can use `Username`.

---

## 2. Type Alias with Primitive Types

We can create aliases for primitive types such as `string`, `number`, and `boolean`.

```ts
type Age = number;
type Name = string;
type IsActive = boolean;

let age: Age = 20;
let name: Name = "Prithvi";
let active: IsActive = true;
```

**Note:** A type alias does not create a completely new type. It gives an existing type another name.

---

## 3. Type Alias with Objects

We can use type aliases to define the structure of objects, just like interfaces.

```ts
type Student = {
    name: string;
    age: number;
    rollNumber: number;
};

const student: Student = {
    name: "Prithvi",
    age: 20,
    rollNumber: 10
};
```

We can also use optional and readonly properties.

```ts
type Student = {
    readonly rollNumber: number;
    name: string;
    email?: string;
};
```

- `readonly` prevents reassignment of a property.
- `?` makes a property optional.

---

## 4. Type Alias with Union Types (`|`)

One of the major advantages of type aliases is that they can define union types.

A union allows a variable to hold one of several specified types.

```ts
type ID = string | number;

let userId: ID;

userId = 101;       // Valid
userId = "USER101"; // Valid
userId = true;      // Error
```

### Literal Union Types

We can also restrict values to a specific set of options.

```ts
type Department = "BCA" | "BCOM" | "BBA";

let department: Department = "BCA";

department = "MBA"; // Error
```

This is useful when we want to restrict a variable to predefined values.

---

## 5. Type Alias with Intersection Types (`&`)

An intersection combines multiple types into one.

```ts
type Person = {
    name: string;
    age: number;
};

type Employee = {
    salary: number;
    department: string;
};

type Manager = Person & Employee;
```

Now `Manager` contains all properties from both `Person` and `Employee`.

```ts
const manager: Manager = {
    name: "Prithvi",
    age: 20,
    salary: 50000,
    department: "IT"
};
```

---

## 6. Type Alias with Arrays and Tuples

### Arrays

```ts
type Marks = number[];

const studentMarks: Marks = [90, 85, 95];
```

### Tuples

```ts
type StudentRecord = [number, string, number];

const student: StudentRecord = [10, "Prithvi", 20];
```

Here, the tuple represents:

1. Roll number
2. Name
3. Age

---

## 7. Type Alias with Functions

We can define function types using type aliases.

```ts
type Calculator = (a: number, b: number) => number;

const add: Calculator = (a, b) => {
    return a + b;
};

console.log(add(10, 20));
```

The `Calculator` type defines the expected parameters and return type of the function.

---

# Type Alias vs Interface

## 8. Similarities

Both `type` and `interface` can define object structures.

### Using Type Alias

```ts
type Student = {
    name: string;
    age: number;
};
```

### Using Interface

```ts
interface Student {
    name: string;
    age: number;
}
```

Both provide the same basic functionality here.

---

## 9. Key Differences

| Feature | Type Alias | Interface |
|---|---|---|
| Object structures | Yes | Yes |
| Primitive aliases | Yes | No |
| Union types (`\|`) | Yes | No |
| Intersection types (`&`) | Yes | Through `extends` |
| Arrays and tuples | Yes | Not directly |
| Function types | Yes | Yes |
| Extending | Intersection (`&`) | `extends` |
| Declaration merging | No | Yes |

---

## 10. Extending Types vs Interfaces

Both can combine existing structures, but their syntax differs.

### Extending an Interface

We use the `extends` keyword.

```ts
interface Person {
    name: string;
    age: number;
}

interface Student extends Person {
    rollNumber: number;
}
```

### Extending a Type Alias

We use the intersection (`&`) operator.

```ts
type Person = {
    name: string;
    age: number;
};

type Student = Person & {
    rollNumber: number;
};
```

Both approaches combine the properties of `Person` and `Student`.

---

## 11. Declaration Merging

Interfaces support declaration merging, whereas type aliases do not.

### Interface

```ts
interface Student {
    name: string;
}

interface Student {
    age: number;
}
```

TypeScript automatically combines both declarations.

The resulting interface contains:

```ts
interface Student {
    name: string;
    age: number;
}
```

### Type Alias

```ts
type Student = {
    name: string;
};

type Student = {
    age: number;
}; // Error: Duplicate identifier
```

Type aliases cannot be declared multiple times with the same name.

---

## 12. When Should You Use Type or Interface?

Both are useful, and neither is universally better.

### Prefer Interface When:

- Defining object structures.
- Creating reusable object contracts.
- Working with class implementations.
- You want declaration merging.
- You expect other interfaces to extend it.

### Prefer Type Alias When:

- Defining union types.
- Defining intersection types.
- Creating primitive aliases.
- Working with tuples and function types.
- Creating more complex type combinations.

**Practical recommendation:** Use interfaces for object structures and type aliases for unions, intersections, and other custom type combinations. This is a convention, not a strict rule.

---

