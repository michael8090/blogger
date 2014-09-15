/**
 * Created by yohuang on 9/15/2014.
 */
var mongoose;
if (!global.isDbImported) {
    mongoose = require('mongoose');
    mongoose.connect('mongodb://blogdbreader:readmydata@ds035750.mongolab.com:35750/blogdb');
    global._mongoose = mongoose;
    global.isDbImported = true;
} else {
    mongoose = global._mongoose;
}

module.exports = mongoose;
