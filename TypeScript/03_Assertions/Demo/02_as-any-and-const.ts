
// Practice Question - demo
// 1. Using as any: Create an unknown variable containing a string. Use as any to access toUpperCase() and print the result.

let a: unknown = 'dextor'
let b = a as any

console.log(b.toUpperCase());

// 2. Debugging

let value: unknown = "100";
console.log((value as any).toUpperCase());

// 3. Object with as const: Create a student object with name, age, and department. Use as const and try modifying its properties.

const police = {
    name: 'doekes', 
    age: 40,
    departments:'FBI'
} as const

console.log(police.name);
// police.name = 'dextor' // error
console.log(police.name)


// 4. Array with as const: Create an array of five programming languages. Apply as const and try adding or modifying elements.

let codingLanguages = ['Java','Python','JavaScript','Php','C++'] as const
console.log(codingLanguages[0]);
// codingLanguages[1] = 'Cobra' // error

// 5. Department Management: Create a departments object using as const. Extract its keys using keyof typeof and create a function that accepts only valid department keys.

const departments = {
    BCA: "Bachelor of Computer Application",
    BCOM: "Bachelor of Commerce",
    BBA: "Bachelor of Business Administration"
} as const;

type keyofDepartments = keyof typeof departments
type DepartmentValues = typeof departments[keyofDepartments]

function getDepartment(key: keyofDepartments): DepartmentValues {
    return departments[key];
}

console.log(getDepartment("BCA"));

// Error: Invalid department key
// getDepartment("MBA");
