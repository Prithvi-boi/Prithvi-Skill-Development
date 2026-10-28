# TypeScript Objects

Unlike primitive types such as `string`, `number`, and `boolean`, objects allow you to define multiple properties, each with its own data type.

TypeScript allows you to define the structure (shape) of an object, including:
- Property names.
- Property types.
- Optional properties.
- Readonly properties.
- Nested objects.
- Methods and functions.

---

## 1. Basic Object Types

In TypeScript, you can define an object type by specifying its properties and their corresponding types.

### Example

```ts
let user: {
    name: string;
    age: number;
    isActive: boolean;
} = {
    name: "Prithvi",
    age: 21,
    isActive: true
};
```

Here:
- `name` must be a string.
- `age` must be a number.
- `isActive` must be a boolean.

### Accessing Object Properties

You can access object properties using dot notation or bracket notation.

```ts
console.log(user.name);     // Prithvi
console.log(user.age);      // 21
console.log(user["isActive"]); // true
```

### Modifying Object Properties

You can modify properties as long as the new value matches their declared type.

```ts
user.name = "John"; // Allowed
user.age = 25;      // Allowed

// user.age = "25"; // Error
```

**Important:** TypeScript checks the structure and property types of an object during compilation.

---

## 2. Object Property Types

Each property inside an object can have a different type.

### Example

```ts
let product: {
    id: number;
    name: string;
    price: number;
    available: boolean;
} = {
    id: 101,
    name: "Laptop",
    price: 50000,
    available: true
};
```

You can also use other types inside objects, such as:
- Arrays.
- Tuples.
- Union types.
- Other objects.
- Functions.

### Example: Object with an Array

```ts
let student: {
    name: string;
    subjects: string[];
} = {
    name: "Prithvi",
    subjects: ["JavaScript", "TypeScript", "Python"]
};
```

### Example: Object with a Union Type

```ts
let user: {
    id: number | string;
    name: string;
} = {
    id: "USER101",
    name: "Prithvi"
};
```

Here, `id` can contain either a number or a string.

---

## 3. Optional Properties (`?`)

Sometimes an object does not need to contain every property.

You can make a property optional using the question mark (`?`) after its name.

### Example

```ts
let user: {
    name: string;
    age: number;
    email?: string;
} = {
    name: "Prithvi",
    age: 21
};
```

Here:
- `name` is required.
- `age` is required.
- `email` is optional.

Both objects below are valid:

```ts
let user1 = {
    name: "Prithvi",
    age: 21
};

let user2 = {
    name: "John",
    age: 25,
    email: "john@example.com"
};
```

### Accessing Optional Properties

When accessing an optional property, TypeScript considers that it might be `undefined`.

```ts
let user: {
    name: string;
    email?: string;
} = {
    name: "Prithvi"
};

// Error: email might be undefined
// console.log(user.email.toUpperCase());
```

You need to check whether the property exists before using it.

### Method 1: Using an If Condition

```ts
if (user.email !== undefined) {
    console.log(user.email.toUpperCase());
}
```

### Method 2: Using Optional Chaining (`?.`)

```ts
console.log(user.email?.toUpperCase());
```

Optional chaining safely accesses the property only when it is not `null` or `undefined`.

**Important:** An optional property is not the same as a required property whose type includes `undefined`.

```ts
type User = {
    name: string;
    email?: string;
};

// email can be omitted
let user1: User = {
    name: "Prithvi"
};

type User2 = {
    name: string;
    email: string | undefined;
};

// email must be provided
let user2: User2 = {
    name: "John",
    email: undefined
};
```

---

## 4. Readonly Properties (`readonly`)

Sometimes you want to prevent a particular object property from being modified after initialization.

You can use the `readonly` modifier before a property name.

### Example

```ts
let user: {
    readonly id: number;
    name: string;
} = {
    id: 101,
    name: "Prithvi"
};

user.name = "John"; // Allowed

// user.id = 102; // Error
```

Here:
- `id` cannot be reassigned.
- `name` can be modified.

