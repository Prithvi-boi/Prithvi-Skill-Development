# TypeScript: Generics

## 1. What are Generics?

Generics allow us to write reusable code that works with different data types while maintaining TypeScript's type safety.

Instead of writing separate functions for strings, numbers, or booleans, we can write one generic function that works with all of them.

### Without Generics

```ts
function getString(value: string): string {
    return value;
}

function getNumber(value: number): number {
    return value;
}

function getBoolean(value: boolean): boolean {
    return value;
}
```

We need separate functions for different data types.

### With Generics

```ts
function getValue<T>(value: T): T {
    return value;
}

console.log(getValue<string>("Hello"));
console.log(getValue<number>(100));
console.log(getValue<boolean>(true));
```

Now, one function works with multiple data types.

**Important:** `T` is a type parameter. It acts as a placeholder for a type that will be determined when the function is used.

---

## 2. Understanding the Generic Syntax

```ts
function functionName<T>(value: T): T {
    return value;
}
```

Let's understand each part:

| Syntax | Meaning |
|---|---|
| `<T>` | Declares a generic type parameter |
| `value: T` | Parameter accepts the provided type |
| `: T` | Function returns the same type |

You can think of `T` as a variable, but instead of storing a value, it represents a type.

### Example

```ts
function identity<T>(value: T): T {
    return value;
}

const result1 = identity<string>("Prithvi");
const result2 = identity<number>(20);
```

Here:
- In the first call, `T` becomes `string`.
- In the second call, `T` becomes `number`.

---

## 3. Type Inference in Generics

You don't always need to explicitly provide the generic type.

TypeScript can automatically infer it from the arguments.

```ts
function identity<T>(value: T): T {
    return value;
}

const result1 = identity("Hello");
const result2 = identity(100);
const result3 = identity(true);
```

TypeScript automatically determines:

- `result1` is `string`.
- `result2` is `number`.
- `result3` is `boolean`.

Both approaches are valid:

```ts
identity<string>("Hello");

identity("Hello");
```

**Tip:** Let TypeScript infer the type when it can do so correctly. Explicitly provide a type when it improves clarity or cannot be inferred.

---

## 4. Generics with Arrays

Generics are particularly useful when working with arrays.

For example, we can create one function that returns the first element of any array.

```ts
function getFirstElement<T>(arr: T[]): T {
    return arr[0];
}

const firstNumber = getFirstElement([10, 20, 30]);
const firstName = getFirstElement(["Prithvi", "Rahul", "Amit"]);
```

TypeScript infers:
- `firstNumber` as `number`.
- `firstName` as `string`.

### Another example: Displaying array elements

```ts
function displayElements<T>(arr: T[]): void {
    arr.forEach((element) => {
        console.log(element);
    });
}

displayElements<number>([10, 20, 30]);
displayElements<string>(["React", "Node", "TypeScript"]);
```

The same function works with different array types.

---

## 5. Generics with Multiple Type Parameters

A generic function can have more than one type parameter.

For example, we might want a function that accepts two values of different types.

```ts
function pair<T, U>(first: T, second: U): [T, U] {
    return [first, second];
}

const result1 = pair<string, number>("Age", 20);
const result2 = pair<boolean, string>(true, "Active");
```

Here:
- `T` represents the first argument's type.
- `U` represents the second argument's type.
- `[T, U]` represents a tuple containing both types.

TypeScript can also infer both types:

```ts
const result = pair("Prithvi", 20);
```

The inferred type is `[string, number]`.

---

## 6. Generics with Interfaces

We can use generics in interfaces to create reusable object structures.

For example, imagine an API that returns different types of data.

Instead of creating separate interfaces for every response, we can create one generic interface.

```ts
interface ApiResponse<T> {
    success: boolean;
    data: T;
    message: string;
}
```

Now we can use it with different types.

### String response

```ts
const response1: ApiResponse<string> = {
    success: true,
    data: "Login successful",
    message: "User authenticated"
};
```

### Number response

```ts
const response2: ApiResponse<number> = {
    success: true,
    data: 200,
    message: "Request completed"
};
```

### Object response

```ts
interface Student {
    name: string;
    age: number;
}

const response3: ApiResponse<Student> = {
    success: true,
    data: {
        name: "Prithvi",
        age: 20
    },
    message: "Student found"
};
```

