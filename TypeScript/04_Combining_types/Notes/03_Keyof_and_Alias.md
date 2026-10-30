# TypeScript: `keyof` and Type Aliases

## 1. `keyof` Operator

The `keyof` operator is used to extract the property names (keys) of a type and create a union of string or numeric literal types.

It is especially useful when working with objects and accessing their properties dynamically.

### Basic Example

```ts
interface Student {
    name: string;
    age: number;
    marks: number;
}

type StudentKeys = keyof Student;
```

Here, `StudentKeys` becomes:

```ts
type StudentKeys = "name" | "age" | "marks";
```

This means `StudentKeys` can only contain one of the property names defined in the `Student` interface.

### Using `keyof` in Functions

We can use `keyof` to restrict which object properties can be accessed through a function.

```ts
interface Student {
    name: string;
    age: number;
    marks: number;
}

function getStudentValue(key: keyof Student) {
    const student: Student = {
        name: "Prithvi",
        age: 20,
        marks: 85
    };

    return student[key];
}

console.log(getStudentValue("name"));  // Prithvi
console.log(getStudentValue("age"));   // 20
console.log(getStudentValue("marks")); // 85

// Error: "email" is not a key of Student
// getStudentValue("email");
```

**Why is this useful?**

- Prevents accessing properties that do not exist.
- Makes functions reusable with different object properties.
- Provides better type safety when accessing objects dynamically.

### Using `keyof` with `typeof`

We can also use `keyof` with `typeof` to extract keys from an existing object.

```ts
const student = {
    name: "Prithvi",
    age: 20,
    department: "BCA"
};

type StudentKeys = keyof typeof student;
```

The resulting type is:

```ts
type StudentKeys = "name" | "age" | "department";
```

**Understanding the combination:**

- `typeof student` extracts the type of the `student` variable.
- `keyof` extracts the property names from that type.

### Using `keyof` with Enums

Enums create an object at runtime, so we can use `keyof typeof` to extract their member names.

```ts
enum Department {
    BCA = "Bachelor of Computer Applications",
    BCOM = "Bachelor of Commerce",
    BBA = "Bachelor of Business Administration"
}

type DepartmentKeys = keyof typeof Department;
```

The resulting type is:

```ts
type DepartmentKeys = "BCA" | "BCOM" | "BBA";
```

---

## 2. Type Aliases

A type alias allows us to give a name to a type using the `type` keyword.

It helps make code cleaner, reusable, and easier to maintain.

### Basic Example

```ts
type Username = string;

let name: Username = "Prithvi";
```

Here, `Username` is an alias for the `string` type.

### Type Aliases with Unions

We can use type aliases to create reusable union types.

```ts
type StudentStatus = "Active" | "Inactive" | "Graduated";

let status: StudentStatus = "Active";

// Error: "Pending" is not allowed
// status = "Pending";
```

### Type Aliases with Objects

We can define the structure of an object using a type alias.

```ts
type Student = {
    name: string;
    age: number;
    department: string;
};

const student: Student = {
    name: "Prithvi",
    age: 20,
    department: "BCA"
};
```

Now, we can reuse the `Student` type whenever we need an object with the same structure.

### Type Aliases with Functions

We can also define function types using type aliases.

```ts
type Add = (a: number, b: number) => number;

const add: Add = (a, b) => {
    return a + b;
};

console.log(add(10, 20)); // 30
```

### Type Aliases with Arrays

```ts
type Marks = number[];

const studentMarks: Marks = [85, 90, 78];
```

### Combining Type Aliases

Type aliases can be combined using union (`|`) and intersection (`&`) operators.

**Union example:**

```ts
type ID = string | number;

let studentId: ID = 101;
studentId = "STU101";
```

**Intersection example:**

```ts
type PersonalInfo = {
    name: string;
    age: number;
};

type AcademicInfo = {
    department: string;
    marks: number;
};

type Student = PersonalInfo & AcademicInfo;

const student: Student = {
    name: "Prithvi",
    age: 20,
    department: "BCA",
    marks: 85
};
```

---

## 3. Difference Between `keyof` and Type Alias

| Feature | `keyof` | Type Alias |
|---|---|---|
| Purpose | Extracts property keys from a type | Gives a name to a type |
| Keyword | `keyof` | `type` |
| Usage | Object key restrictions | Reusable types |
| Example | `keyof Student` | `type Student = {...}` |

### Using Them Together

We can combine `keyof` and type aliases to create reusable key types.

```ts
type Student = {
    name: string;
    age: number;
    marks: number;
};

type StudentKeys = keyof Student;

function getValue(student: Student, key: StudentKeys) {
    return student[key];
}
```

Here:

1. `Student` defines the structure of the object.
2. `keyof Student` extracts its property names.
3. `StudentKeys` stores those property names as a reusable type.
4. `getValue()` accepts only valid student property names.

---

## Key Takeaways

- `keyof` extracts the keys of an object type and creates a union of those keys.
- `keyof typeof object` extracts keys from an existing object variable.
- `keyof typeof EnumName` extracts enum member names.
- Type aliases are created using the `type` keyword.
- Type aliases can represent primitive types, objects, unions, intersections, arrays, and function types.
- `keyof` and type aliases can be combined to create reusable and type-safe code.