import express from 'express';
import _ from 'lodash';

import User from './model';
/*
 *  CUSTOM MIDDLEWARE
 */
import authenticate from '../../middleware/authenticate';

const Users = express.Router();
// POST /users
Users.post('', (req, res) => {
    const body = _.pick(req.body, ['email', 'password'])
    const user = new User(body);

    user.save().then(() => {
        return user.generateAuthTokens();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(404).send({
            error_msg: 'Faild to create user',
            error_code: 404
        });
    });
});

// POST /users/me
Users.post('/me', authenticate, (req, res) => {
    res.send(req.user);
});
/*
 *  POST /users/login {email, password}
 */
Users.post('/login', (req, res) => {
    //const body = _.pick(req.body, ['email', 'password']);
    const { email, password } = req.body;
    
    User.findByCredentials(email, password)
        .then((user) => {
            return user.generateAuthTokens()
                .then((token) => {
                    res.header('x-auth', token).send(user);
                });
        }).catch(e => res.status(400).send(e));
});
/*
 *  REMOVE USER TOKEN
 */
Users.delete('/me/token', authenticate, (req, res) => {
    const { token } = req;

    req.user.removeToken(token).then(() => {
        res.status(200).send();
    }, (e) => {
        res.status(400).send();
    })
});

export default Users;