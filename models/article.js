/**
 * Created by yohuang on 9/12/2014.
 */
var mongoose = require('./mongoose'),
    Schema = mongoose.Schema,
    ArticleSchema = new Schema({
        author: Schema.ObjectId,
        title: String,
        body: String,
        date: Date
    });

var Article = module.exports= mongoose.model('Article', ArticleSchema);

//utils

Article.getSome = function (n, callback) {
    if (typeof n === 'function') {
        callback = n;
        n = 5;
    }
    Article
        .find({date: {$lte: Date.now()}})
        .sort({date: -1})
        .limit(n)
        .exec(callback);
};