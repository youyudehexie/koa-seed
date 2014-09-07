var mysql = require('../common/mysql');
var thunkify = require('thunkify-wrap');
var multiline = require('multiline');

var QUERY_LIST_SQL = multiline(function () {;/*
    SELECT
    title, prefix, blog_article.summary, blog_category.primary_image, created_at
    from blog_article
    LEFT JOIN
    blog_category on blog_category.id = blog_article.category_id 
    ORDER BY
    created_at
    LIMIT ?
    OFFSET ?
*/});

exports.list = function *(offset, limit) {
    var row = yield mysql.query(QUERY_LIST_SQL, [limit, offset]);
    return row;
}

var QUERY_ARTICLE_FROM_PREFIX = multiline(function () {;/*
    SELECT
    id, title, content, created_at, category_id
    FROM
    blog_article
    WHERE
    prefix = ?
    LIMIT 1
*/});

exports.getAritleFromPrefix = function *(prefix) {
    var row = yield mysql.queryOne(QUERY_ARTICLE_FROM_PREFIX, [prefix]);
    return row;
}

var QUERY_COMMAND_ARTICLE = multiline(function () {;/*
    SELECT
    title, prefix
    FROM
    blog_article
    WHERE
    category_id = ?
    AND id != ?
    ORDER BY
    created_at
    LIMIT 5
*/});

exports.getCommandArticle = function *next(categoryId, articleId) {
    var row = yield mysql.query(QUERY_COMMAND_ARTICLE, [categoryId, articleId]);
    return row;
}

var QUERY_LIST_FROM_CATEGORY_SQL = multiline(function () {;/*
    SELECT 
        title, prefix, summary, created_at
    FROM 
        blog_article
    WHERE
        category_id = ?
    ORDER BY
        created_at
*/});

exports.getListFromCategory = function *(categoryId) {
    var row = yield mysql.query(QUERY_LIST_FROM_CATEGORY_SQL, [categoryId]);
    return row;
}