### Using Readonly with Type

```ts
type User = {
    readonly id: number;
    name: string;
};

let user: User = {
    id: 101,
    name: "Prithvi"
};

// user.id = 102; // Error
```

**Important:** `readonly` provides compile-time protection. It does not freeze the actual JavaScript object at runtime. Also, it does not automatically make nested objects deeply readonly.

---

## 5. Object Type with Functions (Methods)

An object can also contain functions as its properties.

You can define the type of a function using parameter types and a return type.

### Example

```ts
let user: {
    name: string;
    age: number;
    greet: () => void;
} = {
    name: "Prithvi",
    age: 21,

    greet: function () {
        console.log("Hello!");
    }
};

user.greet(); // Hello!
```

Here:
- `name` is a string.
- `age` is a number.
- `greet` is a function that returns `void`.

### Function with Parameters

```ts
let calculator: {
    add: (a: number, b: number) => number;
} = {
    add: (a, b) => a + b
};

console.log(calculator.add(10, 20)); // 30
```

The `add` method accepts two numbers and returns a number.

---

## 6. Nested Objects

An object can contain another object as one of its properties.

These are called nested objects.

### Example

```ts
let user: {
    name: string;
    address: {
        city: string;
        country: string;
    };
} = {
    name: "Prithvi",
    address: {
        city: "Mumbai",
        country: "India"
    }
};
```

### Accessing Nested Properties

```ts
console.log(user.name);            // Prithvi
console.log(user.address.city);    // Mumbai
console.log(user.address.country); // India
```

You can also make nested properties optional.

```ts
let user: {
    name: string;
    address?: {
        city: string;
        country: string;
    };
} = {
    name: "Prithvi"
};
```

Use optional chaining when accessing an optional nested object:

```ts
console.log(user.address?.city);
```

---

## 7. Type Aliases (`type`)

Writing object structures repeatedly can make code difficult to maintain.

TypeScript provides **Type Aliases** to give a reusable name to an object type.

You can define an object structure once and reuse it wherever required.

### Syntax

```ts
type TypeName = {
    property1: type;
    property2: type;
};
```

### Example

```ts
type User = {
    id: number;
    name: string;
    age: number;
};

let user1: User = {
    id: 1,
    name: "Prithvi",
    age: 21
};

let user2: User = {
    id: 2,
    name: "John",
    age: 25
};
```

Both objects must follow the `User` type structure.

### Advantages of Type Aliases

- Avoid repeating object structures.
- Improve code readability.
- Make types reusable.
- Easier to maintain large projects.
- Can represent more than just object types.

**Important:** A type alias can represent objects, unions, primitives, tuples, and many other types.

Example:

```ts
type ID = number | string;

type User = {
    id: ID;
    name: string;
};
```

---

## 8. Interfaces (`interface`)

An interface is another way to define the structure of an object.

It specifies which properties an object should contain and what their types should be.

### Syntax

```ts
interface InterfaceName {
    property1: type;
    property2: type;
}
```

### Example

```ts
interface User {
    id: number;
    name: string;
    age: number;
}

let user: User = {
    id: 1,
    name: "Prithvi",
    age: 21
};
```

Here, the `User` interface defines the expected structure of the object.

### Optional Properties with Interfaces

```ts
interface User {
    id: number;
    name: string;
    email?: string;
}

let user: User = {
    id: 1,
    name: "Prithvi"
};
```

### Readonly Properties with Interfaces

```ts
interface User {
    readonly id: number;
    name: string;
}

let user: User = {
    id: 1,
    name: "Prithvi"
};

// user.id = 2; // Error
```

---

## 9. Difference Between Type and Interface

Both `type` and `interface` can be used to define object structures.

In many situations, they work similarly.

### Using Type

```ts
type User = {
    id: number;
    name: string;
};
```

### Using Interface

```ts
interface User {
    id: number;
    name: string;
}
```

Both define the same object structure.

### Comparison

