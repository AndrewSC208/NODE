import express from 'express';

import Users from './user';
import Todos from './todo';
import Workouts from './workout';

const Api = express.Router();

Api.use('/users', Users);
Api.use('/todos', Todos);
Api.use('/workouts', Workouts);

export default Api;