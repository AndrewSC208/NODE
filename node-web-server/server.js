const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
// init an express app:
let app = express();
// setup middleware:
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
// custome middleware:
app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
    console.log(log);

    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log');
        }
    });
    
    next();
});
// middleware that does not have the next call. Will block the remaing code in the system:
// app.use((req, res, next) => {
//     res.render('maintanence.hbs');
// });
app.use(express.static(__dirname + '/public'));

// register an hbs helper:
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// root route:
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home',
        someMessage: 'Welcome to a random site!',
    })
});

// simple route:
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About',
    });
});

// 404:
app.get('/error', (req, res) => {
    res.send({
        error: 'Error handling request'
    });
});
// bind server to port;
app.listen(3000, () => {
    console.log('Listening on port 3000');
});