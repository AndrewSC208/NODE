import mongoose from 'mongoose';

mongoose.PromiseProvider = global.Promise;
mongoose.connect('mongodb://mongo:27017/TodoApp');

export default mongoose;