| Feature | Type | Interface |
|---|---|---|
| Object structure | Yes | Yes |
| Optional properties | Yes | Yes |
| Readonly properties | Yes | Yes |
| Union types | Yes | No |
| Primitive aliases | Yes | No |
| Tuple types | Yes | No |
| Extending | Using intersections (`&`) | Using `extends` |
| Declaration merging | No | Yes |

### Extending with Interface

An interface can extend another interface using the `extends` keyword.

```ts
interface Person {
    name: string;
    age: number;
}

interface Employee extends Person {
    employeeId: number;
}

let employee: Employee = {
    name: "Prithvi",
    age: 21,
    employeeId: 101
};
```

Here, `Employee` inherits the properties of `Person` and adds its own property.

### Extending with Type

You can achieve similar functionality using intersection types (`&`).

```ts
type Person = {
    name: string;
    age: number;
};

type Employee = Person & {
    employeeId: number;
};

let employee: Employee = {
    name: "Prithvi",
    age: 21,
    employeeId: 101
};
```

### Declaration Merging

Interfaces support declaration merging. This means you can declare the same interface multiple times, and TypeScript combines their properties.

```ts
interface User {
    name: string;
}

interface User {
    age: number;
}

let user: User = {
    name: "Prithvi",
    age: 21
};
```

However, you cannot declare the same type alias twice in the same scope.

```ts
type User = {
    name: string;
};

// Error: Duplicate identifier
// type User = {
//     age: number;
// };
```

**Recommendation:** Use `interface` for object structures when appropriate. Use `type` when you need unions, intersections, tuples, or other advanced type compositions.

---

## 10. Structural Typing

TypeScript uses a concept called **Structural Typing**.

It means TypeScript checks the structure of an object rather than its declared name.

In simple words, if an object has the required properties with compatible types, it can be assigned to another type even if it was not explicitly declared using that type.

### Example

```ts
interface User {
    name: string;
    age: number;
}

let person = {
    name: "Prithvi",
    age: 21,
    city: "Mumbai"
};

let user: User = person; // Allowed
```

Why is this allowed?

Because `person` contains all the required properties of `User`:
- `name`
- `age`

The additional `city` property does not prevent assignment through this variable.

### Important: Excess Property Checking

When you directly pass an object literal or assign one to a typed variable, TypeScript performs additional checks for unexpected properties.

```ts
interface User {
    name: string;
    age: number;
}

// Error: 'city' is not a known property
let user: User = {
    name: "Prithvi",
    age: 21,
    city: "Mumbai"
};
```

However, assigning an existing variable with additional properties is allowed:

```ts
let person = {
    name: "Prithvi",
    age: 21,
    city: "Mumbai"
};

let user: User = person; // Allowed
```

**Important:** TypeScript is structurally typed, not strictly based on object names. Excess property checks are an additional check for fresh object literals, not an exact-object-type system.

---

## 11. The `object` Type

TypeScript also provides a built-in type called `object`.

It represents non-primitive values.

### Example

```ts
let value: object;

value = { name: "Prithvi" }; // Allowed
value = [1, 2, 3];           // Allowed
value = () => {};            // Allowed

// value = "Hello"; // Error
// value = 100;     // Error
```

**Important:** The `object` type does not describe the properties inside an object.

For example:

```ts
let user: object = {
    name: "Prithvi"
};

// console.log(user.name); // Error
```

TypeScript does not know that `name` exists because you only specified `object`.

Instead, define the actual object structure:

```ts
let user: {
    name: string;
} = {
    name: "Prithvi"
};

console.log(user.name); // Works
```

**Recommendation:** Use specific object types, interfaces, or type aliases instead of the generic `object` type whenever possible.

---

## 12. Object Type Inference

TypeScript can automatically infer the structure and types of an object based on its initial values.

### Example

```ts
let user = {
    name: "Prithvi",
    age: 21,
    isActive: true
};
```

TypeScript automatically infers:

```ts
// {
//     name: string;
//     age: number;
//     isActive: boolean;
// }
```

You don't always need to explicitly specify object property types.

However, when defining reusable object structures, using `type` or `interface` is often better.

---