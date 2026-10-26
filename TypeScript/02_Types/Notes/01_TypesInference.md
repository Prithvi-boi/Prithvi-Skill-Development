
# TypeScript Type Inference: Best Common Type & Contextual Typing

Type Inference is a feature in TypeScript that allows the compiler to automatically determine the type of a variable, expression, or function without requiring explicit type annotations.

Type inference generally happens in the following situations:

- Variable initialization
- Class members initialization
- Function parameter default values
- Function return values
- Array and object initialization

---

## 1. Best Common Type

When TypeScript encounters multiple expressions or values while inferring a type, it tries to find a **Best Common Type (BCT)** that is compatible with all the provided values.

In simple words, TypeScript looks at all the values and tries to determine a common type that can accommodate them.

### Example 1: Array with Similar Types

```typescript
let numbers = [1, 2, 3, 4];
```

TypeScript infers the type as:

```typescript
let numbers: number[];
```

All the elements are numbers, so TypeScript determines that the array contains numbers.

### Example 2: Array with Different Types

```typescript
let values = [0, 1, null];
```

TypeScript infers the type as:

```typescript
let values: (number | null)[];
```

Here:

- `number` represents numeric values.
- `null` represents an absent value.
- `|` is the union operator, which allows a value to have multiple possible types.

Therefore, the array can contain either numbers or `null`.

### Example 3: Different Class Types

Consider the following classes:

```typescript
class Animal {}

class Rhino extends Animal {}

class Elephant extends Animal {}

class Snake extends Animal {}
```

Now, create an array:

```typescript
let zoo = [
    new Rhino(),
    new Elephant(),
    new Snake()
];
```

TypeScript infers:

```typescript
let zoo: (Rhino | Elephant | Snake)[];
```

**Why doesn't TypeScript infer `Animal[]`?**

Although all three classes extend `Animal`, TypeScript doesn't automatically select their common parent class in this situation.

Instead, it creates a union of the available types because no common parent type was explicitly provided as a candidate.

### How to Fix It?

Explicitly provide the common parent type:

```typescript
let zoo: Animal[] = [
    new Rhino(),
    new Elephant(),
    new Snake()
];
```

Now TypeScript understands that the array contains objects belonging to the `Animal` type or its subclasses.

**Key Takeaway:**

- TypeScript tries to find a common type among multiple values.
- If it cannot find a suitable common type, it may infer a union type.
- You can explicitly provide a common parent type when needed.

---

## 2. Contextual Typing

Contextual Typing is another form of type inference where TypeScript determines the type of an expression based on the location or context in which it is used.

Unlike ordinary type inference, where TypeScript determines the type from the assigned value, contextual typing works in the opposite direction.

**In simple words:** TypeScript looks at where you're using something to figure out what type it should have.

### Example 1: Event Handling

```typescript
window.onmousedown = function (mouseEvent) {
    console.log(mouseEvent.button);
};
```

Here, we haven't explicitly declared the type of `mouseEvent`.

However, TypeScript automatically infers it as:

```typescript
mouseEvent: MouseEvent
```

**Why?**

Because `window.onmousedown` expects a mouse event handler, TypeScript already knows that the parameter should be a `MouseEvent`.

Therefore, it automatically provides the correct type.

### Type Checking with Contextual Typing

Consider this example:

```typescript
window.onmousedown = function (mouseEvent) {
    console.log(mouseEvent.button);    // Valid

    console.log(mouseEvent.kangaroo);  // Error
};
```

Why does the second statement produce an error?

Because `MouseEvent` contains a `button` property, but it does not contain a `kangaroo` property.

TypeScript knows the expected type and checks the properties accordingly.

### Example 2: Different Event Types

Consider another event handler:

```typescript
window.onscroll = function (uiEvent) {
    console.log(uiEvent.button); // Error
};
```

Here, TypeScript infers:

```typescript
uiEvent: Event
```

The `onscroll` event expects an `Event` object, not a `MouseEvent`.

Therefore, accessing the `button` property produces an error.

**Important:** Different event handlers can have different event types. TypeScript determines the appropriate type from the event handler being used.

---

## 3. Contextual Typing vs. Implicit Any

Contextual typing helps TypeScript determine parameter types from their usage context.

However, when there is no contextual information available, TypeScript might infer a parameter as `any`.

### Example

```typescript
const handler = function (uiEvent) {
    console.log(uiEvent.button);
};
```

Here, TypeScript has no information about the expected type of `uiEvent`.

If `noImplicitAny` is disabled, TypeScript allows it to have the `any` type without reporting an error.

If `noImplicitAny` is enabled, TypeScript reports an error because the parameter has an implicit `any` type.

### Explicitly Providing a Type

You can also override contextual typing by explicitly declaring the parameter type.

```typescript
window.onscroll = function (uiEvent: any) {
    console.log(uiEvent.button);
};
```

Now TypeScript won't report an error for accessing `button` because `any` disables property type checking.

However, this doesn't mean the property actually exists!

At runtime, `uiEvent.button` will return `undefined` because the event doesn't contain that property.

> **Remember:** `any` disables type checking. It doesn't change the actual structure or behavior of an object.

---

## 4. Where Does Contextual Typing Apply?

Contextual typing is used in several situations, including:

1. **Function arguments:** When passing function expressions as arguments.
2. **Assignments:** When assigning expressions to variables or object properties with known types.
3. **Type assertions:** When an expression is used in a type assertion context.
4. **Object and array literals:** When initializing objects or arrays with an expected type.
5. **Return statements:** When a function has an explicitly declared return type.

### Example: Contextual Typing with Return Values

```typescript
function createZoo(): Animal[] {
    return [
        new Rhino(),
        new Elephant(),
        new Snake()
    ];
}
```

Here, we explicitly declared the return type as `Animal[]`.

TypeScript uses this information as context when checking the returned array.

It can therefore infer the array as:

```typescript
Animal[]
```

Even though the individual elements are instances of different classes.

---

## 5. Quick Revision

| Concept | Meaning |
|---|---|
| Type Inference | TypeScript automatically determines types. |
| Best Common Type | Finds a suitable common type among multiple expressions. |
| Union Type | Allows a value to have multiple possible types. |
| Contextual Typing | Determines types based on the expression's usage context. |
| Implicit Any | `any` assigned without explicitly declaring it. |
| `noImplicitAny` | Reports errors when TypeScript implicitly infers `any`. |

### Best Common Type vs. Contextual Typing

| Best Common Type | Contextual Typing |
|---|---|
| Looks at multiple values or expressions. | Looks at where an expression is being used. |
| Finds a suitable common type. | Uses the expected type from the context. |
| Commonly seen in arrays. | Commonly seen in event handlers and callbacks. |

---

## Key Takeaways

- TypeScript can infer types without explicit annotations.
- Best Common Type helps determine a suitable type when multiple values are involved.
- When no suitable common type is available, TypeScript may infer a union type.
- Contextual Typing determines types based on the expected type of an expression.
- Contextual typing is especially useful when working with callbacks and event handlers.
- `noImplicitAny` helps prevent unintended use of `any`.