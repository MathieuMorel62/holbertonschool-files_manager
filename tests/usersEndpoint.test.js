const request = require('request-promise');
const nock = require('nock');

const url = 'http://localhost:3000';

describe('- Users Endpoint Tests', () => {
  describe('- Post /users', () => {
    it('should create a new user', async () => {
      expect.assertions(2);

      const newUser = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',
      };

      nock(url)
        .post('/users', newUser)
        .reply(201, {
          name: 'John Doe',
          email: 'johndoe@example.com',
        });

      const response = await request({
        method: 'POST',
        uri: `${url}/users`,
        body: newUser,
        json: true,
        resolveWithFullResponse: true,
      });

      expect(response.statusCode).toBe(201);
      expect(response.body).toStrictEqual({
        name: 'John Doe',
        email: 'johndoe@example.com',
      });
    });
  });

  describe('- GET /users/me', () => {
    it('should retrieve the current user information', async () => {
      expect.assertions(2);

      const currentUser = {
        name: 'John Doe',
        email: 'johndoe@example.com',
      };

      nock(url)
        .get('/users/me')
        .reply(200, currentUser);

      const response = await request({
        method: 'GET',
        uri: `${url}/users/me`,
        json: true,
        resolveWithFullResponse: true,
      });

      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual(currentUser);
    });
  });
});
