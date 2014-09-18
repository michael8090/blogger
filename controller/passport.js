/**
 * Created by michael on 2014/9/18.
 */
var passport = require('passport'),
    LocalStrategy = require('passport-local'),
    Author = require('../models/author'),
    localAuth = require('./localAuth');


passport.use('local-signin', new LocalStrategy(
    {passReqToCallback : true}, //allows us to pass back the request to the callback
    function (req, username, password, done) {
        localAuth.authorize(username, password)
            .then(function (author) {
                req.session.success = 'Logged in as ' + username;
                done(null, author);
            })
            .fail(function (err) {
                req.session.error = 'Could not log user in.';
                done(err);
            });
    }
));

passport.use('local-signup', new LocalStrategy(
    {passReqToCallback : true}, //allows us to pass back the request to the callback
    function (req, username, password, done) {
        localAuth.register(username, password, req.body.email)
            .then(function (author) {
                req.session.success = 'Logged in as ' + username;
                done(null, author);
            })
            .fail(function (err) {
                req.session.error = 'Could not log user in.';
                done(err);
            });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    Author.findById(id, function (err, user) {
        done(err, user);
    });
});

module.exports = passport;