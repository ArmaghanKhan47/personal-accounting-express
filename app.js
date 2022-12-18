const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const fs = require('fs');
const PassportJWTStrategy = require('./src/middlewares/passport');


require('dotenv').config();

// const indexRouter = require('./src/routes/index');
// const usersRouter = require('./src/routes/users');

const app = express();

app.use(passport.initialize());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Initializing db connection
console.log('> connecting mongodb');
require('./src/db');

// Initializing passport middleware
console.log('> initializing middlewares');
PassportJWTStrategy.init(passport);

// Auto registering routes
console.log('> registering routes');
fs.readdir('./src/routes', {}, (err, files) => {
  files.forEach(file => {
    let router = require('./src/routes/' + file);
    router.app = app;
    router.init();
  });
});

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

module.exports = app;
