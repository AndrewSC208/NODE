// let obj = {
//     name: 'Andrew'
// };
// let strObj = JSON.stringify(obj);
// console.log(typeof strObj);
// console.log(strObj);

// var personString = '{"name": "Andrew", "age": 30}';
// var person = JSON.parse(personString);
// console.log(typeof person)
// console.log(person);

const fs = require('fs');

let originalNote = {
    title: 'Some title',
    body: 'Some body'
}

let originalNoteString = JSON.stringify(originalNote);
fs.writeFileSync('notes.json', originalNoteString);

let noteString = fs.readFileSync('notes.json');
let note = JSON.parse(noteString);
console.log(typeof note);
console.log(note);