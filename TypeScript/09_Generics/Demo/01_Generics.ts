function getValue<Type>(value: Type): Type {
    return value
}

console.log(getValue<number>(10));
console.log(getValue<string>("10"));

// -------------------------

function getFirstElement<T>(arr: T[]): T {
    return arr[0];
}

const firstNumber = getFirstElement([10, 20, 30]);
const firstName = getFirstElement(["Prithvi", "Rahul", "Amit"]);

// -------------------------

function displayElements<T>(arr: T[]): void {
    arr.forEach((element) => {
        console.log(element);
    });
}

displayElements<number>([10, 20, 30]);
displayElements<string>(["React", "Node", "TypeScript"]);

// ----------------------- multiple types

function pair<T, U>(first: T, second: U): [T, U] {
    return [first, second];
}

const result1 = pair<string, number>("Age", 20);
const result2 = pair<boolean, string>(true, "Active");

//-------------------- Practice Demo
/*------------------------------------
1. Identity Function
Create a generic identity() function that accepts and returns the same type of value.
*/

function identity<T>(value:T) {
    return typeof value
}

console.log(identity('10'))
console.log(identity(['10','20']))

/*------------------------------------
2. Generic Array Function
Create a generic function that accepts an array and returns its last element.
*/

function getLastElement<T>(arry:T[]):T {
    return arry[arry.length - 1]
}

console.log(getLastElement([10,20,30,40]));

/*------------------------------------
3. Multiple Type Parameters
Create a generic combine() function that accepts a string and a number and returns them as a tuple.
*/

function combine<T1,T2>(a:T1, b:T2):[T1,T2] {
    return [a,b]
}

console.log(combine('A',10))
console.log(combine<boolean, string>(true, "Active"))

/*------------------------------------
4. Generic Interface
Create a generic Box<T> interface with a value property. Use it with strings and numbers.
*/

interface Box<T>{
    value: T
}

let numBox:Box<number> = {value:20}
let stringBox:Box<string> = {value:"20"}

/*------------------------------------
5. Generic Class
Create a generic DataStorage<T> class with add(), remove(), and getAll() methods.
*/

class DataStorage<T>{
    storage: T[] = []
    add(a: T){
        this.storage.push(a)
    }

    remove(target:T){
        this.storage.forEach((val,i)=>{
            if (val === target) {
                this.storage.splice(i,1)
            }
        })
    }

    getAll():T[]{
        return this.storage
    }
}

let a = new DataStorage<number>()
a.add(10) 
a.add(20) 
a.add(30)

console.log(a.getAll());
a.remove(20)
console.log(a.getAll());

