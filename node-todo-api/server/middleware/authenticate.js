import User from '../api/user/model';

const authenticate = (req, res, next) => {
    const token = req.header('x-auth');
    
    User.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject({
                error_code: 401,
                error_msg: 'Authentication Failed'
            })
        };

        req.user = user;
        req.token = token;
        next();
    }).catch((e) => {
        res.status(401).send({ ...e });
    });
}

export default authenticate;