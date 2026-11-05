
/*--------------------------------------------------------
## 1. Animal System
Create an abstract `Animal` class with an abstract `makeSound()` method. Implement it in `Dog` and `Cat` classes.
*/

abstract class Animal{
    abstract makeSound(): void
}

class Dog extends Animal{
    makeSound(): void {
        console.log('Bow Bow')
    }
}

class Cat extends Animal{
    makeSound(): void {
        console.log('meooooowwwww....')
    }
}

/*--------------------------------------------------------
## 2. Employee Management
Create an abstract `Employee` class with `name`, `salary`, and an abstract `calculateBonus()` method. Implement it in `Developer` and `Manager`.
*/

abstract class Employee{
    constructor(
        public name:string,
        public salary:number[]
    ){}

    abstract calculateBonus():number
}

class Developer extends Employee{
    skills: string[]
    constructor(name:string, salary:number[],skills:string[]){
        super(name,salary)
        this.skills = skills
    }

    private total: number = 0
    calculateBonus(): number {
        for (let i = 0; i < this.salary.length; i++) {
            const val = this.salary[i];
            this.total += val
        }
        return this.total
    }
}

let Dev = new Developer('me',[2300,4000,5000],['Html','css','js'])
console.log();
