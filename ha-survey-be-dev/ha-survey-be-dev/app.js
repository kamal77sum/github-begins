var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const mailer = require("./NodeMailer");
const config = require("config");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

/** Here goes the models import */

var app = express();
app.use(cors());

//Database Connection
connectDB();
app.use(express.json({ extended: false }));

//express-rate-limiter

app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 100 requests per windowMs
  message:
  "Too many accounts created from this IP, please try again after an hour"
});
app.use(helmet());
app.use(limiter);




//app.use(logger('dev'));   will use later when we configure this
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/',require('./routes/index'));
app.use('/user',require('./routes/user.route'));
app.use('/webhook',require('./routes/webhook'));
app.use('/response',require('./routes/response'));
app.use('/admin',require('./routes/management.route'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
//false commit