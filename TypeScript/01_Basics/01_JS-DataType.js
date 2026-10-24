
//  PRIMITIVE DATA TYPES (7 TYPES)    // 

// 1. Number
let age = 21;
let price = 99.99;
let temperature = -10;

/* Speacial Numberic Types
Infinity
-Infinity
NaN (Not a Number)
*/

// 2. Strings
let name = "Prithvi";
let language = 'JavaScript';
let message = `Hello ${name}`;

// 3. Boolean
let isLoggedIn = true;

// 4. undefined
let username;

console.log(username);        // undefined
console.log(typeof username); // "undefined"

// 5. null
let selectedUser = null;

console.log(selectedUser);        // null
console.log(typeof selectedUser); // "object"

// 6. bigInt
let bigNumber = 123456789012345678901234567890n;

// 7. Symbol
let id1 = Symbol("id");
let id2 = Symbol("id");

console.log(id1 === id2); // false
console.log(typeof id1); // "symbol"


//  NON-PRIMITIVE DATA TYPES (Reference types)  // 

// 1. Array
let languages = ["JavaScript", "TypeScript", "Java"];

console.log(languages[0]); // JavaScript
console.log(typeof languages); // "object"

// 2. function
function greet() {
    console.log("Hello World");
}

console.log(typeof greet); // "function"

// 3. Object
let person = {name: 'Prithvi'}
console.log(typeof person) // functions

// 4. Other types includes:
// Date, RegExp, Map, Set, WeakMap, WeakSet, Promise and Error