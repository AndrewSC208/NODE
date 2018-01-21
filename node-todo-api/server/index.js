import path from 'path';
import express from 'express';
import logger from 'morgan';
import http from 'http';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import responseTime from 'response-time';
import bodyParser from 'body-parser';
import mongoose from './config/mongoose';

import Config from './config/server';
import { Todo } from './api/todo';
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
 * ROUTES:
 */
/*
    TODO: MOVE THESE TO ROUTES
*/
// create todo:
app.post('/todos', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });

    todo.save().then((data) => {
        res.send(data);
    }, (e) => {
        res.status(400).send(e);
    });
});
// get all todos:
app.get('/todos', (req, res) => {
    Todo.find().then((data) => {
        res.send({
            data
        });
    }, (e) => {
        res.status(400).send(e);
    })
});
// mogoose quries:

/*
 * START SERVER:
 */
http.createServer(app).listen(Config.PORT, () => {
    console.log(`Server is running on: ${Config.PORT}`)
});

export default {
    app
};