
type Name = {
    name: string
}

type fullName = {
    name: string,
    middleName: string,
    lastName: string
}

let person_union : Name | fullName = {
    name : 'Prithvi'
}

// Insection says that you must satisfy all the properties from the types. there is no either
let person_intersection: Name & fullName = {
    name : 'Prithvi',
    middleName: 'Rajkumar',
    lastName: 'Beldar'
}