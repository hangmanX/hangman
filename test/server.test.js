const request = require('supertest');
// must have server running to run tests
const server = 'http://localhost:80'

describe('Route integration', () => {
  describe('/', () => {
    it('responds with 200 status and text/html content type', () => {
      return request(server)
        .get('/')
        .expect('Content-Type', /text\/html/)
        .expect(200)
    });
  });
});

describe('Global handlers', () => {
  describe('route error handler', () => {
    it('responds with a 404 status', () => {
      return request(server)
        .get('/test')
        .expect('Content-Type', /text\/html/)
        .expect(404);
    });

    it('responds with a body of \'Page not found\'', (done) => {
      return request(server)
        .get('/test')
        .expect('Content-Type', /text\/html/)
        .expect(404, 'Page not found', done);
    });
  });
});