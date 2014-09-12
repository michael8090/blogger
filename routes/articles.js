/**
 * Created by yohuang on 9/12/2014.
 */
var router = require('express').Router(),
    Article = require('../models/article').Article;

router.route('/articles')
    .post(function (req, res) {
        var article = new Article(),
            data = req.body;
        article.title = data.title;
        article.body = data.body;
        article.author = 'anonymous';
    });