module.exports = function (app) {
    app.get('/', function *() {
        this.body = yield this.render('index');
    });

    app.get('/blog', function *() {
        this.body = yield this.render('blog');
    });

    app.get('/archive', function *() {
        this.body = yield this.render('archive');
    });

    app.get('/timeline', function *() {
        this.body = yield this.render('timeline');
    });
};
