import expect from 'expect'
import request from 'supertest';

import app from '../index';
import { Todo } from '../api/todo';
import { ObjectID, ObjectId } from '../../../../../../Library/Caches/typescript/2.6/node_modules/@types/bson';

const seed = [
    {
        _id: new ObjectID(),
        text: 'Seeds data'
    },
    {
        _id: new ObjectID(),
        text: 'Second test'
    }
]

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(seed);
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        let text = 'Test todo';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(2);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should not create todo with invalide body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(0);
                    done();
                }).catch((e) => done(e));
            });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBo(2);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    // valid call:
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    }); 

    it('should return 404 if todo not found', (done) => {
        // get a 404
        request(app)
            .get(`/todos/${ObjectID.toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non objectIds', (done) => {
        // get a 404
        request(app)
            .get(`/todos/23434`)
            .expect(404)
            .end(done);
    });
});