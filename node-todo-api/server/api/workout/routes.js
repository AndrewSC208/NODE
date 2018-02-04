import express from 'express';
import { ObjectId } from 'mongodb';

import Workout from './model';

const Workouts = express.Router();

Workouts.post('', (req, res) => {
    const { start_time, end_time, workoutType, userId} = req.body;
    const workout = new Workout({
        start_time,
        end_time, 
        workoutType,
        userId
    });

    if (!ObjectId.isValid(userId)) {
        return res.status(404).send({
            error_code: 404,
            error_msg: 'User ID is not valid'
        });
    };

    workout.save().then((workout) => {
        res.send(workout);
    }, (e) => {
        res.status(400).send(e);
    });
});
/*
 *  Get all workouts for a user:
 *  GET /worksouts/:id
 *  
 */
// Worksouts.get('/:id', (req, res) => {

// });

export default Workouts;