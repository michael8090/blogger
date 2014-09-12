/**
 * Created by yohuang on 9/12/2014.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ArticleSchema = new Schema({
        author: String/*Schema.ObjectId*/,
        title: String,
        body: String,
        date: Date
    });

exports.Article = mongoose.model('Article', ArticleSchema);