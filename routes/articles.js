/**
 * Created by yohuang on 9/12/2014.
 */
var router = require('express').Router(),
    Article = require('../models/article').Article;

router.route('/')
    .post(function (req, res) {
        var article = new Article(),
            data = req.body;
        article.title = data.title;
        article.body = data.body;
        article.author = 'anonymous';
        article.date = new Date();
        article.save(function (err) {
            if (err) {
                res.send(err);
            } else {
                //res.json({message: 'Article created!'});
                Article.find(function (err, articles) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.render('articles', {articles: articles});
                    }
                });            }
        });
    })
    .get(function (req, res) {
        Article.find(function (err, articles) {
            if (err) {
                res.send(err);
            } else {
                res.render('articles', {articles: articles});
            }
        });
    });

router.route('/:article_id')
    .get(function (req, res) {
        Article.findById(req.params.article_id, function (err, article) {
            if (err) {
                res.send(err);
            } else {
                res.json(article);
            }
        });
    })
    .put(function (req, res) {
        Article.findById(req.params.article_id, function (err, article) {
            if (err) {
                res.send(err);
            } else {
                article.title = req.body.name;
                article.body = req.body.body;
                article.date = new Date();
                article.save(function (err) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.json({message: 'Article updated!'});
                    }
                });
            }
        });
    })
    .delete(function (req, res) {
        Article.remove({
            _id: req.params.article_id
        }, function (err, article) {
            if (err) {
                res.send(err);
            } else {
                res.json({message: 'Successfully deleted'});
            }
        });
    });

module.exports = router;