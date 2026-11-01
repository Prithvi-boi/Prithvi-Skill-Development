
// let value: unknown = 'Prithvi'
// let type = value as number[]

// type.forEach((val) => {
//     console.log(val)
// })

// Practice Questions demo: 

// ---------------------------------------------------
// 1. Primitive Type Assertion: Create an unknown variable containing a string. Use type assertion to treat it as a string and convert it to uppercase.

let a: unknown = 'Ben10'
let b: string = a as string
console.log(b.toUpperCase());

// ---------------------------------------------------
// 2. Type Assertion vs Conversion: Create an unknown variable containing "250". Perform both type assertion and type conversion to a number. Print their values and runtime types.

let num:unknown = '250'

let numCopy:number = num as number
console.log('numCopy:', numCopy, typeof numCopy) // Type asertion - numCopy: 250 string

let numChange: number = Number(num)
console.log('numChange:', numChange, typeof numChange); // Type conversion - numChange: 250 number

// ---------------------------------------------------
// 3. Object Type Assertion: Create an interface called Student with name, age, and marks. Create an object and use type assertion to treat it as a Student.

interface Student {
    name: string
    age: number
    marks?: number[]
}

const student1 = {
    name : 'gwen tennison',
    age: 20,
    rollnum: 12
}

let studentAssertion = student1 as Student
console.log(studentAssertion.name, studentAssertion.age);

// ---------------------------------------------------
// 5. Fixing the runtime error in the given code:

let value: unknown = 100;
let result = value as number;
console.log(result.toFixed(2));