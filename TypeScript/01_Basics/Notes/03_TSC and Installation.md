# TSC - The TypeScript Compiler

```js
npm install -g typescript
```
This command installs the TypeScript compiler (tsc) globally

You need the TypeScript compiler to:
1. Check your TypeScript code for type errors.
2. Convert .ts files into .js files.

you can then use 'tsc' to compile any ts file
```
tsc hello.ts
```
---

### Code Demonstration

1. Create a file named hello.ts
```ts
// hello.ts
let username: string = "Prithvi";
let age: number = 21;

function greet(name: string): void {
    console.log(`Hello, ${name}!`);
}

greet(username);
console.log(age);
```

2. compile this file using tsc
```bash
tsc hello.js
```

3. Check your directory and you'll now see two files:

|Files||
| --- | ---|
| hello.ts | TypeScript |
| hello.js | Generated output |

4. The generated JavaScript (hello.js) contains: 
```js
var username = "Prithvi";
var age = 21;

function greet(name) {
    console.log(`Hello, ${name}!`);
}

greet(username);
console.log(age);
```

> In our current directory, we’ll see a hello.js file next to hello.ts. That’s the output from our hello.ts file after tsc compiles or transforms it into a plain JavaScript file. And if we check the contents, we’ll see what TypeScript spits out after it processes a .ts file:

# ts-node

ts-node allows you to execute TypeScript files directly without manually compiling them into JavaScript first.

It handles the TypeScript execution process for you.

| without ts-node | with ts-node |
| --- | --- |
| tsc hello.ts | ts-node hello.ts |
| node hello.js | |

### Installation:

```bash
npm install -g typescript
npm install -g ts-node
```

# Project Vise Installation

### Checkout 03_Demo for folder structure : [[CLICK HERE]](../../01_Basics/03_Demo/tsconfig.json)

> *Step 1: Initialize npm*
```bash
npm init -y
```

This creates a __package.json__ file.

> *Step 2: Intall typescript locally*
```bash
npm install -D typescript
```

-D means --save-dev ; generally needed during development to check and compile your code

> *Step 3: create tsconfig.json*
```bash
npx tsc --init
```

This creates a __tsconfig.json__ file.


> *Step 4: organize your project*

Create a [ *src* ] and [ *dist* ] folder inside it.

```bash
typescript-project/
│
├── node_modules/
├── src/
│   └── index.ts
│
├── package.json
├── package-lock.json
└── tsconfig.json

```
> *Step 5: configure tsconfig.json*

```json
{
  "compilerOptions": {

    "rootDir": "./src", // <--
    "outDir": "./dist", // <--

    "target": "ES2020",
    "module": "CommonJS",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "noEmitOnError": true
  }
}
```


### You can also create your custom commands in *package.json*

```json
{
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "start": "node dist/index.js"
  }
}
```

If you want to use ts-node to run TypeScript directly

1. Install ts-node locally
```bash
npm install -D typescript ts-node
```

2. Update package.json
```json
{
  "scripts": {
    "start": "ts-node src/index.ts",
    "dev": "ts-node --watch src/index.ts"
  }
}
```

# Compiler Options

In TypeScript, compiler options are settings that tell the TypeScript compiler (tsc) how to compile your .ts files into JavaScript.

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "noEmitOnError": true
  }
}
```

### Common compiler options

Option | What it does |
--- | ---|
target	| Specifies which JavaScript version to generate.
module	| Determines the module system used in the generated JavaScript.
rootDir	| Specifies the folder containing your TypeScript source files.
outDir	| Specifies where compiled JavaScript files should be stored.
strict	| Enables stricter type checking.
esModuleInterop	| Improves compatibility when importing CommonJS modules.
skipLibCheck	|Skips type checking of declaration files (.d.ts).
noEmitOnError	| Prevents JavaScript output if TypeScript encounters errors.

- In depth Article : [[Docs]](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
- For better understanding you can checkout typescript playground and check the options visually : [[LINK]](https://www.typescriptlang.org/play/)