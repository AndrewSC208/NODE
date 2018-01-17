const fs = require('fs');

const fetchNotes = () => {
    try {
        let notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch (e) {
        return [];
    }
};

const saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

const addNote = (title, body) => {
    let notes = fetchNotes();
    let note = {
        title,
        body
    }

    let dupNotes = notes.filter(note => note.title === title);

    if(dupNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
}

const getAll = () => {
    return fetchNotes();
}

const getNote = (title) => {
    let list = fetchNotes();
    let item = list.filter(note => note.title === title);

    if(item.length === 1) {
        return item[0]
    } else {
        return false;
    }
}

const removeNote = (title) => {
    let list = fetchNotes();
    let filteredList = list.filter(note => note.title !== title)

    saveNotes(filteredList);

    return list.length !== filteredList.length;
}

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote
}