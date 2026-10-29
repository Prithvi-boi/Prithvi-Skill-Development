# Why does student[key] show an error?
## TypeScript: `keyof`, `typeof`, and Dynamic Property Access

## 1. The Problem with Dynamic Property Access

In JavaScript, we can access an object's property dynamically using a variable:

```ts
const student = {
    name: "Prithvi",
    age: 20,
    marks: [85, 90, 95]
};

const key = "name";

console.log(student[key]); // Prithvi
```

However, TypeScript may show an error when `key` is simply declared as a `string`.

```ts
const key: string = "name";

console.log(student[key]); // TypeScript error
```

### Why does this happen?

TypeScript needs to ensure that the property you're accessing actually exists on the object.

A variable of type `string` could contain anything:

```ts
const key: string = "address";
```

But `address` does not exist in our `student` object.

**Solution:** Use `keyof` to tell TypeScript which property names are valid.

---

## 2. Understanding `keyof`

The `keyof` operator extracts the property names (keys) of a type and creates a union of string literal types.

### Example

```ts
interface Student {
    name: string;
    age: number;
    marks: number[];
}

type StudentKeys = keyof Student;
```

The resulting type is:

```ts
type StudentKeys = "name" | "age" | "marks";
```

This means `StudentKeys` can only contain one of these three property names.

```ts
let key: StudentKeys;

key = "name";  // Valid
key = "age";   // Valid
key = "marks"; // Valid

key = "address"; // Error
```

### Using `keyof` with an Array

We can also create an array containing valid property names:

```ts
const keys: StudentKeys[] = ["name", "age", "marks"];

keys.forEach(key => {
    console.log(student[key]);
});
```

Now TypeScript knows that every key in the array belongs to the `Student` type.

---

## 3. Using `keyof` with Functions

We can use `keyof` in function parameters to restrict which properties can be accessed.

```ts
interface Student {
    name: string;
    age: number;
    marks: number[];
}

const student: Student = {
    name: "Prithvi",
    age: 20,
    marks: [85, 90, 95]
};

function getStudentValue(key: keyof Student) {
    return student[key];
}

console.log(getStudentValue("name"));
console.log(getStudentValue("age"));
console.log(getStudentValue("marks"));

// Error: "address" is not a valid property
getStudentValue("address");
```

**Important:** `keyof Student` restricts the argument to valid property names.

---

## 4. Understanding `typeof`

The `typeof` operator can be used to obtain the type of an existing variable or object.

### Example

```ts
const student = {
    name: "Prithvi",
    age: 20,
    marks: [85, 90, 95]
};

type StudentType = typeof student;
```

TypeScript infers the following type:

```ts
type StudentType = {
    name: string;
    age: number;
    marks: number[];
};
```

We can use this type to declare another variable:

```ts
const anotherStudent: StudentType = {
    name: "Rahul",
    age: 21,
    marks: [80, 85, 90]
};
```

### Difference Between `typeof` and `keyof`

| Operator | Purpose |
|---|---|
| `typeof student` | Gets the type of the student variable |
| `keyof Student` | Gets the property names of the Student type |
| `keyof typeof student` | Gets the property names of the student variable's type |

---

## 5. Understanding `keyof typeof`

This combination is particularly useful when working with objects and enums.

Consider this object:

```ts
const departments = {
    BCA: "Bachelor of Computer Application",
    BCOM: "Bachelor of Commerce",
    BBA: "Bachelor of Business Administration"
};
```

### Step 1: Get the object's type

```ts
type DepartmentType = typeof departments;
```

### Step 2: Get its property names

```ts
type DepartmentKeys = keyof typeof departments;
```

The resulting type is:

```ts
type DepartmentKeys = "BCA" | "BCOM" | "BBA";
```

### Step 3: Use the keys dynamically

```ts
function getDepartment(key: DepartmentKeys) {
    return departments[key];
}

console.log(getDepartment("BCA"));
console.log(getDepartment("BCOM"));
```

This ensures that only valid department keys can be passed.

---

## 6. Using `keyof typeof` with Enums

Enums are slightly different because an enum creates a value that exists at runtime as well as a type.

Consider:

```ts
enum Department {
    BCA = "Bachelor of Computer Application",
    BCOM = "Bachelor of Commerce",
    BBA = "Bachelor of Business Administration"
}
```

To get the valid enum member names, use:

```ts
type DepartmentKeys = keyof typeof Department;
```

The resulting type is:

```ts
type DepartmentKeys = "BCA" | "BCOM" | "BBA";
```

### Accessing Enum Values Dynamically

```ts
function getDepartment(key: DepartmentKeys) {
    return Department[key];
}

console.log(getDepartment("BCA"));
```

Output:

```text
Bachelor of Computer Application
```

### Why do we use `typeof` here?

- `Department` refers to the enum type when used as a type.
- `typeof Department` refers to the enum object itself.
- `keyof typeof Department` extracts the enum object's member names.

---

## 7. Difference Between `keyof` and `keyof typeof`

| Expression | Meaning |
|---|---|
| `keyof Student` | Gets keys from the Student type |
| `typeof student` | Gets the type of the student variable |
| `keyof typeof student` | Gets keys from the student variable's type |
| `typeof Department` | Gets the type of the Department enum object |
| `keyof typeof Department` | Gets enum member names |

### Quick Example

```ts
interface Student {
    name: string;
    age: number;
}

const student = {
    name: "Prithvi",
    age: 20
};

type StudentKeys = keyof Student;
// "name" | "age"

type StudentType = typeof student;
// { name: string; age: number }

type ObjectKeys = keyof typeof student;
// "name" | "age"
```

---

## 8. Practical Example: Student Management System

Suppose we have the following interface:

```ts
interface Student {
    rollnum: number;
    name: string;
    department: string;
    age: number;
    marks: number[];
    status: "Active" | "Inactive";
}

type StudentKeys = keyof Student;
```

We can use `StudentKeys` to safely access student properties dynamically.

```ts
function View_Student_Property(
    student: Student,
    key: StudentKeys
): void {
    console.log(student[key]);
}
```

Example usage:

```ts
const student: Student = {
    rollnum: 101,
    name: "Prithvi",
    department: "BCA",
    age: 20,
    marks: [85, 90, 95],
    status: "Active"
};

View_Student_Property(student, "name");
View_Student_Property(student, "age");
View_Student_Property(student, "marks");

// Error: Invalid property
View_Student_Property(student, "address");
```

### Important: Dynamic Property Values

Although `keyof` ensures that the property name is valid, different properties can have different value types.

For example:

```ts
student.name;  // string
student.age;   // number
student.marks; // number[]
```

When accessing a property dynamically, TypeScript considers all the possible value types associated with the allowed keys.

This is important when dynamically updating properties because assigning a string to a number property would be invalid.

---

## 9. Important Things to Remember

- `keyof` extracts property names from a type.
- `typeof` extracts the type of an existing variable or object.
- `keyof typeof` is useful for extracting keys from an existing object.
- Use `keyof Student` when working with an interface or type.
- Use `keyof typeof Department` when working with enum member names.
- `keyof` prevents invalid property names during dynamic access.
- Validating property names does not mean all properties have the same value type.

### Quick Reference

```ts
// Get keys from an interface
type StudentKeys = keyof Student;

// Get the type of an existing variable
type StudentType = typeof student;

// Get keys from an object's type
type ObjectKeys = keyof typeof student;

// Get enum member names
type DepartmentKeys = keyof typeof Department;
```

**Remember:** Whenever you need to access object properties dynamically in TypeScript, `keyof` is one of the most useful tools to learn.