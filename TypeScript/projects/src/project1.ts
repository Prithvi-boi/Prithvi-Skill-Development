// Project 1 - Student Management System

/* 
A program where you can manage students:
    1. Add a student.
    2. View all students.
    3. Search for a student by ID.
    4. Update student details.
    5. Delete a student.
    6. Calculate the average marks of a student.
*/

const promptSync = require("prompt-sync");
const input = promptSync();
//--------------------------------------------

enum Deparments {
    BCA = 'Bachelor of Computer Application (BCA)',
    BCOM = 'Bachelor of Commerce (BCOM)',
    BBA = 'Bachelor of Arts (BBA)'
}

type StudentStatus = 'Active' | 'InActive'
type StudentKeys = keyof Student

interface Student {
    rollnum: number,
    name: string,
    department: string,
    age: number,
    marks: number[],
    status: StudentStatus
}

let students: Student[] = [
    {
        rollnum: 10,
        name: 'Prithvi',
        department: Deparments.BCA,
        age: 20,
        marks: [93, 70],
        status: 'Active'
    },
    {
        rollnum: 11,
        name: 'Vicky',
        department: Deparments.BCOM,
        age: 19,
        marks: [60, 40],
        status: 'Active'
    },
]

// ----------------- Program: 

function Add_Student(): void {
    console.log('--- Enter Student Details ---')
    const name: string = input('Name: ')
    const rollnum: number = Number(input('Roll number: '))
    const age: number = Number(input('Age: '))

    let department!: string;
    while (true) {
        console.log('--------------\nID | Department\n--------------')
        Object.keys(Deparments).forEach((key, i) => {
            console.log(` ${i + 1} | ${key}`)
        });
        let dpId = Number(input('--> Choose Deparment (by ID):'))

        Object.values(Deparments).forEach((value, i) => {
            if (i + 1 === dpId) { department = value }
        });

        if (department !== undefined) {
            break
        } else {
            console.log('\n[!] ERROR: Enter a Valid ID\n')
        };
    }


    let marks: number[] = []
    for (let i = 0; i < 2; i++) {
        let score = Number(input(`Enter Score of Subject (${i + 1}):`))
        if (score > 0 && score <= 100) marks.push(score)
        else { console.log('\n[!] ERROR: Score must be between 0 to 100\n'); i -= 1; }
    }

    students.push({
        rollnum: rollnum,
        name: name,
        department: department,
        age: age,
        marks: marks,
        status: 'Active'
    })
}

function View_All_Students(): void {
    console.log('sr. | Roll number | Name | Age | Deparment | Marks | Status |')
    console.log('---'.repeat(20))
    for (let i = 0; i < students.length; i++) {
        const student: any = students[i];
        process.stdout.write(` ${i + 1} `)
        Object.values(student).forEach((val) => {
            process.stdout.write(' | ')
            process.stdout.write(`${val}` + ` `.repeat(2))
        })
        console.log('')
    }
}

function Search_Student(target: number): void {
    for (let i = 0; i < students.length; i++) {
        const student = students[i];
        if (student?.rollnum == target) {
            console.log('Student founded! : ' + `${student.name}`)
            return
        }
    }
    console.log('Student not found')
}

function Update_Student(
    target: number,
    key: string,
): void {
    for (let i = 0; i < students.length; i++) {
        const student = students[i];
        if (student?.rollnum == target) {
            let val: unknown;
            switch (key) {
                case 'rollnum':
                    student.rollnum = Number(input('Enter new Roll number: '))
                    break;

                case 'name':
                    student.name = input('Enter new name: ')
                    break;

                case 'age':
                    student.age = Number(input('Enter new age: '))
                    break;

                case 'department':
                    Object.keys(Deparments).forEach((key,i) => {
                        console.log(`${i}. ${key}`)
                    })
                    let department = Number(input('select department: '))
                    Object.keys(Deparments).forEach((key,i) => {
                        if (i === department) {
                            student.department = key
                        }
                    })
                    break;

                case 'status':
                    if (student.status == 'Active') {
                        console.log("Status set to 'Inactive' ")
                        student.status = 'InActive'
                    }else{
                        console.log("Status set to 'Active' ")
                        student.status = 'Active'
                    }
                    break;

                case 'marks':
                    student.marks.forEach((val,i) => {
                        student.marks[i] = Number(input(`Enter new marks for subject (${i})`))
                    })
                    break;
            
                default:
                    break;
            }
            console.log(student)
            return
        }
    }
    console.log('Student not found')
}

function Delete_Student(target: number): void {
    for (let i = 0; i < students.length; i++) {
        const student = students[i];
        if (student?.rollnum == target) {
            students.splice(i, 1)
            console.log('Student has been Deleted from the records')
            return
        }
    }
    console.log('Student not found')
}

function Calculate_Avg_Marks(target: number): void {
    for (let i = 0; i < students.length; i++) {
        const student = students[i];
        if (student?.rollnum == target) {
            let total_marks = 0
            student.marks.forEach((val) => total_marks += val)
            let avg_marks = total_marks / student.marks.length
            console.log(`Average Marks of the students is ${avg_marks}`)
            return
        }
    }
    console.log('Student not found')
}


console.log('//'.repeat(40))
console.log(' '.repeat(10) + 'Student Management System using Typescript' + ' '.repeat(10))
console.log('//'.repeat(40))

while (true) {
    console.log('Select operation')
    console.log(`
    1. Add a student.
    2. View all students.
    3. Search for a student by ID.
    4. Update student details.
    5. Delete a student.
    6. Calculate the average marks of a student.
    7. Exit
    `)
    let exit = false

    const choice: number = Number(input('select:'))

    switch (choice) {
        case 1: // Add a student.
            Add_Student()
            break;

        case 2: // View all students.
            View_All_Students()
            break;

        case 3: // Search for a student by ID.
            const targetSearch: number = Number(input('Enter roll num of Student (Search): '))
            console.log('Searching...')
            Search_Student(targetSearch)
            break;

        case 4: // Update student details.
            const targetStudent: number = Number(input('Enter roll num of Student (update): '))
            console.log(' -- Select Key -- ')
            console.log(`
    1. rollnum
    2. name
    3. department
    4. age
    5. marks
    6. status
            `)
            const key: string = input('Enter Key name: ')

            Update_Student(targetStudent,key)
            break;

        case 5: // Delete a student.
            const targetdelete: number = Number(input('Enter roll num of Student (delete): '))
            console.log('deleting...')
            Delete_Student(targetdelete)
            break;

        case 6: // Calculate the average marks of a student.
            const target: number = Number(input('Enter roll num of Student (delete): '))
            console.log('deleting...')
            Calculate_Avg_Marks(target)
            break;

        case 7: 
            exit = true
            console.log('Exiting Program...')
            break;

        default:
            console.log('Option not Available')
            break;
    }
    
    if (exit) break
}