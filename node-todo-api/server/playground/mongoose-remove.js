import { ObjectId } from 'mongodb';
import mongoose from '../config/mongoose';
import Todo from '../api/todo';
import User from '../api/user';

Todo.remove({}).then((res) => {
    console.log(res);
}, e => console.log(e));

//Todo.findOneAndRemove()
//Todo.findByIdAndRemove()

Todo.findOneByIdAndRemove({ _id: 'sdfsdfdsf'}).then((todo) => {
    console.log(todo);
}, e => console.log(e));

Todo.findByIdAndRemove('asdf').then((res) => {
    console.log(res)
}, e => console.log(e));