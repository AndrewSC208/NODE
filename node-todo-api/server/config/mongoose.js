import mongoose from 'mongoose';
import Config from './server';

mongoose.PromiseProvider = global.Promise;
mongoose.connect(Config.DB.MONGOOSE_CONNECTION_STRING);

export default mongoose;