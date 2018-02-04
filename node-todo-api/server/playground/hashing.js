const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/*
 *  EXAMPLE USING THIRD PARTY LIB
 */
// let msg = 'This is a random string to hash';
// let hash = SHA256(msg).toString();
// console.log(hash);

// now lets use nodes built in crypto:
//const crypto = require('crypto');
// set this with an env var:
// const secret = 'randomeString';
// const hash = crypto.createHmac('sha256', secret)
//     .update(msg)
//     .digest('hex');

// console.log(hash);

/*
 *  EXAMPLE NODE CRYPTO PACKAGE
 */
// let data = {
//     id: 56
// };

// // this value should come from an env var
// const secret = 'randomeString';

// let token = jwt.sign(data, secret);
// console.log('New token: ', token);

// let valid = jwt.verify(token, secret);
// console.log('Is JWT valid? Intresting that it prints out the decoded object: ', valid);

// let val = jwt.decode(token, secret);
// console.log('Decoded value of the token: ', val);

/*
 *  BCRYPT EXAMPLE FOR HASHING PASSWORDS WITH A SALT
 */
/*
 *  GENERATE A HASHED PASSWORD
 */
/*
const password = 'test1234';
bcrypt.genSalt(12, (err, salt) => {
    bcrypt.hash(password, salt, (error, hash) => {
        console.log(hash);
    });
});
*/
/*
 *  COMPARE PLAIN TEXT AND HASH TEXT: 
 */
/*
const hashedPassword = '$2a$12$kPcYZBf5M4VRemFQlInizeqiY4TAcS9BDg5SPWNioZBhUILm.E4jm';
bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res);
});
*/
