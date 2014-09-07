var Blog = require('./controllers/blog'); 

module.exports = function (app) {
    app.get('/', Blog.index);
    app.get('/blog/page/:page', Blog.index);
    app.get('/blog/article/:prefix', Blog.article)
    app.get('/archive', Blog.archive);
    app.get('/timeline/:categoryId', Blog.timeline);
    app.get('/profile', function *() {
        this.body = yield this.render('profile');
    })
};
