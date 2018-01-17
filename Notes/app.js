// fileSystem module
const fs    = require('fs');
// This is a good util lib
const _     = require('lodash');
// yargs: for environment vars:
const yargs = require('yargs');
// first app module:
const notes   = require('./notes');

// getting input from the cmd/user:
/*
 * ADVANCED CONFIG OF ARGS
 */
const title = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
}

const body = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
}

const argv = yargs
    .command('add', 'Add a new note', { title, body })
    .command('list', 'list all notes')
    .command('read', 'read a note', { title })
    .command('remove', 'remove a note', { title })
    .help()
    .argv;

const command = argv._[0];
// RESPOND TO USER INPUT
// const argv = process.argv;
// const command = process.argv[2];
// console.log('COMMAND: ', command);
// console.log('PROCESS: ', argv);
/*
 * SWITCH BLOCK ON COMMAND
 *  -> I can see this being used for different environments, or a way to pass in environment vars to the app
 *  -> Also, could tell the program what kind of software to build
 */
switch(command) {
    /*
     * CMD->$ node app.js add -t="New Title" -b="This is a new body of notes"
     */
    case 'add':
        const newNote = notes.addNote(argv.title, argv.body);
        newNote ? console.log(`Saved: ${newNote.title}`) : console.log('Duplicate note, please rename the title')
        break;
    case 'list':
        const allNotes = notes.getAll();
        console.log(`Notes found: ${allNotes.length}`);
        for(let i = 0; i < allNotes.length; i++) {
            console.log(`${i+1}. ${allNotes[i].title} - ${allNotes[i].body}`);
        }
        break;
    case 'read':
        const note = notes.getNote(argv.title);
        note ? console.log(`Found note: ${note}`) : console.log('Note not found');
        break;
    case 'remove':
        const remove = notes.removeNote(argv.title);
        remove ? console.log('Note removed') : console.log('Error could not remove note');
        break;
    default:
        console.log('Command not recognized, power down!');
}