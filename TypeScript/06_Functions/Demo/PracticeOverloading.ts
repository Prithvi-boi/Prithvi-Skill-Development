/*------------------------------------------------------------
1. Create an overloaded function called add() that accepts:
    Two numbers and returns their sum.
    Two strings and returns their concatenation.
*/

function add(a:string, b:string): string;
function add(a:number, b:number): number;

function add(a:string | number, b:string | number) {
    if (typeof a === 'string' && typeof b === 'string') {
        return `${a}${b}`
    }

    else if (typeof a === 'number' && typeof b === 'number'){
        return a+b
    }

    throw new Error('Invalid arguments')
}

/*------------------------------------------------------------
2. Create an overloaded function called getLength() that accepts:
    A string and returns its length.
    An array of numbers and returns its length.
*/

function getLength(value:string): number 
function getLength(value:number[]): number 

function getLength(value:string | number[]) {
    if (typeof value === 'string') {
        return value.length
    }else if(value instanceof Array){
        return value.length
    }
}

console.log(getLength('Prithvi'), typeof getLength('Prithvi')); // 7 number
console.log(getLength([1,2,4,521,12]), typeof getLength([1,2,4,521,12])); // 5 number

/*------------------------------------------------------------
3. Create an overloaded function called formatValue() that accepts:
    A number and returns a formatted string.
    A string and returns it in uppercase.
*/

function formatValue(value:string): string
function formatValue(value:number): string


function formatValue(value:string | number) {
    if (typeof value === 'string') {
        return value.toUpperCase()
    }

    else if (typeof value === 'number'){
        return `Number is ${value}`
    }
}

/*------------------------------------------------------------
4. Create an overloaded function called getStudent() that accepts:
    A roll number.
    A student name.
*/

interface studentType {
    rollnum: number
    name: string
}

const STUDENT: studentType = {
    rollnum: 2505,
    name: 'Prithvi'
}

function getStudent(student:string): string;
function getStudent(student:number): number;

function getStudent(student:string | number) {
    if (typeof student === 'string') {
        return STUDENT.name
    }

    if (typeof student === 'number') {
        return STUDENT.rollnum
    }
}

console.log(getStudent('name'));
console.log(getStudent(1));
