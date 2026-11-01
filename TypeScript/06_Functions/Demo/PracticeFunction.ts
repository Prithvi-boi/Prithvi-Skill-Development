//--------------------------------------------------------------------------
// 1. Create a function that accepts two numbers and returns their sum.

function sum(num1:number, num2:number):number {
    return num1 + num2
}

console.log(sum(1,1))

//--------------------------------------------------------------------------
// 2. Create a function with an optional `age` parameter.

function canVote(age?:number):boolean | string {
    if (age) {
        if (age >= 18) {
            return true
        }else{
            return false
        }
    }
    return 'age not provided'
}
console.log(canVote());
console.log(canVote(19));

//--------------------------------------------------------------------------
// 3. Create a function with a default `department` parameter.

function assignDepartment(department:string = 'BCA') {
    if (department === 'BCOM') {
        return 'BCOM'
    }else{
        return department
    }
}
let student1 = assignDepartment()
let student2 = assignDepartment('BCOM')
console.log(`student1: ${student1}, student2: ${student2}`);

//--------------------------------------------------------------------------
// 4. Create a function that accepts multiple marks using rest parameters and calculates their average.

function CalculateAvgMarks(...marks:number[]): number {
    let total = 0
    for (let i = 0; i < marks.length; i++) {
        const score = marks[i];
        total += score
    }
    let AvgMark = total / marks.length
    return Number(AvgMark.toFixed(3))
}

console.log(CalculateAvgMarks(98,98,99));

//--------------------------------------------------------------------------
// 5. Create a reusable function type using a type alias.

type getUserFunctype = (name:string, Id:number) => void;

let getUser: getUserFunctype = (name, Id) => {
    console.log("name:"+ name)
    console.log('ID:' + Id)
}

getUser('Prithvi',13)

//--------------------------------------------------------------------------
// 6. Create a function that accepts a `Student` object and displays its details.

const students = {
    Id:2505,
    name: 'Prithvi Beldar',
    course: 'BCA',
    year: 2
}

function displayStudent(studentObj:object):void {
    Object.entries(studentObj).forEach((student)=> {
        console.log(student[0], ' ' , student[1])
    })
}

console.log(displayStudent(students));

//--------------------------------------------------------------------------
// 7. Create an array of numbers and use an arrow function with map() to return their squares.

let numArry = [5,2,9,4,1,8,7,6,3,0]

let numArowFunction = (numAry: number[], target:number) => {
    return numAry.map((elmt, i:number) => {
        if (elmt === target) {            
            return i
        }
    })
}

console.log(numArowFunction(numArry,3))