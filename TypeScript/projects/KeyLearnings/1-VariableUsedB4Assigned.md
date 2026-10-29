# TypeScript: Definite Assignment & Non-Null Assertion

## 1. Variable Used Before Being Assigned

TypeScript checks whether a variable has been assigned a value before it is used.

This check helps prevent errors caused by accessing variables that don't have an initialized value.

**Example:**

```typescript
let username: string;

console.log(username); // Error: Variable is used before being assigned
```

Even though we declared `username` as a string, we haven't assigned any value to it.

## 2. Definite Assignment Assertion (`!`)

The definite assignment assertion tells TypeScript that we will assign a value to the variable before using it.

**Syntax:**

```typescript
let variableName!: type;
```

**Example:**

```typescript
let username!: string;

username = "Prithvi";

console.log(username); // Prithvi
```

The `!` tells TypeScript not to perform definite assignment checking for this variable.

**Important:** It does not initialize the variable or assign a default value. We are responsible for assigning it before accessing it.

## 3. Non-Null Assertion Operator (`!`)

The non-null assertion operator tells TypeScript that a value is not `null` or `undefined`, even if its type allows those values.

**Example:**

```typescript
let username: string | undefined = "Prithvi";

console.log(username!.toUpperCase()); // PRITHVI
```

Without `!`, TypeScript may complain because `username` could potentially be `undefined`.

**Important:** This operator only suppresses TypeScript's warning. It does not prevent runtime errors if the value is actually `null` or `undefined`.

## 4. Disabling Strict Property Initialization

TypeScript provides a compiler option called `strictPropertyInitialization`.

It checks whether class properties are initialized when an object is created.

You can disable this check in `tsconfig.json`:

```json
{
    "compilerOptions": {
        "strictPropertyInitialization": false
    }
}
```

This only disables the initialization check for class properties.

## 5. Disabling All Strict Type Checking

You can disable all strict type-checking options using:

```json
{
    "compilerOptions": {
        "strict": false
    }
}
```

However, this is not recommended because strict checking helps catch potential bugs.

---

## Best Practices

1. Initialize variables whenever possible.
2. Use definite assignment (`!`) only when you are certain that the variable will be assigned before being accessed.
3. Use non-null assertion (`!`) only when you are certain a value cannot be null or undefined.
4. Avoid disabling strict mode just to get rid of TypeScript errors.

**Remember:** The exclamation mark (`!`) doesn't magically assign a value or fix a runtime error. It simply tells TypeScript to trust you.