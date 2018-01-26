const { SHA256 } = require('crypto-js');

// this is using a third party:
//let msg = 'This is a random string to hash';
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

//
const jwt = require('jsonwebtoken');

let data = {
    id: 56
};

// this value should come from an env var
const secret = 'randomeString';

let token = jwt.sign(data, secret);
console.log('New token: ', token);

let valid = jwt.verify(token, secret);
console.log('Is JWT valid? Intresting that it prints out the decoded object: ', valid);

let val = jwt.decode(token, secret);
console.log('Decoded value of the token: ', val);
