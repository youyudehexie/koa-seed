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
app.use(function *pageNotFound(next) {
  yield next;

  if (404 != this.status) return;

  // we need to explicitly set 404 here
  // so that koa doesn't assign 200 on body=
  this.status = 404;

  switch (this.accepts('html', 'json')) {
    case 'html':
      this.type = 'html';
      this.body = '<p>Page Not Found</p>';
      break;
    case 'json':
      this.body = {
        message: 'Page Not Found'
      };
      break
    default:
      this.type = 'text';
      this.body = 'Page Not Found';
  }
})

app.listen(3012)
