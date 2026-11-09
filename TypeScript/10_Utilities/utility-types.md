# TypeScript – Utility Types

Utility types are built-in TypeScript types that help us create new types by modifying or extracting information from existing types.

They reduce code duplication and make our applications easier to maintain.

Let's use this interface for our examples:

```ts
interface Student {
    id: number;
    name: string;
    age: number;
    department: string;
    email?: string;
}
```

---

## 1. Partial<T>

Makes all properties of a type optional.

```ts
type PartialStudent = Partial<Student>;
```

Equivalent to:

```ts
type PartialStudent = {
    id?: number;
    name?: string;
    age?: number;
    department?: string;
    email?: string;
};
```

Usage:

```ts
const student: Partial<Student> = {
    name: "Prithvi"
};
```

**Use case:** Updating a student when you only want to modify a few properties instead of providing the entire object.

## 2. Pick<T, K>

Selects specific properties from an existing type.

Syntax:

```ts
Pick<Type, Keys>
```

Example:

```ts
type StudentDetails = Pick<Student, "name" | "age">;
```

Equivalent to:

```ts
type StudentDetails = {
    name: string;
    age: number;
};
```

Usage:

```ts
const student: StudentDetails = {
    name: "Prithvi",
    age: 20
};
```

**Use case:** Creating a smaller object containing only the properties needed by a component or API.

## 3. Omit<T, K>

Removes specific properties from an existing type.

```ts
type StudentWithoutId = Omit<Student, "id">;
```

Equivalent to:

```ts
type StudentWithoutId = {
    name: string;
    age: number;
    department: string;
    email?: string;
};
```

You can remove multiple properties:

```ts
type BasicStudent = Omit<Student, "id" | "email">;
```

**Use case:** Creating a student object without an ID when registering a new student, because the database generates the ID.

## 4. Readonly<T>

Makes all properties of a type readonly.

```ts
type ReadonlyStudent = Readonly<Student>;
```

Usage:

```ts
const student: Readonly<Student> = {
    id: 1,
    name: "Prithvi",
    age: 20,
    department: "BCA"
};

student.name = "Alex"; // Error
```

You cannot reassign the properties after initialization.

**Use case:** Protecting configuration objects or data that should not be modified.

Note: `Readonly` provides compile-time protection. It does not freeze the object at runtime.

## 5. Record<K, T>

Creates an object type with specific keys and a common value type.

Syntax:

```ts
Record<Keys, ValueType>
```

Example:

```ts
type Departments = "BCA" | "BBA" | "BCOM";

type DepartmentCount = Record<Departments, number>;
```

Equivalent to:

```ts
type DepartmentCount = {
    BCA: number;
    BBA: number;
    BCOM: number;
};
```

Usage:

```ts
const students: DepartmentCount = {
    BCA: 50,
    BBA: 30,
    BCOM: 40
};
```

**Use case:** Creating lookup tables, permissions, configuration objects, and dictionaries.

## 6. Exclude<T, U>

Removes types from a union that are assignable to another type.

```ts
type Status = "Active" | "Inactive" | "Pending";

type CurrentStatus = Exclude<Status, "Pending">;
```

Result:

```ts
type CurrentStatus = "Active" | "Inactive";
```

Another example:

```ts
type Values = string | number | boolean;

type TextValue = Exclude<Values, number | boolean>;
```

Result:

```ts
type TextValue = string;
```

**Remember:** Exclude removes matching types from a union.

## 7. Extract<T, U>

Keeps only the types from a union that are assignable to another type.

```ts
type Status = "Active" | "Inactive" | "Pending";

type SelectedStatus = Extract<Status, "Active" | "Pending">;
```

Result:

```ts
type SelectedStatus = "Active" | "Pending";
```

Another example:

```ts
type Values = string | number | boolean;

type NumericValues = Extract<Values, number | boolean>;
```

Result:

```ts
type NumericValues = number | boolean;
```

**Remember:** Extract is the opposite of Exclude.

## 8. Awaited<T>

Extracts the type that a Promise resolves to after using `await`.

```ts
type Result = Awaited<Promise<string>>;
```

Result:

```ts
type Result = string;
```

It also works with nested Promises:

```ts
type Data = Awaited<Promise<Promise<number>>>;
```

Result:

```ts
type Data = number;
```

Example with an async function:

```ts
async function getStudent() {
    return {
        name: "Prithvi",
        age: 20
    };
}

type StudentData = Awaited<ReturnType<typeof getStudent>>;
```

Result:

