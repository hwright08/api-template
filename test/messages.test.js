import { expect, server, BASE_URL } from './setup';

const url = `${BASE_URL}/messages`

describe('Messages', () => {
  it('gets all messages', done => {
    server
      .get(url)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.length(2);
        done();
      });
  });
});
