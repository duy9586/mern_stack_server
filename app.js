const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const body_parser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

const app = express();
dotenv.config();

let options = {
  useNewUrlParser: true, useUnifiedTopology: true
}

const URI = process.env.DB_CONFIG

mongoose.connect(URI, options).catch(error => {
  console.log('connection error:', error)
});

mongoose.connection.once('open', function () {
  console.log("connect db success");
});

mongoose.connection.on('reconnect', () => {
  console.log('-> reconnected');
});

mongoose.connection.on('close', () => {
  console.log('-> lost connection');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(body_parser.json({ limit: '30mb' }));
app.use(body_parser.urlencoded({ extended: true, limit: '30mb' }));
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
