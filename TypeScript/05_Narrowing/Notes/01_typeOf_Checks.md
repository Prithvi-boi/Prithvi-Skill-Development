# TypeScript: Type Narrowing and Type Guards

## 1. Type Narrowing

**Type Narrowing** is the process of making a variable's type more specific inside a particular block of code.

When a variable has multiple possible types (union types), TypeScript cannot always determine which type is being used. We can use conditions to narrow down its type.

### Basic Example

```ts
let value: string | number = "Hello";

// Error: value can be a string or number
// console.log(value.toUpperCase());

if (typeof value === "string") {
    console.log(value.toUpperCase());
}
else {
    console.log(value.toFixed(2));
}
```

**What's happening?**

- Inside the `if` block, TypeScript knows `value` is a `string`.
- Inside the `else` block, TypeScript knows `value` is a `number`.
- We can now safely use methods belonging to the narrowed type.

This process is called **Type Narrowing**.

---

## 2. `typeof` Type Guard

The JavaScript `typeof` operator checks the runtime type of a value.

In TypeScript, it can also be used as a type guard to narrow down types.

### JavaScript `typeof` Results

| Value | `typeof` Result |
|---|---|
| `"Hello"` | `"string"` |
| `100` | `"number"` |
| `true` | `"boolean"` |
| `undefined` | `"undefined"` |
| `100n` | `"bigint"` |
| `Symbol()` | `"symbol"` |
| `function() {}` | `"function"` |
| `{}` | `"object"` |
| `null` | `"object"` |

**Important:** JavaScript returns `"object"` for `null`. This is a historical JavaScript quirk.

### Example: Checking Different Types

```ts
function display(value: string | number | boolean): void {

    if (typeof value === "string") {
        console.log("String:", value.toUpperCase());
    }

    else if (typeof value === "number") {
        console.log("Number:", value.toFixed(2));
    }

    else {
        console.log("Boolean:", value ? "Yes" : "No");
    }
}

display("Prithvi"); // String: PRITHVI
display(25.5);      // Number: 25.50
display(true);      // Boolean: Yes
```

TypeScript automatically narrows the type based on each condition.

---

## 3. Discriminated Union Narrowing

This technique is useful when working with multiple object types.

We create a common property (usually called a discriminant) with different literal values for each type.

### Example

```ts
type Success = {
    status: "success";
    data: string;
};

type Error = {
    status: "error";
    message: string;
};

type Response = Success | Error;
```

Now we can narrow the type using the `status` property.

```ts
function handleResponse(response: Response) {

    if (response.status === "success") {
        console.log(response.data);
    }
    else {
        console.log(response.message);
    }
}
```

TypeScript automatically identifies the correct object type based on the `status` value.

**Why is this useful?**

- Helps manage API responses.
- Makes handling success and error states easier.
- Prevents accessing properties that do not exist on a particular object type.

---