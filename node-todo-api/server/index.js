import path from 'path';
import express from 'express';
import logger from 'morgan';
import http from 'http';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import responseTime from 'response-time';
import bodyParser from 'body-parser';
import Config from './config/server.config';
/*
 * Set express app:
 */
const app = express();
/*
 * CONFIG EXPRESS GLOBALS:
 */
// looger config:
app.use(logger(Config.LOGGER_TYPE));
// set public path:
app.use(express.static(Config.PUBLIC_PATH));
// set up helmet:
app.use(helmet());
// cookie parser:
app.use(cookieParser());
// set up response time:
app.use(responseTime());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
/*
 * CUSTOM MIDDLEWARE:
 */
/*
 * START SERVER:
 */
http.createServer(app).listen(Config.PORT, () => {
    console.log(`Server is running on: ${Config.PORT}`)
});