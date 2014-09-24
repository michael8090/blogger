var express = require('express');
var router = express.Router();
var Article = require('../models/article');
var passport = require('../controller/passport');

/* GET home page. */
router.get('/', function (req, res) {
    Article.getSome(function (err, articles) {
        if (err) {
            res.send(err);
        } else {
            res.render('index', {
                articles: articles
            });
        }
    });
});

router.get('/writer', function (req ,res) {
    if (!req.isAuthenticated()) {
        res.redirect('/login');
    } else {
        res.render('writer');
    }
});

router.get('/writer/:article_id', function (req ,res) {
    if (!req.isAuthenticated()) {
        res.redirect('/login');
    } else {
        var id = req.params.article_id;
        Article.findById(id, function (err, article) {
            if (!err && article) {
                res.render('writer', {id: id, title: article.title, body: article.body});
            } else {
                res.render('writer');
            }
        });
    }
});

//displays our signup page
router.get('/login', function (req, res) {
    if (req.isAuthenticated()) {
        res.render('index');
    } else {
        res.render('login');
    }
});

//sends the request through our local signup strategy, and if successful takes user to homepage, otherwise returns then to signin page
router.post('/register', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

//sends the request through our local login/signin strategy, and if successful takes user to homepage, otherwise returns then to signin page
router.post('/login', passport.authenticate('local-signin', {
    successRedirect: '/',
    failureRedirect: '/login'
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
