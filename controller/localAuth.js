/**
 * Created by michael on 2014/9/18.
 */
var bcrypt = require('bcryptjs'),
    Q = require('q'),
    Author = require('../models/author');

exports.register = function (username, password) {
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
            author.save(function (err) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve();
                }
            });
        }
    });
    return deferred.promise;
};

exports.authorize = function (username, password) {
    var deferred = Q.defer();
    Author.findOne({
        username: username,
        passwordHash: bcrypt.hashSync(password, 8)
    }, function (err, author) {
        if (err || !author) {
            deferred.reject(err || 'invalid username and password pair');
        } else {
            deferred.resolve();
        }
    });
    return deferred.promise;
};