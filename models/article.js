/**
 * Created by yohuang on 9/12/2014.
 */
var mongoose = require('./mongoose'),
    Schema = mongoose.Schema,
    ArticleSchema = new Schema({
        author: Schema.ObjectId,
        authorName: String,//shortcut
        title: String,
        body: String,
        createdDate: Date,
        modifiedDate: Date
    });

var Article = module.exports= mongoose.model('Article', ArticleSchema);

//utils

Article.getSome = function (n, callback) {
    if (typeof n === 'function') {
        callback = n;
        n = 5;
    }
    Article
        .find({createdDate: {$lte: Date.now()}})
        .sort({createdDate: -1})
        .limit(n)
        .exec(callback);
};