/**
 * Created by michael on 2014/9/18.
 */
var passport = require('passport'),
    LocalStrategy = require('passport-local'),
    localAuth = require('./localAuth');


passport.use('local-signin', new LocalStrategy(
    {passReqToCallback : true}, //allows us to pass back the request to the callback
    function (req, username, password, done) {
        localAuth.authorize(username, password)
            .then(function () {
                req.session.success = 'Logged in as ' + username;
                done();
            })
            .fail(function (err) {
                req.session.error = 'Could not log user in.';
                done();
            });
    }
));

module.exports = passport;