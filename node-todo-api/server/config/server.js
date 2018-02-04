/*
 * SERVER CONFIGURATION
 */
import path from 'path';
import config from './config.json';

const env = process.env.NODE_ENV || 'development';

if(env === 'development' || env === 'test') {
    const envConfig = config[env];

    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key];
    });
}

const Config = {
    PORT: process.env.PORT || 4112,
    LOGGER_TYPE: 'short',
    PUBLIC_PATH: path.resolve(__dirname, './public'),
    DB: {
        MONGO_URL: process.env.MONGO_URL || 'localhost',
        MONGO_PORT: process.env.MONGO_PORT || 27017,
        MONGO_DB_NAME: process.env.MONGO_DB_NAME || 'App',
        MONGO_LINK: process.env.MONGO_LINK || 'mongo',
        MONGOOSE_CONNECTION_STRING: `mongodb://mongo:27017/TodoApp`,
    }
}

export default Config;