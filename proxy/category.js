var mysql = require('../common/mysql');
var thunkify = require('thunkify-wrap');
var multiline = require('multiline');

var QUERY_LIST_SQL = multiline(function () {;/*
    SELECT
    id, name, primary_image, count
    from blog_category
*/});

exports.list = function *next() {
    var row = yield mysql.query(QUERY_LIST_SQL);
    return row;
}
