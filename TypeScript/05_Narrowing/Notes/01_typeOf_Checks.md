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

# Practice Question - TypeScript Type Narrowing and Type Guards
1. Write a function `describe(value: string | number): string` that returns the uppercased text if it gets a string, and the number with 2 decimal places if it gets a number. Use `typeof` narrowing only, no type assertions (`as`). Test it with `"hello"` and `42`.

2. Write `formatValue(value: string | number | boolean | null | undefined): string` that returns: a trimmed + uppercased string for strings, 2 decimal places for numbers, `"Yes"` / `"No"` for booleans, `"Nothing (null)"` for null and `"Nothing (undefined)"` for undefined. Make sure `null` is handled before anything that could treat it as an object. Test all 5 cases.

3. Create `type Success = { status: "success"; data: string }` and `type Failure = { status: "error"; message: string }` with `type ApiResult = Success | Failure`. Write `getMessage(result: ApiResult): string` that returns the data for success and `"Error: " + message` for failure. Then create two sample objects, one of each type, and log what `getMessage` returns for both.

4. Build a shapes calculator. Define `Circle` (`kind: "circle"`, `radius`), `Rectangle` (`kind: "rectangle"`, `width`, `height`) and `Triangle` (`kind: "triangle"`, `base`, `height`), combine them into a `Shape` union, and write `area(shape: Shape): number` using a `switch` on `kind`. No type assertions. Test with one shape of each kind.

5. Build a request state handler.
   - a) Define 4 states as a discriminated union: `idle`, `loading`, `success` (has `data: string[]`), `error` (has `message: string` and `code: number`).
   - b) Write `render(state: RequestState): string` using a `switch` that returns a different line for each state (the success line should show how many items came back, the error line should include the code and message).
   - c) In the `default` branch, assign `state` to a variable of type `never` so the compiler checks you covered every case.
   - d) Add a 5th state, `empty`, to the union without touching `render`. Read the compiler error and then fix `render`.
   - e) Write a second function `isFinished(state: RequestState): boolean` that returns true for `success` and `error` only, and make TypeScript narrow correctly inside it.