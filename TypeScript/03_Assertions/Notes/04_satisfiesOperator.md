# TypeScript: `satisfies` Operator

## 1. What is `satisfies`?

The `satisfies` operator checks whether an expression matches a particular type without changing the inferred type of that expression.

In simple words:

**It checks whether your value follows a type, while preserving its original inferred type.**

### Syntax

```ts
const variable = value satisfies Type;
```

### Example

```ts
type Student = {
    name: string;
    age: number;
};

const student = {
    name: "Prithvi",
    age: 20
} satisfies Student;
```

Here:
- TypeScript checks whether `student` satisfies the `Student` type.
- If a required property is missing or has an incompatible type, TypeScript reports an error.
- The variable retains its inferred type.

---

## 2. Why Do We Need `satisfies`?

You might think: "Why not just use a normal type annotation?"

That's a fair question. Let's see where satisfies actually helps.
1. The problem with normal type annotations

Suppose you're creating a configuration object:

```js
type Config = {
    appName: string;
    version: number;
    isProduction: boolean;
};

const config: Config = {
    appName: "My App",
    version: 1,
    isProduction: false
};
```

This works perfectly.
But TypeScript now treats config as the general Config type.

What if you want to preserve more specific information about the object?

2. The benefit of satisfies

Consider this example:

```js
type Config = {
    appName: string;
    version: number;
    isProduction: boolean;
};

const config = {
    appName: "My App",
    version: 1,
    isProduction: false
} satisfies Config;
```


Now TypeScript:
- Checks whether the object follows Config.
- Preserves the inferred type of the object.
- Doesn't replace its inferred type with Config.
---

## 3. `satisfies` vs Type Annotation

Consider this example:

```ts
type Colors = "red" | "green" | "blue";

const color1: Colors = "red";

const color2 = "red" satisfies Colors;
```

The inferred types are:

```ts
// color1: Colors
// color2: "red"
```

Why?

- Type annotation explicitly declares the variable's type as `Colors`.
- `satisfies` checks that the value belongs to `Colors`, while retaining the more specific literal type `"red"`.

This is one of the main advantages of `satisfies`.

---

## 4. `satisfies` with Objects

Suppose we want to create a configuration object that follows a particular structure.

```ts
type Config = {
    appName: string;
    version: number;
    isProduction: boolean;
};

const config = {
    appName: "My Application",
    version: 1,
    isProduction: false
} satisfies Config;
```

TypeScript validates the object against `Config`.

If we make a mistake:

```ts
const config = {
    appName: "My Application",
    version: "1.0", // Error: Expected number
    isProduction: false
} satisfies Config;
```

TypeScript reports an error because `version` should be a number.

It also checks for unexpected properties on fresh object literals:

```ts
const config = {
    appName: "My Application",
    version: 1,
    isProduction: false,
    author: "Prithvi" // Error: Unknown property
} satisfies Config;
```

---

## 5. `satisfies` with `Record`

This is a particularly useful pattern.

Suppose we want an object containing details for different departments.

```ts
type Department = "BCA" | "BCOM" | "BBA";

type DepartmentInfo = {
    fullName: string;
    duration: number;
};

const departments = {
    BCA: {
        fullName: "Bachelor of Computer Application",
        duration: 3
    },
    BCOM: {
        fullName: "Bachelor of Commerce",
        duration: 3
    },
    BBA: {
        fullName: "Bachelor of Business Administration",
        duration: 3
    }
} satisfies Record<Department, DepartmentInfo>;
```

### Understanding `Record`

```ts
Record<Keys, ValueType>
```

It creates an object type where:
- Every key must belong to `Keys`.
- Every value must follow `ValueType`.

In our example:

```ts
Record<Department, DepartmentInfo>
```

Means:
- The object must contain BCA, BCOM and BBA.
- Every department must have `fullName` and `duration`.

### Benefits

- Missing department keys are detected.
- Invalid department keys are detected on fresh object literals.
- Incorrect property types are detected.
- The original inferred object type is preserved.

---

## 6. `satisfies` with `as const`

We can combine both operators.

