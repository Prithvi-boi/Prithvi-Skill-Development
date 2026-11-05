
/*-------------------------------
## 1. Class
Create a `Car` class with `brand`, `model`, and `year` properties.
*/

class Car{
    brand: string
    model: string
    year: number
    
    constructor(brand: string,model:string,year:number){
        this.brand = brand
        this.model = model
        this.year = year
    }
}

/*-------------------------------
## 2. Creating Objects
Create two objects from the `Car` class and assign different values to each.
*/

let car1 = new Car('porche','60s',1998)
let car2 = new Car('mustang gt','sepang',2015)

/*-------------------------------
## 3. Constructor
Create a `Book` class with a constructor that initializes `title` and `author`.
*/

class Book{
    constructor(
        public title:string,
        public author:string
    ){}
}

/*-------------------------------
## 4. Constructor Parameters
Create a `Student` class that accepts `name`, `age`, and `rollNumber` through its constructor.
*/

class Student{
    constructor(
        public name:string,
        public age:number,
        public rollNumber:number
    ){}
}

let s = new Student('Prithvi',20,2505)