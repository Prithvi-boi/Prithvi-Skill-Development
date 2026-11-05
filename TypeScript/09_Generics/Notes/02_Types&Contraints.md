# TypeScript – Generic Types and Generic Constraints

## 1. Generic Types

### What are Generic Types?

Generics allow us to create reusable functions, interfaces, classes, and type aliases that work with different data types while maintaining type safety.

Instead of writing separate implementations for `string`, `number`, or other types, we can use a type parameter.

**Example:**

```ts
function getValue<T>(value: T): T {
    return value;
}

getValue<number>(100);
getValue<string>("Hello");
getValue<boolean>(true);
```

Here:
- `T` is a generic type parameter.
- The type is provided when calling the function.
- The return type matches the argument type.

### 2. Generic Type Parameter Naming

You can use any valid identifier as a generic type parameter.

```ts
function getValue<Type>(value: Type): Type {
    return value;
}
```

Common naming conventions:

| Parameter | Meaning |
|---|---|
| `T` | General type |
| `U` | Second type |
| `K` | Key |
| `V` | Value |
| `E` | Element |

These are conventions, not TypeScript rules.

### 3. Type Inference with Generics

You don't always need to explicitly provide the generic type.

TypeScript can infer it from the argument.

```ts
function getValue<T>(value: T): T {
    return value;
}

getValue(100);       // T = number
getValue("Hello");   // T = string
```

Both approaches are valid:

```ts
getValue<number>(100);
getValue(100);
```

### 4. Multiple Generic Types

A function can accept multiple generic type parameters.

```ts
function combine<T, U>(first: T, second: U): [T, U] {
    return [first, second];
}

const result = combine<string, number>("Age", 20);
```

Here:
- `T` represents the first argument's type.
- `U` represents the second argument's type.
- The return value is a tuple containing both types.

TypeScript can also infer both types:

```ts
const result = combine("Age", 20);
```

### 5. Generics with Interfaces

We can use generics in interfaces to create reusable object structures.

```ts
interface Box<T> {
    value: T;
}

const numberBox: Box<number> = {
    value: 100
};

const stringBox: Box<string> = {
    value: "Hello"
};
```

The same interface can represent different data types.

### 6. Generics with Type Aliases

Generic type aliases work similarly.

```ts
type Response<T> = {
    data: T;
    status: number;
};

const userResponse: Response<string> = {
    data: "Prithvi",
    status: 200
};

const marksResponse: Response<number[]> = {
    data: [80, 90, 95],
    status: 200
};
```

### 7. Generics with Arrays

Generics are useful when working with arrays.

```ts
function getFirstElement<T>(items: T[]): T | undefined {
    return items[0];
}

const firstNumber = getFirstElement([10, 20, 30]);
const firstName = getFirstElement(["John", "Alex"]);
```

The return type depends on the array's element type.

---

# 2. Generic Constraints

### What are Generic Constraints?

Generic constraints allow us to restrict which types can be passed to a generic function, interface, or class.

We use the `extends` keyword to define a constraint.

Without constraints, TypeScript cannot assume that a generic type has a particular property or method.

### 1. Basic Generic Constraint

Consider this function:

```ts
function displayLength<T>(value: T): number {
    return value.length;
}
```

This produces an error because TypeScript doesn't know whether `T` has a `length` property.

We can solve this using a constraint:

```ts
function displayLength<T extends { length: number }>(
    value: T
): number {
    return value.length;
}

displayLength("Hello");       // Valid
displayLength([10, 20, 30]);  // Valid
displayLength(100);           // Error
```

`T extends { length: number }` means:

- T must have a `length` property.
- That property must be a number.
- Strings and arrays satisfy this requirement.
- Numbers do not.

### 2. Constraints with Interfaces

We can use an interface to define the required structure.

```ts
interface Student {
    name: string;
    age: number;
}

function displayStudent<T extends Student>(student: T): void {
    console.log(student.name);
    console.log(student.age);
}
```

Valid:

```ts
displayStudent({
    name: "Prithvi",
    age: 20
});
```

Invalid:

```ts
displayStudent({
    name: "Prithvi"
});
```

The second example is invalid because `age` is missing.

### 3. Constraints with Multiple Properties

A generic constraint can require multiple properties.

```ts
function displayUser<T extends {
    name: string;
    age: number;
}>(user: T): void {
    console.log(user.name);
    console.log(user.age);
}
```

The supplied type must contain both properties with compatible types.

### 4. Multiple Generic Parameters with Constraints

You can also constrain multiple generic parameters independently.

```ts
function getDetails<T extends string, U extends number>(
    name: T,
    age: U
): [T, U] {
    return [name, age];
}

getDetails("Prithvi", 20); // Valid
getDetails(100, "Hello");  // Error
```

Here:
- `T` must be a string type.
- `U` must be a number type.

Remember: `extends` does not mean inheritance only. In generic constraints, it means that a type must satisfy or be assignable to the specified type.

### 5. Generic Constraints with keyof

`keyof` creates a union of an object's property keys.

We can combine it with generics to safely access object properties.

```ts
function getProperty<T, K extends keyof T>(
    object: T,
    key: K
) {
    return object[key];
}

const student = {
    name: "Prithvi",
    age: 20,
    department: "BCA"
};

getProperty(student, "name");       // Valid
getProperty(student, "age");        // Valid
getProperty(student, "salary");     // Error
```

Explanation:

- `keyof T` produces the valid keys of T.
- `K extends keyof T` restricts K to those keys.
- `object[key]` safely accesses the selected property.

This is particularly useful when working with dynamic object properties.

---

# 3. Generic Types vs Generic Constraints

| Generic Types | Generic Constraints |
|---|---|
| Allow reusable code with different types. | Restrict which types are allowed. |
| Use `<T>`. | Use `<T extends SomeType>`. |
| Don't require a specific structure by themselves. | Require a specific structure or compatible type. |
| Example: `function getValue<T>(value: T)` | Example: `function getLength<T extends { length: number }>(value: T)` |

## 4. Important Things to Remember

1. Generics help create reusable and type-safe code.
2. `T` is a naming convention, not a special keyword.
3. You can use multiple generic parameters.
4. TypeScript can infer generic types automatically.
5. Generic constraints use the `extends` keyword.
6. Constraints allow you to access properties and methods that the required type guarantees.
7. `keyof` combined with generics helps safely access object properties.

---

# 5. Practice Questions

Try implementing these yourself. Don't use `any`.

### Q1. Generic Identity Function
Create a generic function that accepts a value and returns the same value with its original type.

### Q2. Generic Array Function
Create a function that accepts an array of any type and returns its last element.

### Q3. String Constraint
Create a generic function that accepts only string types and returns the length of the value.

### Q4. Object Constraint
Create a generic function that accepts an object containing `name: string` and `age: number`. Return its name.

### Q5. Generic Property Access
Create a function using `T` and `K extends keyof T` that accepts an object and a key, then returns the corresponding property value.