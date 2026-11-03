
//  Practice Questions demo

/*----------------------------------------------------------
- Q1. Employee Details : Concept: Basic Interface
Create an Employee interface with id, name, salary, and department. Create an employee object and display its details.
*/

interface Employee {
    id: number
    name: string
    salary: number
    department: 'Assassin' | 'Continental'
}

const emp1: Employee = {
    id: 700,
    name: 'John Wick',
    salary: 100000,
    department: 'Assassin'
}

/*----------------------------------------------------------
- Q2. User Profile : Concept: Optional Properties (?)
Create a User interface with username, email, and an optional phoneNumber. Create two users, one with a phone number and one without.
*/

interface User {
    username: string
    email: string
    phoneNumber?: number
}

const user1: User = {
    username: 'Lucifer',
    email: 'devil@gmail.com',
    phoneNumber: 666
}

const user2: User = {
    username: 'jesus',
    email: 'god@gmail.com',
}

/*----------------------------------------------------------
- Q3. Bank Account : Concept: Readonly Properties
Create a BankAccount interface with a readonly accountNumber, holderName, and balance. Try modifying each property and observe the errors.
*/

interface BankAccount {
    readonly accountNumber: number
    holderName: string
    balance: number
}

let bankUser: BankAccount = {
    accountNumber: 123456,
    holderName: 'Ambani',
    balance: 100
}

bankUser.holderName = 'Prithvi'
// bankUser.accountNumber = 333333 // Error

/*----------------------------------------------------------
- Q4. Basic Calculator Concept: Interfaces with Functions
Create a Calculator interface containing add, subtract, multiply, and divide methods. Implement all four operations.
*/

interface Calculator {
    add: (a: number, b: number) => number
    subtract: (a: number, b: number) => number
    multiply: (a: number, b: number) => number
    divide: (a: number, b: number) => number
}

const myCalculator: Calculator = {
    add: (a, b) => {
        return a + b
    },
    subtract: (a, b) => {
        return a - b
    },
    multiply: (a, b) => {
        return a * b
    },
    divide: (a, b) => {
        return a / b
    },
}


// console.log(myCalculator.add(1,2))
// console.log(myCalculator.subtract(1,2))
// console.log(myCalculator.multiply(2,2))
// console.log(myCalculator.divide(100,2))

/*----------------------------------------------------------
- Q5. Library Management Concept: Interfaces with Arrays
Create a Book interface with id, title, author, and isAvailable. Create an array of books and filter out the available books.
*/

interface Book {
    id: number
    title: string
    author: string
    isAvailable: boolean
}

const arryofBooks: Book[] = [
    {
        id: 1,
        title: 'Dragon ball',
        author: 'Akira toriyama',
        isAvailable: true
    },
    {
        id: 2,
        title: 'the amazing spiderman',
        author: 'stan lee',
        isAvailable: false
    },
]

/*----------------------------------------------------------
- Q6. Person and Teacher Concept: Extending Interfaces
Create a Person interface and extend it using a Teacher interface. Add subject and salary to Teacher. Create a teacher object.
*/

interface Person {
    name: string,
    age: number
}

interface teacher extends Person {
    deparment: 'BCA' | 'BBA'
}

const sachinSir: teacher = {
    name: 'Sachin',
    age: 60,
    deparment: 'BCA'
}

/*----------------------------------------------------------
- Q7. Interface Declaration Merging : Concept: Declaration Merging
Declare an interface named Product twice. Add id and name in the first declaration, then price and category in the second. Create an object using the merged interface.
*/

interface Product {
    id: number
    name: string
}

interface Product {
    price: number
    category: 'Food' | 'Drink'
}

let product: Product = {
    id: 20,
    name: 'Coka cola',
    price: 100,
    category: 'Drink'
}

/*----------------------------------------------------------
- Q8. Dynamic Configuration : Concept: Index Signatures
Create a Configuration interface that accepts any string property name but only allows string or boolean values. Create a configuration object.
*/

interface Configuration{
    [something: string] : string | boolean
}

let myName: Configuration = {
    name: 'Prithvi'
}

let successful: Configuration = {
    answer: false
}

// Error
// let myage: Configuration = {
//     age: 20
// }

/*----------------------------------------------------------
- Q9. Multiple Interface Inheritance: Concept: Extending Multiple Interfaces
Create PersonalInfo and AcademicInfo interfaces. Extend both using a CollegeStudent interface and create a student object.
*/

interface PersonalInfo{
    name: string
    age:number
}

interface AcademicInfo{
    marks: number[]
}

interface CollegeStudent extends AcademicInfo, PersonalInfo{
    course: 'BCA' | 'BTECH'
}

let mystudent: CollegeStudent = {
    name: 'Gohan',
    age:19,
    marks: [99,99,99],
    course: 'BCA'
}