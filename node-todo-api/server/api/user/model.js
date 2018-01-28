import mongoose from 'mongoose';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minLength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function() {
    const user = this;
    let userObj = user.toObject();

    return _.pick(userObj, ['_id', 'email']);
};

UserSchema.methods.generateAuthTokens = function() {
    const user = this;
    let access = 'auth';
    let token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

    user.tokens.push({access, token});
    return user.save().then(() => {
        return token;
    });
}

// model methods get called as model with the this binding.
UserSchema.statics.findByToken = function(token) {
    let User = this;
    let decoded;

    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (e) {
        return Promise.reject({
            error_code: 401,
            error_msg: 'Authentication Token Failed'
        })
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
}

const User = mongoose.model('User', UserSchema);

export default User;