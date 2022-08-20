const express = require('express');
const path = require('path');
const routes = require('./routes/index');
const bodyParser = require('body-parser');
const expressSession = require('express-session') ({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 60000
    }
});

const app = express();

// app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressSession);
app.use('/', routes);

module.exports = app;