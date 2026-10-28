/// ----------- any
let value: any = 10;

value = "Hello";
value = true;
value = { name: "Prithvi" };

console.log(value.toUpperCase()); // No TypeScript error

///----------- unknown

let value2: unknown = "Hello";

// console.log(value.toUpperCase()); // Error

if (typeof value2 === "string") {
    console.log(value2.toUpperCase()); // Works
}

///----------- never
// never represents a value that never occurs.

function throwError(message: string): never {
    throw new Error(message);
}

// Best practice from now is to always use unknown instead of any