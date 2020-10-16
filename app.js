var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var config = require('./config');

// Connection Mongoose
mongoose.Promise = require('bluebird');

mongoose.connect(config.mongodb).then(function(){

    //connected successfully
}, function(err) {
    if (err) {
        console.log(err);
    }
});

var indexRouter = require('./routes/index');
var forms = require('./routes/forms');
var createForm = require('./routes/createForm');
var categories = require('./routes/categories');
var home = require('./routes/home');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static('images'));

app.use('/', indexRouter);
app.use('/forms', forms);
app.use('/createForms', createForm);
app.use('/categories', categories);
app.use('/home' , home);

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
  res.render('error');
});

module.exports = app;
