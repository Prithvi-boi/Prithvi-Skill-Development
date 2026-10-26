// TypeScript can automatically detect types
// Hover on the variable to see what typescript has actually assign to them

let drink = 'Chai'

let cups = Math.random() > 0.5 ? 10 : 5

let Differentcups = Math.random() > 0.5 ? 10 : '2'

//------- Type Annotation
// Here we explicily define the type.
let coffee: string = 'black coffee'
let youtuber: string = 'Mrbeast'
let age:number = 20

//-------- More Examples on type inference

// Class

// Note that "noImplicitAny" is false
class ticket {
    constructor(movieName) { // Implicitly set to any type
        
    }
}

// Function

function greet(name) { // Implicitly set to any type , also its return value.
    
}

// Array

let fruits = ['Apple', 'banana']
let members = [10,'20']

// Object

let fruits2 = {
    '1' : 'Apple',
    '2' : 'grapes',
    '3' : 10
}