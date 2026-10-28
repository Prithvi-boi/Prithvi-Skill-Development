
// ------- Tuple ------------
// Must specify the type of each element in order.

let user: [string, number] = ["Prithvi", 21]; 
// let user: [number, string] = ["Prithvi", 21]; // error

console.log(user[0]) // 'Prithvi'

// Optional Tuple Elements
type User = [string, number, boolean?];

let user1: User = ["Prithvi",12,false];

let user2: User = ["John", 25, true];

// Spread Operator
type UserData = [string, ...number[]];
let user3: UserData = ['Prachi',1]
let user4: UserData = ['Prachi',1,2,34]
