/**
 * Created by michael on 2014/9/18.
 */
var bcrypt = require('bcryptjs'),
    Q = require('q'),
    Author = require('../models/author');

exports.register = function (username, password, email) {
    var deferred = Q.defer();
    Author.findOne({username: username}, function(err, author) {
        if (err) {
            deferred.reject(new Error(err));
        } else if (author) {
            deferred.reject('username already exists');
        } else {
            author = new Author();
            author.username = username;
            author.passwordHash = bcrypt.hashSync(password, 8);
            author.email = email;
            author.save(function (err) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(author);
                }
            });
        }
    });
    return deferred.promise;
};

exports.authorize = function (username, password) {
    var deferred = Q.defer();
    Author.findOne({
        username: username
    }, function (err, author) {
        if (err || !author) {
            deferred.reject(err || new Error('invalid username and password pair'));
        } else {
            if (bcrypt.compareSync(password, author.passwordHash)) {
                deferred.resolve(author);
            } else {
                deferred.reject(new Error('invalid username and password pair'));
            }
        }
    });
    return deferred.promise;
};