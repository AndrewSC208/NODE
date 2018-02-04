import mongoose from 'mongoose';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import bcrypt from 'bcryptjs';

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
    let token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();

    user.tokens.push({access, token});
    return user.save().then(() => {
        return token;
    });
}

UserSchema.methods.removeToken = function(token) {
    var user = this;

    return user.update({
        $pull: {
            tokens: { token }
        }
    })
};

// model methods get called as model with the this binding.
UserSchema.statics.findByToken = function(token) {
    const User = this;
    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
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
/*
 *  FIND BY CREDS
 */
UserSchema.statics.findByCredentials = function (email, password) {
    const User = this;

    return User.findOne({email}).then((user) => {
        if(!user) {
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (err) {
                    reject(err);
                }

                resolve(user);
            });
        });
    });
};
/*
 * RUN MIDDLEWARE BEFORE THE 'SAVE' EVENT
 */
UserSchema.pre('save', function (next) {
    const user = this;

    if(user.isModified('password')) {
        let { password } = user;

        bcrypt.genSalt(12, (err, salt) => {
            bcrypt.hash(password, salt, (error, hash) => {
                user.password = hash;
                next();
            });
        });

    } else {
        next();
    }
});

const User = mongoose.model('User', UserSchema);

export default User;