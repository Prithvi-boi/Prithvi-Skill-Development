
function logValue(value: string | number) {
    if (typeof value === "string") {
        console.log(value.toUpperCase());
    }
    else {
        console.log(value.toFixed(2));
    }
}

logValue('hello')
logValue(100.2312)