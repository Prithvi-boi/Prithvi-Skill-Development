
// Arrays
let names:string[] = ['Prithvi','Prachi','Vicky','Abhay','Goku']
let numbers:number[] = [7, 10, 3, 13]

let dragonBall: Array<string> = ['Kakarot','vegeta','picolo','bulma']

// Multiple types
let values: (string | number)[] = [10,'10',9,'9','...']

let minecraft: readonly string[] = ["steve", "alex", "jeb"];
// let minecraft: ReadonlyArray<number> = ["steve", "alex", "jeb"];

// minecraft.push("Sam"); // Error
// minecraft[0] = "Peter"; // Error


let matrix: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];