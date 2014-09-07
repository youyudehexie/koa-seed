var _ = require('underscore');
var moment = require('moment');
var marked = require('marked');

var Article = require('../proxy/article');
var Category = require('../proxy/category');

exports.index = function *() {
    var page = this.params.page || 0;

    if (page < 0) {
        page = 0;
    }

    var limit = 5;
    var offset = 5*page;

    var articles = yield* Article.list(offset, limit);

    articles = _.map(articles, function (article) {
        article.created_at = moment(article.created_at).format('YYYY年MM月DD日')
        return article;
    });

    this.body = yield this.render('index', {articles: articles, page: page, route: 'index'});
};

exports.article = function *(next) {
    var prefix = this.params.prefix;
    if (!prefix) {
        yield next;
    }

    var article = yield* Article.getAritleFromPrefix(prefix);
    if (!article) {
        yield next;
    }

    var recommands = yield* Article.getCommandArticle(article.category_id, article.id);
    article.created_at = moment(article.created_at).format('YYYY年MM月DD日');
    article.content = marked(article.content);

    this.body = yield this.render('article', {article: article, recommands: recommands});
};

exports.archive = function *() {
    var categoires = yield* Category.list();
    this.body = yield this.render('archive', {categoires: categoires});
};

exports.timeline = function *(next) {
    var categoryId = this.params.categoryId;

    if (!categoryId) {
        yield next();
    }

    var articles = yield* Article.getListFromCategory(categoryId)
    articles = _.map(articles, function (article) {
        article.created_at = moment(article.created_at).format('YYYY年MM月DD日')
        return article;
    });

    this.body = yield this.render('timeline', {articles: articles});
};
