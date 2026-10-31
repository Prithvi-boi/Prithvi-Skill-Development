# TypeScript: Equality Narrowing and Type Predicates

## 1. Equality Narrowing

**Equality Narrowing** is a type narrowing technique that uses comparison operators to determine the type of a variable.

TypeScript analyzes equality checks and narrows down the possible types based on the condition.

Common comparison operators include:

- `===` — Strict equality
- `!==` — Strict inequality
- `==` — Loose equality
- `!=` — Loose inequality

### A. Basic Example

```ts
function printValue(value: string | number) {

    if (typeof value === "string") {
        console.log("String:", value.toUpperCase());
    }

    if (value === 100) {
        console.log("Number is exactly 100");
    }
}
```

Here:

- Initially, `value` can be a `string` or `number`.
- The first condition narrows `value` to a `string`.
- The second condition checks whether `value` is exactly the number `100`.

### B. Equality Checks with Union Types

When two variables share a common type, comparing them can help TypeScript narrow their types.

```ts
function compareValues(
    x: string | number,
    y: string | boolean
) {

    if (x === y) {
        console.log(x);
        console.log(y);
    }
}
```

Inside the `if` block, TypeScript knows both variables must be strings because `string` is their only common possible type.

### C. Equality Checks with `null`

We can use equality checks to handle nullable values.

```ts
function displayName(name: string | null) {

    if (name !== null) {
        console.log(name.toUpperCase());
    }
    else {
        console.log("Name is null");
    }
}
```

Inside the `if` block, TypeScript knows `name` is a string.

### D. Equality Checks with Literal Types

Equality checks are particularly useful with literal union types.

```ts
type StudentStatus = "Active" | "Inactive" | "Graduated";

function displayStatus(status: StudentStatus) {

    if (status === "Active") {
        console.log("Student is currently active");
    }

    else if (status === "Inactive") {
        console.log("Student is inactive");
    }

    else {
        console.log("Student has graduated");
    }
}
```

Each comparison narrows `status` to a specific literal type.

### Important Points

- Equality checks can narrow union types.
- TypeScript uses the comparison result to eliminate impossible types.
- Strict equality (`===` and `!==`) is generally preferred.
- Comparing two variables can narrow both when they share a common possible type.

---

## 2. Type Predicates

A **Type Predicate** is a special return type used in custom type guard functions.

It tells TypeScript that when a function returns `true`, a particular value belongs to a specific type.

The syntax is:

```ts
parameterName is Type
```

### A. Basic Example

Suppose we have a `Student` type:

```ts
type Student = {
    name: string;
    age: number;
};
```

We can create a custom type guard:

```ts
function isStudent(value: unknown): value is Student {

    return (
        typeof value === "object" &&
        value !== null &&
        "name" in value &&
        "age" in value &&
        typeof value.name === "string" &&
        typeof value.age === "number"
    );
}
```

Here:

```ts
value is Student
```

is the **Type Predicate**.

It tells TypeScript that if `isStudent()` returns `true`, the value can be treated as a `Student`.

### B. Using a Type Predicate

```ts
const data: unknown = {
    name: "Prithvi",
    age: 20
};

if (isStudent(data)) {
    console.log(data.name);
    console.log(data.age);
}
```

**What's happening?**

1. `data` initially has the type `unknown`.
2. We pass it to the `isStudent()` function.
3. The function checks whether the object matches the expected structure.
4. If it returns `true`, TypeScript narrows `data` to `Student`.
5. We can now access `name` and `age` safely.

### C. Type Predicates with Union Types

Type predicates are useful when distinguishing between multiple object types.

```ts
type Student = {
    name: string;
    marks: number;
};

type Teacher = {
    name: string;
    subject: string;
};

function isStudent(person: Student | Teacher): person is Student {

    return "marks" in person;
}
```

Now we can use the custom type guard:

```ts
function displayPerson(person: Student | Teacher) {

    if (isStudent(person)) {
        console.log("Student Marks:", person.marks);
    }
    else {
        console.log("Teacher Subject:", person.subject);
    }
}
```

TypeScript narrows `person` to:

- `Student` when `isStudent()` returns `true`.
- `Teacher` when `isStudent()` returns `false`.

### D. Type Predicate vs Boolean Return Type

Compare these two functions:

**Without a Type Predicate:**

```ts
function isString(value: unknown): boolean {
    return typeof value === "string";
}

const data: unknown = "Hello";

if (isString(data)) {
    // TypeScript still treats data as unknown.
    // console.log(data.toUpperCase());
}
```

**With a Type Predicate:**

```ts
function isString(value: unknown): value is string {
    return typeof value === "string";
}

const data: unknown = "Hello";

if (isString(data)) {
    console.log(data.toUpperCase());
}
```

The difference is that `boolean` only tells TypeScript that the function returns `true` or `false`.

A type predicate additionally tells TypeScript what type the value has when the function returns `true`.

**Important:** A type predicate does not automatically validate the value. You must write the actual runtime checks correctly.
