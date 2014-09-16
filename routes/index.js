var express = require('express');
var router = express.Router();
var Article = require('../models/article').Article;

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

module.exports = router;
