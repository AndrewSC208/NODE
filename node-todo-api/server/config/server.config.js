/*
 * SERVER CONFIGURATION
 */
import path from 'path';

const Config = {
    PORT: process.env.PORT || 9001,
    LOGGER_TYPE: 'short',
    PUBLIC_PATH: path.resolve(__dirname, './public'),
    mongo: {
        MONGO_URL: 'localhost',
        MONGO_PORT: 27017,
    }
}

export default Config;