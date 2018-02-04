import mongoose from 'mongoose';

const WorkoutSchema = new mongoose.Schema({
    start_time: {
        type: String,
        required: true,
    },
    end_time: {
        type: String,
        required: true
    },
    workoutType: {
        type: String,
        required: true,
        minlength: 1,
    },
    _creator: {
        required: true,
        type: mongoose.Schema.Types.ObjectId
    }
});

const Workout = mongoose.model('Workout', WorkoutSchema);

export default Workout;

