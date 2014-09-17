var express = require('express');
var router = express.Router();
var Article = require('../models/article').Article;
var passport = require('passport');

/* GET home page. */
router.get('/', function (req, res) {
    Article.find(function (err, articles) {
        if (err) {
            res.send(err);
        } else {
            res.render('index', {
                title: 'undefined.im',
                articles: articles
            });
        }
    });
});

//displays our signup page
router.get('/signin', function (req, res) {
    res.render('signin');
});

//sends the request through our local signup strategy, and if successful takes user to homepage, otherwise returns then to signin page
router.post('/local-reg', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signin'
}));

//sends the request through our local login/signin strategy, and if successful takes user to homepage, otherwise returns then to signin page
router.post('/login', passport.authenticate('local-signin', {
    successRedirect: '/',
    failureRedirect: '/signin'
}));

//logs user out of site, deleting them from the session, and returns to homepage
router.get('/logout', function (req, res) {
    var name = req.user.username;
    console.log("LOGGIN OUT " + req.user.username);
    req.logout();
    res.redirect('/');
    req.session.notice = "You have successfully been logged out " + name + "!";
});

module.exports = router;
