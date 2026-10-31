# TypeScript: `in` Operator in Type Guards

## 1. What is the `in` Operator?

The **`in` operator** checks whether a particular property exists inside an object.

In TypeScript, it is also used as a **type guard** to narrow down union types, especially when working with objects that have different properties.

### Basic JavaScript Example

```ts
const student = {
    name: "Prithvi",
    age: 20,
    department: "BCA"
};

console.log("name" in student);       // true
console.log("marks" in student);      // false
console.log("department" in student); // true
```

The `in` operator returns:

- `true` if the property exists on the object or its prototype chain.
- `false` if the property does not exist.

**Syntax:**

```ts
"propertyName" in object
```

---

## 2. Using `in` as a Type Guard

Suppose we have two different types: `Student` and `Teacher`.

```ts
type Student = {
    name: string;
    marks: number;
};

type Teacher = {
    name: string;
    subject: string;
};
```

Both types have a `name` property, but their other properties are different.

We can use the `in` operator to distinguish between them.

```ts
function displayPerson(person: Student | Teacher) {

    if ("marks" in person) {
        console.log("Student Marks:", person.marks);
    }
    else {
        console.log("Teacher Subject:", person.subject);
    }
}
```

**What's happening?**

1. Initially, `person` can be either `Student` or `Teacher`.
2. TypeScript checks whether `"marks"` exists in `person`.
3. If it exists, TypeScript narrows `person` to `Student`.
4. Otherwise, TypeScript narrows `person` to `Teacher`.

This is called **Type Narrowing using the `in` operator**.

---

## 3. Using `in` with Multiple Object Types

We can use the `in` operator to distinguish between multiple object types.

```ts
type Car = {
    brand: string;
    drive: () => void;
};

type Bike = {
    brand: string;
    ride: () => void;
};

type Boat = {
    brand: string;
    sail: () => void;
};

function startVehicle(vehicle: Car | Bike | Boat) {

    if ("drive" in vehicle) {
        vehicle.drive();
    }

    else if ("ride" in vehicle) {
        vehicle.ride();
    }

    else {
        vehicle.sail();
    }
}
```

Here:

- `"drive" in vehicle` identifies a `Car`.
- `"ride" in vehicle` identifies a `Bike`.
- Otherwise, TypeScript identifies it as a `Boat`.

---

## 4. What if Both Types Have the Same Property?

Consider this example:

```ts
type Student = {
    name: string;
    marks: number;
};

type Teacher = {
    name: string;
    marks: number;
    subject: string;
};
```

Both types contain the `marks` property.

```ts
function displayPerson(person: Student | Teacher) {

    if ("marks" in person) {
        console.log(person.marks);
    }
}
```

Here, checking `"marks" in person` does not distinguish between `Student` and `Teacher`.

TypeScript still considers `person` to be `Student | Teacher` inside the condition.

**Lesson:** Use a property that meaningfully distinguishes the object types.

---

## 5. Optional Properties and the `in` Operator

One important detail: properties declared as optional can exist in either branch of an `in` check.

```ts
type Student = {
    name: string;
    marks?: number;
};

type Teacher = {
    name: string;
    subject: string;
};

function displayPerson(person: Student | Teacher) {

    if ("marks" in person) {
        console.log(person.marks);
    }
    else {
        console.log(person.subject);
    }
}
```

Since `marks` is optional, a `Student` might not have that property at runtime.

Therefore:

- In the `if` branch, TypeScript considers `person` to be `Student`, but `marks` can still be `undefined`.
- In the `else` branch, TypeScript cannot completely eliminate `Student`, because a student might not have the optional property.

If you need to check whether the property has a usable value, perform an additional check.

```ts
if ("marks" in person && typeof person.marks === "number") {
    console.log(person.marks);
}
```

---

## 6. Important Things to Remember

- The `in` operator checks whether a property exists in an object or its prototype chain.
- It returns a boolean (`true` or `false`).
- TypeScript uses it as a type guard to narrow union types.
- It is especially useful when working with different object structures.
- Checking a shared property will not necessarily distinguish between types.
- Optional properties can make narrowing less precise.
- The `in` operator checks property existence, not the property's value or type.

---

## 7. Practice Exercises

1. Create `Student` and `Teacher` types with different properties. Use `in` to distinguish between them.
2. Create `Car`, `Bike`, and `Boat` types and identify each using the `in` operator.
3. Create a `User` type with an optional `email` property. Check whether the property exists.
4. Create a function that accepts `string | number[]` and use `Array.isArray()` to narrow the type.