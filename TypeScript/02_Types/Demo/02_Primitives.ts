
//---      Strings     ---//

let username: string = "Prithvi";

// String Literal Types
let direction: "left" | "right" | "center";

direction = "left";  // Valid
direction = "right"; // Valid
// direction = "up"; // Error


//-------------------------
//---      Number     ---//

let score: number = 100;

score = 200;   // Valid
score = 10.5;  // Valid

// score = "100"; // Error


//-------------------------
//---      Boolean     ---//

let isActive: boolean = true;

let canVote: boolean = score >= 75; // valid

// isActive = 1;       // Error
// isActive = "true";  // Error

// JavaScript has truthy and falsy values, but TypeScript's boolean type accepts only actual boolean values.

//-------------------------
//---      Undefined     ---//

let age: number;
console.log(age); // undefined

function getUser() {
    // No return statement
}

let result = getUser();
console.log(result); // undefined



//-------------------------
//---      Null     ---//

// Null: an intentional absence of a value.

let profilePicture: string | null = null;

// Later, the user uploads a picture.
profilePicture = "profile.png";
