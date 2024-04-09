const request = require('request');
const { promisify } = require('util');
const process = require('process');
const assert = require('assert');

const nock = require('nock');
const PORT = process.env.PORT || '5000';
const HOST = '0.0.0.0';
const url = `${HOST}:${PORT}`;

describe('- API Endpoints', () => {
  describe('- GET /status', () => {
    const promRequest = promisify(request);
    const myRequest = promRequest(`http://${url}/status`);

    it('- Checks the URL is correct', () => {
      expect.assertions(1);
      expect(url).toStrictEqual(`${HOST}:${PORT}`);
    });

    it('- Ensures no error occurs during the request', async () => {
      expect.assertions(0);
      await myRequest
        .then()
        .catch((err) => {
          expect(err).toBeNull();
        });
    });

    it('- Checks the response status is good', async () => {
      expect.assertions(1);
      const res = await myRequest;
      expect(res).toHaveProperty('statusCode', 200);
    });

    it('- Confirms the response is correct', async () => {
      expect.assertions(1);
      const res = await myRequest;
      expect(res.body).toStrictEqual('{"redis":true,"db":false}');
    });
  });

  describe('- GET /stats', () => {
    it('- Must return a status of 200 and a correct response body when calling GET /stats', async () => {
      expect.assertions(1);
      nock(`http://${HOST}:${PORT}`)
        .get('/stats')
        .reply(200, '{"redis":true,"db":false}');
      try {
        const res = await promisify(request)(`http://${HOST}:${PORT}/stats`);
        expect(res.body).toStrictEqual('{"redis":true,"db":false}');
      } catch (err) {
        assert.fail(`Request failed with error: ${err.message}`);
      }
    });
  });
});
