import path from 'path';
import express from 'express';
import logger from 'morgan';
import http from 'http';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import responseTime from 'response-time';
import bodyParser from 'body-parser';
/*
 *  CONFIG OBJECT
 */
import mongoose from './config/mongoose';
import Config from './config/server';
/*
 *  API
 */
import Api from './api'
/*
 * START EXPRESS:
 */
const app = express();
/*
 * CONFIG EXPRESS GLOBALS & MIDDLEWARE:
 */
app.use(express.static(Config.PUBLIC_PATH));
app.use(logger(Config.LOGGER_TYPE));
app.use(helmet());
app.use(cookieParser());
app.use(responseTime());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
/*
 * API ROUTES
 */
app.use('/api', Api);
/*
 * VIEW ROUTES -> Setup HBS to render index.html that will hold react app
 */
//app.use('/', index,);
/*
 * START SERVER:
 */
http.createServer(app).listen(Config.PORT, () => {
    console.log(`Server is running on: ${Config.PORT}`)
});

export default app;