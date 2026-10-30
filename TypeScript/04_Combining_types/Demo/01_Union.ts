
// Param can be either number or string
function printId(id: number | string) {
  console.log("Your ID is: " + id);
}
// OK
printId(101);
// OK
printId("202");
// Error
// printId({ myID: 22342 });

// -------------------------------

function printSomething(id: number | string) {
//   console.log(id.toUpperCase()); // This will throw an error as number does not contain toUpperCase method but string does.
// So typescript is scared like what if the someone pass a number

    // Type Narrowing
    // Here we explicitly check that if string comes what to do so typescript automatically handle infer the type and method of number (we also don't have to write the condition for number)
    if (typeof id === "string") {
        console.log(id.toUpperCase())
    }else{
        console.log(id.toFixed(2))
    }
}

// Type Narrowing for array

function welcomePeople(x: string[] | string) {
  if (Array.isArray(x)) {
    // Here: 'x' is 'string[]'
    console.log("Hello, " + x.join(" and "));
  } else {
    // Here: 'x' is 'string'
    console.log("Welcome lone traveler " + x);
  }
}

// But some methods are used by two different datatypes like slice
// Return type is inferred as number[] | string
function getFirstThree(x: number[] | string) {
  return x.slice(0, 3);
}

// well Although this is safe, Always checking before doing operation is a good practice 