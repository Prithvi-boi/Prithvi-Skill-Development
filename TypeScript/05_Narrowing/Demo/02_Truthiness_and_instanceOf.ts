
// Narrowing using truthiness
function LogUser(user:string | undefined) {
    if (user) {
        console.log('User name is ' + user.toUpperCase())
    }
    console.log(`user is undefined`)
}

class Car{
    constructor(public brand: string){}
}
class house{
    constructor(public plot: number){}
}

let supercar = new Car('Toyota')
let home = new house(98)

function logSomething(something:Car | house) {
    if (something instanceof Car) {
        console.log(something.brand);
    }
    if (something instanceof house) {
        console.log(something.plot)
    }
}