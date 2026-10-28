# TypeScript Enums

## 1. What is an Enum?

An **Enum (Enumeration)** is a TypeScript feature that allows us to define a group of named constants.

> A named constant is a value that has a meaningful name and is not supposed to change.

***You can think of an enum like a predefined set of select-options in HTML.***

It is useful when a variable should have one value from a predefined set of options.

For example, imagine an application where an order can have only three statuses:

- Pending
- Shipped
- Delivered

Instead of repeatedly writing these values as strings, we can define an enum.

```ts
enum OrderStatus {
    Pending,
    Shipped,
    Delivered
}

let currentStatus: OrderStatus = OrderStatus.Pending;
```

**Why use enums?**

- Makes code more readable.
- __Provides a fixed set of named options.__
- Reduces spelling mistakes from repeatedly writing string values.
- Makes it easier to manage related constants.

---

## 2. Numeric Enums

By default, TypeScript enums use numeric values.

If you don't assign values manually, TypeScript starts from `0` and increments each subsequent member by `1`.

```ts
enum Direction {
    Up,
    Down,
    Left,
    Right
}
```

Internally, the values are:

| Enum member | Value |
|---|---:|
| Direction.Up | 0 |
| Direction.Down | 1 |
| Direction.Left | 2 |
| Direction.Right | 3 |

Accessing enum members:

```ts
let playerDirection: Direction = Direction.Up;

console.log(playerDirection); // 0
console.log(Direction.Left);  // 2
```

### Manually assigning numeric values

We can also assign our own numeric values.

```ts
enum StatusCode {
    Success = 200,
    NotFound = 404,
    ServerError = 500
}

console.log(StatusCode.Success); // 200
```

### Automatic incrementing after a manually assigned value

If we assign a value to one member, the following members automatically increment from that value.

```ts
enum StatusCode {
    Success = 200,
    Created,
    Accepted,
    NotFound = 404,
    ServerError
}
```

Values:

```ts
Success     // 200
Created     // 201
Accepted    // 202
NotFound    // 404
ServerError // 405
```

---

## 3. String Enums

Instead of numeric values, we can assign string values to enum members.

Unlike numeric enums, string enums do not automatically generate values. Each member must be assigned a string value.

```ts
enum UserRole {
    Admin = "ADMIN",
    User = "USER",
    Guest = "GUEST"
}

let role: UserRole = UserRole.Admin;

console.log(role); // "ADMIN"
```

### Why use string enums?

String values are easier to understand when debugging or inspecting data.

For example:

```ts
enum PaymentStatus {
    Pending = "PENDING",
    Completed = "COMPLETED",
    Failed = "FAILED"
}
```

The actual values are meaningful and readable.

---

## 4. Using Enums with Functions

Enums can be used as parameter types in functions.

This ensures that the function receives a value belonging to the specified enum.

```ts
enum UserRole {
    Admin = "ADMIN",
    User = "USER",
    Guest = "GUEST"
}

function checkAccess(role: UserRole): void {
    console.log(`Checking access for: ${role}`);
}

checkAccess(UserRole.Admin); // Valid
checkAccess(UserRole.User);  // Valid

// Error: Argument of type '"SUPERADMIN"' is not assignable
// to parameter of type 'UserRole'.
checkAccess("SUPERADMIN");
```

This is useful when you want to restrict the accepted values.

---

## 5. Enums with Objects and Interfaces

Enums can also be used as property types inside interfaces.

```ts
enum CharacterRace {
    Saiyan = "SAIYAN",
    Human = "HUMAN",
    Namekian = "NAMEKIAN"
}

interface Character {
    name: string;
    race: CharacterRace;
    powerLevel: number;
}

const goku: Character = {
    name: "Goku",
    race: CharacterRace.Saiyan,
    powerLevel: 100000000
};
```

Here, the `race` property can only accept a value from `CharacterRace`.

---

## 6. Reverse Mapping in Numeric Enums

Numeric enums support reverse mapping.

This means we can access:

- The numeric value using the enum member name.
- The enum member name using its numeric value.

```ts
enum Direction {
    Up,
    Down,
    Left,
    Right
}

console.log(Direction.Up); // 0
console.log(Direction[0]); // "Up"
```

