/*
ARROW FUNCTIONs


*/
// expression format:
let square = x => x * x;
console.log(square(9));

let user = {
    name: 'Andrew',
    sayHi: () => {
        console.log(`Hi. I'm ${this.name}`);
    },
    sayHiAlt () {
        // normal functions get args, and the this binding to the object
        console.log(arguments);
        console.log(`Hi. I'm ${this.name}`);
    }
}

user.sayHi();
user.sayHiAlt();