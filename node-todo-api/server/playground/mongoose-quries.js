import { ObjectId } from 'mongodb';
import mongoose from '../config/mongoose';
import Todo from '../api/todo';
import User from '../api/user';

let id = '5a6403561a8b0a05f0b90fe8';

if(!ObjectId.isValid(id)) {
    console.log('ID not valid');
};

// get an array of todo's
Todo.find({
    text: 'Something'
}).then((todos) => {
    console.log(todos);
});

// get back one todo:
Todo.findOne({
    _id: id
}).then((todo) => {
    console.log(todo);
});

// get one doc by id:
Todo.findById(id).then((todo) => {
    if(!todo) {
        return console.log('id not found');
    }
    console.log(todo);
}).catch((e) => console.log(e));

// Find user by id:
User.findById(id).then((user) => {
    if(!user) {
        return console.log('User not found');
    }
    console.log(user);
}).catch(e => console.log(e));