**Important:** Reverse mapping is available for numeric enums, but not string enums.

---

## 7. Heterogeneous Enums

An enum can technically contain both numeric and string values.

```ts
enum Mixed {
    No = 0,
    Yes = "YES"
}
```

However, mixing numeric and string members is generally discouraged because it makes the enum less consistent.

Prefer numeric enums or string enums.

---

## 8. Const Enums

TypeScript also supports `const enum`.

```ts
const enum Direction {
    Up,
    Down,
    Left,
    Right
}

const currentDirection = Direction.Up;
```

Unlike regular enums, `const enum` members are generally replaced with their values during compilation.

For example, the generated JavaScript can look like this:

```js
const currentDirection = 0;
```

This avoids generating a separate enum object.

**Note:** Const enums have some limitations, especially when shared between packages or used in declaration files. As a beginner, focus on regular enums first.

---

## 9. Enum vs Union Types

Enums are not the only way to define a fixed set of possible values.

We can also use union types.

### Using an enum

```ts
enum TrafficLight {
    Red = "RED",
    Yellow = "YELLOW",
    Green = "GREEN"
}

let light: TrafficLight = TrafficLight.Red;
```

### Using a union type

```ts
type TrafficLight = "RED" | "YELLOW" | "GREEN";

let light: TrafficLight = "RED";
```

Both approaches restrict the variable to a fixed set of values.

### Difference

| Enums | Union Types |
|---|---|
| Uses the `enum` keyword | Uses the `type` keyword |
| Creates a runtime object (regular enum) | Exists only at compile time |
| Members are accessed using `EnumName.Member` | Values are used directly |
| Supports numeric and string members | Can represent string, number, and other types |
| Useful for named constant groups | Useful for defining a set of allowed values |

### Which should you use?

Both are valid.

For simple string-based options, union types are often a lightweight alternative.

Use enums when you want a named group of constants that can also be accessed as an object at runtime.

---

## 10. Object with `as const` as an Alternative

Another approach is to use an object with `as const`.

```ts
const Direction = {
    Up: "UP",
    Down: "DOWN",
    Left: "LEFT",
    Right: "RIGHT"
} as const;

type Direction = typeof Direction[keyof typeof Direction];

let currentDirection: Direction = Direction.Up;
```

Here:

- `as const` preserves the exact literal values.
- `typeof Direction` gets the object's type.
- `keyof typeof Direction` gets its keys.
- Indexing with those keys produces the union of its values.

This is another common way to create a fixed set of values without using an enum.

---

## 11. Practical Example: Order Management

Let's combine enums, interfaces, arrays, and functions.

```ts
enum OrderStatus {
    Pending = "PENDING",
    Processing = "PROCESSING",
    Shipped = "SHIPPED",
    Delivered = "DELIVERED",
    Cancelled = "CANCELLED"
}

interface Order {
    id: number;
    product: string;
    status: OrderStatus;
}

const orders: Order[] = [
    {
        id: 1,
        product: "Laptop",
        status: OrderStatus.Pending
    },
    {
        id: 2,
        product: "Keyboard",
        status: OrderStatus.Shipped
    },
    {
        id: 3,
        product: "Mouse",
        status: OrderStatus.Delivered
    }
];

function updateOrderStatus(
    orderId: number,
    newStatus: OrderStatus
): void {
    const order = orders.find(item => item.id === orderId);

    if (order) {
        order.status = newStatus;
    }
}

updateOrderStatus(1, OrderStatus.Processing);

console.log(orders);
```

The `status` property cannot be assigned an arbitrary string. It must use one of the defined `OrderStatus` members.

---

### Important Things to Remember

1. Use the `enum` keyword to create an enum.
2. Numeric enums start from `0` by default.
3. String enums require explicit string values.
4. Access enum members using `EnumName.Member`.
5. Enums can be used as variable, function parameter, and interface property types.
6. Numeric enums support reverse mapping; string enums do not.
7. Union types and objects with `as const` are alternatives to enums.

### Official Documentation

- [TypeScript Handbook – Enums](https://www.typescriptlang.org/docs/handbook/enums)
- [TypeScript Handbook – Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