```ts
type Department = "BCA" | "BCOM" | "BBA";

const departments = {
    BCA: "Bachelor of Computer Application",
    BCOM: "Bachelor of Commerce",
    BBA: "Bachelor of Business Administration"
} as const satisfies Record<Department, string>;
```

Here:

**`as const`**
- Preserves exact literal values.
- Makes properties readonly.

**`satisfies`**
- Checks that all required department keys exist.
- Checks that every value is a string.

We can now extract the exact keys and values:

```ts
type DepartmentKeys = keyof typeof departments;

type DepartmentValues =
    typeof departments[keyof typeof departments];
```

Result:

```ts
type DepartmentKeys = "BCA" | "BCOM" | "BBA";

type DepartmentValues =
    | "Bachelor of Computer Application"
    | "Bachelor of Commerce"
    | "Bachelor of Business Administration";
```

This combination is useful for configuration objects, fixed options and application constants.

---

## 7. `satisfies` vs Type Assertion (`as`)

These operators have different purposes.

```ts
type Student = {
    name: string;
    age: number;
};
```

### Using `as`

```ts
const student = {
    name: "Prithvi"
} as Student;
```

TypeScript allows this assertion because the source and target types have sufficient overlap, even though the required `age` property is missing.

The assertion tells TypeScript to treat the expression as `Student`.

### Using `satisfies`

```ts
const student = {
    name: "Prithvi"
} satisfies Student;
```

This produces an error because the required `age` property is missing.


## A practical example where it makes a difference
Imagine you have a list of application routes:
```js
type Route = {
    path: string;
    requiresAuth: boolean;
};

const routes = {
    home: {
        path: "/",
        requiresAuth: false
    },
    dashboard: {
        path: "/dashboard",
        requiresAuth: true
    }
} satisfies Record<string, Route>;
```


Now you can access the exact properties:

```js
console.log(routes.home.path);
console.log(routes.dashboard.requiresAuth);
```

TypeScript knows that routes has the specific properties home and dashboard.

Compare that with:
```js
const routes: Record<string, Route> = {
    home: {
        path: "/",
        requiresAuth: false
    },
    dashboard: {
        path: "/dashboard",
        requiresAuth: true
    }
};
```
Here, TypeScript sees routes as a general string-keyed record. It doesn't preserve the same specific set of property names in the variable's type.

For example:
```
routes.profile.path;
```


With the Record<string, Route> annotation, this is allowed by the type system, even though profile doesn't actually exist. It can therefore cause a runtime error.

With satisfies, TypeScript knows the actual keys and catches that mistake.

### Comparison

| Feature | `as` | `satisfies` |
|---|---|---|
| Purpose | Assert a type | Validate against a type |
| Checks compatibility | Yes, with assertion compatibility rules | Yes, checks assignability |
| Preserves inferred type | No, uses the asserted type | Yes |
| Detects missing required properties | Not necessarily | Yes |
| Changes runtime value | No | No |

**Important:** `satisfies` is not a replacement for every type annotation. Use the approach that best communicates your intention.

---

## 8. Important Things to Remember

- `satisfies` was introduced in TypeScript 4.9.
- It checks whether an expression satisfies a particular type.
- It preserves the expression's inferred type instead of replacing it with the target type.
- It detects missing required properties and incompatible property types.
- It is useful with objects, configuration files, `Record`, and fixed options.
- It can be combined with `as const`.
- It does not perform runtime validation.
- It does not change the actual JavaScript value.

### Quick Summary

```ts
// Type Annotation
const name: string = "Prithvi";

// Type Assertion
const value = someValue as string;

// Const Assertion
const department = "BCA" as const;

// Satisfies
const student = {
    name: "Prithvi",
    age: 20
} satisfies Student;

// Combining satisfies and as const
const departments = {
    BCA: "Bachelor of Computer Application",
    BCOM: "Bachelor of Commerce"
} as const satisfies Record<string, string>;
```

**Final takeaway:**

- `: Type` → Declares the variable's type.
- `as Type` → Tells TypeScript to treat a value as a particular type.
- `as const` → Preserves exact literal types and adds readonly restrictions.
- `satisfies Type` → Checks compatibility while preserving the expression's inferred type.