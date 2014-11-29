var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var stylus = require('stylus');
var nib = require('nib');
var passport = require('./controller/passport');
var session = require('express-session');
var md = require('marked');
//md.setOptions({
//    gfm: true,
//    breaks: true
//});



var index = require('./routes/index'),
    articles = require('./routes/articles');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(stylus.middleware({
    src: path.join(__dirname, 'public'),
    compile: function (str, path) {
        return stylus(str)
            .set('filename', path)
            .use(nib());
    }
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'im undefined!',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
// Session-persisted message middleware
app.use(function(req, res, next){
    var err = req.session.error,
        msg = req.session.notice,
        success = req.session.success;

    delete req.session.error;
    delete req.session.success;
    delete req.session.notice;

    if (err){
        res.locals.error = err;
    }
    if (msg) {
        res.locals.notice = msg;
    }
    if (success) {
        res.locals.success = success;
    }

    next();
});

//make the views know when to show the authenticated content
//use markdown
app.use(function (req, res, next) {
    var backup = res.render;
    res.render = function (template, data) {
        data = data || {};
        data.md = md;
        data.isLoggedIn = req.isAuthenticated();
        backup.call(this, template, data);
    };
    next();
});

app.use('/', index);
app.use('/articles', articles);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
