import path from 'path';
import express from 'express';
import logger from 'morgan';
import http from 'http';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import responseTime from 'response-time';
import bodyParser from 'body-parser';
import mongoose from './config/mongoose';
import { ObjectId } from 'mongodb';
import _ from 'lodash';

import Config from './config/server';
import { Todo } from './api/todo';
import { User } from './api/user';
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
// POST /todos
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

// GET all /todos
app.get('/todos', (req, res) => {
    Todo.find().then((data) => {
        res.send({
            data
        });
    }, (e) => {
        res.status(400).send(e);
    })
});

// GET /todos/:id
app.get('/todos/:id', (req, res) => {
    // id from route:
    const { id } = req.params;
    /* 
        CHALLENGE DETAILS:
      
        validate id
            if not valid: send 404 and error message
        findById
            success:
                if todo: send it back
                if no todo: send back 404 with error message
            error - res 400 and send error message
    */
    // validation:
    if (!ObjectId.isValid(id)) {
        return res.status(404).send({
            error_code: 404,
            error_msg: 'Id is not valid'
        });
    };

    // findById:
    Todo.findById(id).then((todo) => {
        if(!todo) {
            res.status(404).send({
                error_code: 404,
                error_msg: 'Todo not found'
            });
        }

        res.send({todo});
    }).catch((e) => {
        res.status(400).send({
            error_code: 404,
            error_msg: 'Todo service is down'
        });
    });
});

// DELETE /todos/:id
app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;

    if(!ObjectId.isValid(id)) {
        res.status(404).send({
            error_code: 404,
            error_msg: 'Id is not valid'
        });
    };

    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo) {
            res.status(404).send({
                error_code: 404,
                error_msg: 'Todo was not found'
            });
        }

        res.send({
            status: 'removed',
            todo
        });
    }).catch((e) => {
        res.status(400).send({
            error_code: 400,
            error_msg: 'Todo service is down'
        });
    });
});

app.patch('/todos/:id', (req, res) => {
    const { id } = req.params;
    const body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectId.isValid(id)) {
        res.status(404).send({
            error_code: 404,
            error_msg: 'Id is not valid'
        });
    };

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if(!todo) {
            res.status(404).send({
                error_code: 404,
                error_msg: 'Could not update todo'
            });
        }

        res.status(200).send({todo});
    }).catch((e) => {
        res.status(400).send({
            error_code: 400,
            error_msg: 'Todo service is down'
        });
    });
});

// POST /user

app.post('/users', (req, res) => {
    const body = _.pick(req.body, ['email', 'password'])
    const user = new User(body);

    user.save().then(() => {
        return user.generateAuthTokens();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        console.log(e);
    });
});

/*
 * START SERVER:
 */
http.createServer(app).listen(Config.PORT, () => {
    console.log(`Server is running on: ${Config.PORT}`)
});

export default {
    app
};