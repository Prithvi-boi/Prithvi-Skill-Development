
// Question 1

function describe(value:string | number): string {
    if (typeof value === 'string') {
        return value.toUpperCase()
    }
    return value.toFixed(2)
}

console.log(describe('hello'));
console.log(describe(42));

// Question 2

function formatValue(value:string | number | boolean | null | undefined): string {
    if (typeof value === 'string') {
        return value.trim().toUpperCase()
    }
    else if (typeof value === 'number'){
        return value.toFixed(2)
    }
    else if(typeof value === 'boolean'){
        if (value) {
            return 'Yes'
        }
        return 'No'
    }
    else if (typeof value === 'undefined'){
        return 'Nothing (undefined)'
    }

    return 'Nothing (null)'
}

console.log(formatValue('Prithvi boi '));
console.log(formatValue(9823));
console.log(formatValue(false));
console.log(formatValue(undefined));
console.log(formatValue(null));
