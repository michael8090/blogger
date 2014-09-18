/**
 * Created by yohuang on 9/18/2014.
 */

var mongoose = require('./mongoose'),
    Schema = mongoose.Schema,
    AuthorSchema = new Schema({
        username: String,
        passwordHash: String,
        email: {
            type: String,
            trim: true,
            unique: true,
            required: 'Email address is required',
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        avatar: {
            type: String,
            default: 'https://www.gravatar.com/avatar/bbbe41b11b947fed6fe1e10a366a01e4?s=32&d=identicon&r=PG'
        }
    });

module.exports = mongoose.model('Author', AuthorSchema);