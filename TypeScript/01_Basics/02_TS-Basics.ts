
// Typescript is just an extra layer of type checking on top of javascript
// it knows how js works. so if a variable is assignd to value it automatlly assign the data type
let helloWorld = "Hello World";

// -X-x-


// ==========================================
// Example for each DATA TYPES using syntax like ' : typename'
// ==========================================

// 1. Number
let age: number = 21;
let price: number = 99.99;
let infinity: number = Infinity;
let notANumber: number = NaN;

// 2. String
let names: string = "Prithvi";
let language: string = 'TypeScript';
let message: string = `Hello ${names}`;

// 3. Boolean
let isLoggedIn: boolean = true;
let isAdmin: boolean = false;

// 4. Undefined
let username: undefined = undefined;

// 5. Null
let selectedUser: null = null;

// 6. BigInt
let bigNumber: bigint = 12345678901234567890n;

// 7. Symbol
let id: symbol = Symbol("id");
let anotherId: symbol = Symbol("id");


// ==========================================
// NON-PRIMITIVE DATA TYPES Examples: (IMP)
// ==========================================

// 1. Object
let user: {
    name: string;
    age: number;
    isStudent: boolean;
} = {
    name: "Prithvi",
    age: 21,
    isStudent: true
};

// 2. Array
let numbers: number[] = [10, 20, 30];
let languages: string[] = ["JavaScript", "TypeScript", "Java"];

// Alternative array syntax
let scores: Array<number> = [80, 90, 95];

// 3. Tuple
let person: [string, number, boolean] = ["Prithvi", 21, true];

// 4. Function
function greet(name: string): string {
    return `Hello ${name}`;
}

// Function with no return value
function logMessage(message: string): void {
    console.log(message);
}

// 5. Date
let today: Date = new Date();

// 6. RegExp
let pattern: RegExp = /hello/i;

// 7. Map
let users: Map<number, string> = new Map();
users.set(1, "Prithvi");
users.set(2, "John");

// 8. Set
let uniqueNumbers: Set<number> = new Set([1, 2, 3, 3]);

// 9. WeakMap
let weakMap: WeakMap<object, string> = new WeakMap();

// 10. WeakSet
let weakSet: WeakSet<object> = new WeakSet();

// 11. Promise
let promise: Promise<string> = new Promise((resolve) => {
    resolve("Success");
});

// 12. Error
let error: Error = new Error("Something went wrong");


// ==========================================
// 3. SPECIAL TYPES IN TYPESCRIPT (Just know about this)
// ==========================================

// Any - disables type checking
let anyValue: any = "Hello";
anyValue = 100;

// Unknown - safer alternative to any
let unknownValue: unknown = "Hello";

// Never - represents a value that never occurs
function throwError(): never {
    throw new Error("Error occurred");
}

// Void - no meaningful return value
function sayHello(): void {
    console.log("Hello World");
}

// Literal types
let direction: "left" | "right" | "up" | "down" = "left";

// Union types
let value: string | number = "Hello";
value = 100;

// Intersection types
type User = {
    name: string;
};

type Admin = {
    permissions: string[];
};

type AdminUser = User & Admin;

let admin: AdminUser = {
    name: "Prithvi",
    permissions: ["read", "write"]
};
