class Student {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    introduce(): void {
        console.log(`Hi, I am ${this.name} and I am ${this.age} years old.`);
    }
}

const student1 = new Student("Prithvi", 20);
const student2 = new Student("Vicky", 19);

student1.introduce();
student2.introduce();