The same interface can represent responses containing strings, numbers, or objects.

---

## 7. Generics with Type Aliases

We can also use generics with type aliases.

```ts
type Container<T> = {
    value: T;
};

const numberContainer: Container<number> = {
    value: 100
};

const stringContainer: Container<string> = {
    value: "Hello"
};
```

Here, `Container<T>` describes an object whose `value` property depends on the provided type.

---

## 8. Generic Constraints (`extends`)

Sometimes we don't want a generic function to accept every possible type.

We can restrict the types accepted by a generic using `extends`.

For example, let's create a function that returns the length of a value.

```ts
function getLength<T extends { length: number }>(value: T): number {
    return value.length;
}

console.log(getLength("Hello"));       // 5
console.log(getLength([10, 20, 30]));  // 3
```

### Understanding the constraint

```ts
<T extends { length: number }>
```

This means:

`T` must be a type that has a `length` property of type `number`.

Therefore:
- Strings are allowed.
- Arrays are allowed.
- Objects with a numeric `length` property are allowed.
- Numbers are not allowed because they don't have a `length` property.

### Another example

```ts
interface Student {
    name: string;
    age: number;
}

function displayName<T extends Student>(student: T): void {
    console.log(student.name);
}

displayName({
    name: "Prithvi",
    age: 20
});
```

The generic type must satisfy the structure defined by `Student`.

**Important:** `extends` in a generic constraint means that a type must satisfy another type's requirements. It does not necessarily mean class inheritance.

---

## 9. Generics with Classes

Generics can also be used with classes.

This is useful when we want a class to store or manage different types of data.

### Example: Storage Class

```ts
class Storage<T> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    getAll(): T[] {
        return this.items;
    }
}

const numberStorage = new Storage<number>();

numberStorage.add(10);
numberStorage.add(20);

console.log(numberStorage.getAll());

const stringStorage = new Storage<string>();

stringStorage.add("React");
stringStorage.add("TypeScript");

console.log(stringStorage.getAll());
```

Here:
- `Storage<T>` is a generic class.
- `Storage<number>` stores numbers.
- `Storage<string>` stores strings.
- Each object maintains its own array.

---

## 10. Generics with Default Types

We can provide a default type for a generic parameter.

```ts
interface ApiResponse<T = string> {
    success: boolean;
    data: T;
}

const response1: ApiResponse = {
    success: true,
    data: "Successful"
};

const response2: ApiResponse<number> = {
    success: true,
    data: 200
};
```

Here:
- If no type is provided, `T` defaults to `string`.
- We can override the default by explicitly providing another type.

---

## 11. Why Are Generics Useful in Real Projects?

Generics are commonly used in:

| Area | Example |
|---|---|
| API development | Reusable API response structures |
| React | Generic components and hooks |
| Backend | Reusable services and data structures |
| Database | Generic repository patterns and ORM APIs |
| Utility functions | Reusable array and object operations |
| State management | Typed stores and actions |

For example, a reusable API response interface:

```ts
interface ApiResponse<T> {
    data: T;
    success: boolean;
    error?: string;
}
```

This can represent responses from different endpoints without creating a new interface for every response.

---

## 12. Important Things to Remember

1. Generics allow reusable, type-safe code.
2. `T` is a type parameter, not a special TypeScript keyword.
3. You can use any valid identifier as a generic parameter name.
4. TypeScript can infer generic types automatically.
5. You can use multiple generic parameters, such as `<T, U>`.
6. Generics work with functions, interfaces, type aliases, and classes.
7. Use `extends` to restrict the types accepted by a generic.
8. Generic default types can be provided using `=`.
9. Generics help avoid unnecessary use of `any`.

---

# Practice Questions – Generics

## 1. Identity Function
Create a generic `identity()` function that accepts and returns the same type of value.

## 2. Generic Array Function
Create a generic function that accepts an array and returns its last element.

## 3. Multiple Type Parameters
Create a generic `combine()` function that accepts a string and a number and returns them as a tuple.

## 4. Generic Interface
Create a generic `Box<T>` interface with a `value` property. Use it with strings and numbers.

## 5. Generic Class
Create a generic `DataStorage<T>` class with `add()`, `remove()`, and `getAll()` methods.