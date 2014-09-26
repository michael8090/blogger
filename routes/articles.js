/**
 * Created by yohuang on 9/12/2014.
 */
var router = require('express').Router(),
    Article = require('../models/article');

router.use(function(req, res, next) {
    if (!req.isAuthenticated()) {
        res.send({error: 'Not authorized'});
    } else {
        next();
    }
});

router.route('/')
    .post(function (req, res) {
        var article = new Article(),
            data = req.body;
        article.title = data.title;
        article.body = data.body;
        article.author = req.user.id;
        article.authorName = req.user.username;
        article.createdDate = new Date();
        article.save(function (err) {
            if (err) {
                res.send(err);
            } else {
                Article.getSome(10, function (err, articles) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.render('articles', {articles: articles});
                    }
                });
            }
        });
    })
    .get(function (req, res) {
        Article.getSome(10, function (err, articles) {
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
    .post(function (req, res) {
        Article.findById(req.params.article_id, function (err, article) {
            if (err) {
                res.send(err);
            } else {
                article.title = req.body.title;
                article.body = req.body.body;
                article.modifiedDate = new Date();
                article.save(function (err) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.json({message: 'Article updated!'});
                    }
                });
            }
        });
    });

router.route('/delete/:article_id')
    .get(function (req, res) {
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