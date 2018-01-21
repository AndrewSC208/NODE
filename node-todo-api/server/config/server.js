/*
 * SERVER CONFIGURATION
 */
import path from 'path';

const Config = {
    PORT: process.env.PORT || 4112,
    LOGGER_TYPE: 'short',
    PUBLIC_PATH: path.resolve(__dirname, './public'),
    DB: {
        MONGO_URL: 'localhost',
        MONGO_PORT: 27017,
    }
}

export default Config;