```ts
type StudentData = {
    name: string;
    age: number;
};
```

**Use case:** Extracting the actual data type returned by asynchronous API functions.

## 9. Parameters<T>

Extracts the parameter types of a function and returns them as a tuple.

Example:

```ts
function createStudent(name: string, age: number) {
    return {
        name,
        age
    };
}

type StudentParams = Parameters<typeof createStudent>;
```

Result:

```ts
type StudentParams = [name: string, age: number];
```

Usage:

```ts
const studentData: StudentParams = ["Prithvi", 20];
```

**Important:** `typeof` obtains the type of the function, which is then passed to `Parameters`.

## 10. NonNullable<T>

Removes `null` and `undefined` from a type.

```ts
type Value = string | number | null | undefined;

type ValidValue = NonNullable<Value>;
```

Result:

```ts
type ValidValue = string | number;
```

Another example:

```ts
type StudentName = NonNullable<string | null>;
```

Result:

```ts
type StudentName = string;
```

**Use case:** Working with values that might be missing or null, especially in API responses.

## 11. ReturnType<T>

Extracts the return type of a function.

Example:

```ts
function getMarks(): number[] {
    return [90, 80, 95];
}

type Marks = ReturnType<typeof getMarks>;
```

Result:

```ts
type Marks = number[];
```

Another example:

```ts
function getStudent() {
    return {
        name: "Prithvi",
        age: 20
    };
}

type StudentData = ReturnType<typeof getStudent>;
```

Result:

```ts
type StudentData = {
    name: string;
    age: number;
};
```

**Use case:** Reusing the return type of an existing function without manually defining another type.

## 12. InstanceType<T>

Extracts the instance type created by a class constructor.

Example:

```ts
class Student {
    constructor(
        public name: string,
        public age: number
    ) {}
}

type StudentInstance = InstanceType<typeof Student>;
```

Result:

```ts
type StudentInstance = Student;
```

Usage:

```ts
const student: StudentInstance = new Student("Prithvi", 20);
```

**Important distinction:**

- `typeof Student` represents the class constructor type.
- `InstanceType<typeof Student>` represents the type of an object created from that class.

**Use case:** Reusing class instance types without manually referring to the class type.

---

# Quick Revision

| Utility Type | What it does |
|---|---|
| `Partial<T>` | Makes all properties optional |
| `Pick<T, K>` | Selects specific properties |
| `Omit<T, K>` | Removes specific properties |
| `Readonly<T>` | Makes all properties readonly |
| `Record<K, T>` | Creates an object with specified keys and value types |
| `Exclude<T, U>` | Removes matching union members |
| `Extract<T, U>` | Keeps matching union members |
| `Awaited<T>` | Extracts the resolved Promise type |
| `Parameters<T>` | Extracts function parameter types |
| `NonNullable<T>` | Removes null and undefined |
| `ReturnType<T>` | Extracts a function's return type |
| `InstanceType<T>` | Extracts a class instance type |

---

# Important Differences

### Pick vs Omit

```ts
type A = Pick<Student, "name" | "age">;
type B = Omit<Student, "name" | "age">;
```

- `Pick` keeps the selected properties.
- `Omit` removes the selected properties.

### Exclude vs Extract

```ts
type A = Exclude<string | number | boolean, number>;
type B = Extract<string | number | boolean, number>;
```

- `Exclude` removes matching types.
- `Extract` keeps matching types.

### Parameters vs ReturnType

```ts
function add(a: number, b: number): number {
    return a + b;
}

type A = Parameters<typeof add>; // [a: number, b: number]
type B = ReturnType<typeof add>; // number
```

- `Parameters` extracts input types.
- `ReturnType` extracts the output type.

### Partial vs Readonly

- `Partial` makes properties optional.
- `Readonly` prevents reassignment of properties.

You can also combine utility types:

```ts
type StudentUpdate = Partial<Omit<Student, "id">>;

const update: StudentUpdate = {
    name: "Prithvi"
};
```

Here, we first remove `id` and then make all remaining properties optional.

---

# Final Notes

Utility types are particularly useful when:

1. Creating update objects using `Partial`.
2. Selecting or removing properties using `Pick` and `Omit`.
3. Creating structured lookup objects using `Record`.
4. Filtering union types using `Exclude` and `Extract`.
5. Working with asynchronous functions using `Awaited`.
6. Reusing function types using `Parameters` and `ReturnType`.
7. Reusing class instance types using `InstanceType`.

You don't need to memorize every utility type. Understand what each one does and practice using them in real objects and functions.