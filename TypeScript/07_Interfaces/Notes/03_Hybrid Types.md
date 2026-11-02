# TypeScript: Hybrid Types

## 1. What are Hybrid Types?

A **hybrid type** combines multiple capabilities into a single type, typically allowing an object to behave as both a function and an object with properties or methods.

In simple words, you can call it like a function and access its properties or methods like an object.

## 2. Basic Syntax

```ts
interface Counter {
    (start: number): string; // Call signature
    count: number;           // Property
    reset(): void;           // Method
}
```

This interface describes something that:
- Can be called with a number.
- Has a `count` property.
- Has a `reset()` method.

## 3. Implementation Example

```ts
interface Counter {
    (start: number): string;
    count: number;
    reset(): void;
}

function createCounter(): Counter {
    const counter = ((start: number) => {
        counter.count += start;
        return `Count: ${counter.count}`;
    }) as Counter;

    counter.count = 0;

    counter.reset = () => {
        counter.count = 0;
    };

    return counter;
}

const counter = createCounter();

console.log(counter(5));      // Count: 5
console.log(counter.count);  // 5

counter.reset();

console.log(counter.count);  // 0
```

## 4. Understanding the Implementation

The `Counter` interface combines three things:

| Syntax | Purpose |
|---|---|
| `(start: number): string` | Call signature |
| `count: number` | Property |
| `reset(): void` | Method |

The same `counter` value can be used in different ways:

```ts
counter(5);       // Function call
counter.count;    // Access property
counter.reset();  // Call method
```

## 5. Why Are Hybrid Types Useful?

Hybrid types are useful when a function needs to maintain additional information or provide extra functionality.

Common use cases:
- Functions with configuration properties.
- Counters and stateful functions.
- Callback functions with additional metadata.
- Libraries that expose callable objects.

## 6. Important Things to Remember

- Hybrid types combine multiple type capabilities.
- They commonly combine call signatures with object properties and methods.
- Interfaces can describe hybrid types.
- A normal function does not automatically have custom properties or methods; they must be added during implementation.
- Type assertions may be needed when implementing callable objects with additional properties.

**Final takeaway:** Hybrid types allow a single value to behave like both a function and an object.