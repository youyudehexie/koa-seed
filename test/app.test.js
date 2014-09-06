var request = require('supertest');
var app = require('../app').listen();

describe('app.js', function () {
  it('should / status 200', function (done) {
    request(app)
    .get('/')
    .expect(200, done);
  });

});
