var koa = require('koa');
var router = require('koa-router');
var views = require('co-views');
var serve = require('koa-static');
var logger = require('koa-logger');

var route = require('./route');

var app = module.exports = koa();
app.context.render = views(__dirname + '/views', {ext: 'ejs'});
app.use(logger());
app.use(router(app));

route(app);

app.use(serve(__dirname + '/public'));

app.listen(3012)
