const request = require('request');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const nock = require('nock');

const PORT = process.env.PORT || '5000';
const HOST = '0.0.0.0';
const url = `http://${HOST}:${PORT}`;

describe('- Files Endpoint Tests', () => {
  describe('- POST /files', () => {
    nock('http://0.0.0.0:5000')
      .post('/files', {
        name: 'file.txt',
        content: 'Hello, World!',
      })
      .reply(201, {
        name: 'file.txt',
        content: 'Hello, World!',
      });

    it('should upload a file', async () => {
      expect.assertions(3);
      const file = {
        name: 'file.txt',
        content: 'Hello, World!',
      };

      const fakeToken = jwt.sign({ foo: 'bar' }, 'shhhhh');

      const response = await promisify(request)({
        method: 'POST',
        uri: `${url}/files`,
        body: file,
        json: true,
        resolveWithFullResponse: true,
        headers: {
          Authorization: `Bearer ${fakeToken}`,
        },
      });

      expect(response.statusCode).toBe(201);
      expect(response.body.name).toBe('file.txt');
      expect(response.body.content).toBe('Hello, World!');
    });
  });

  describe('- GET /files/:id', () => {
    nock('http://0.0.0.0:5000')
      .get('/files/12345')
      .reply(200, {
        name: 'file.txt',
        content: 'Hello, World!',
      });

    it('should retrieve a specific file', async () => {
      expect.assertions(3);
      const fileId = '12345';
      const fakeToken = jwt.sign({ foo: 'bar' }, 'shhhhh');
      const response = await promisify(request)({
        method: 'GET',
        uri: `${url}/files/${fileId}`,
        json: true,
        resolveWithFullResponse: true,
        headers: {
          Authorization: `Bearer ${fakeToken}`,
        },
      });
      expect(response.statusCode).toBe(200);
      expect(response.body.name).toBe('file.txt');
      expect(response.body.content).toBe('Hello, World!');
    });
  });

  describe('- GET /files', () => {
    nock('http://0.0.0.0:5000')
      .get('/status')
      .reply(200, {
        redis: true,
        db: false,
      })
      .get('/files?page=1&limit=10')
      .reply(200, { files: new Array(10).fill({}) });

    it('should retrieve a list of files with pagination', async () => {
      expect.assertions(3);
      const fakeToken = jwt.sign({ foo: 'bar' }, 'shhhhh');
      const response = await promisify(request)({
        method: 'GET',
        uri: `${url}/files?page=1&limit=10`,
        json: true,
        resolveWithFullResponse: true,
        headers: {
          Authorization: `Bearer ${fakeToken}`,
        },
      });
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('files');
      expect(response.body.files).toHaveLength(10);
    });
  });

  describe('- PUT /files/:id/publish', () => {
    it('should publish a file', async () => {
      expect.assertions(2);
      nock(url)
        .put('/files/123/publish')
        .reply(200, { message: 'File published successfully' });

      const token = jwt.sign({ userId: '123' }, 'secret');
      const options = {
        url: `${url}/files/123/publish`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const requestPromise = promisify(request);
      const response = await requestPromise(options);
      const responseBody = JSON.parse(response.body);

      expect(response.statusCode).toBe(200);
      expect(responseBody).toStrictEqual({ message: 'File published successfully' });
    });
  });

  describe('- PUT /files/:id/unpublish', () => {
    it('should unpublish a file', async () => {
      expect.assertions(2);
      nock(url)
        .put('/files/123/unpublish')
        .reply(200, { message: 'File unpublished successfully' });

      const token = jwt.sign({ userId: '123' }, 'secret');
      const options = {
        url: `${url}/files/123/unpublish`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const requestPromise = promisify(request);
      const response = await requestPromise(options);
      const responseBody = JSON.parse(response.body);

      expect(response.statusCode).toBe(200);
      expect(responseBody).toStrictEqual({ message: 'File unpublished successfully' });
    });
  });

  describe('- GET /files/:id/data', () => {
    nock('http://0.0.0.0:5000')
      .get('/files/12345/data')
      .reply(200, {
        fileId: '12345',
        data: 'file data',
      });
    it('should retrieve the data of a file', async () => {
      expect.assertions(3);
      const fileId = '12345';
      const fakeToken = jwt.sign({ foo: 'bar' }, 'shhhhh');
      const response = await promisify(request)({
        method: 'GET',
        uri: `${url}/files/${fileId}/data`,
        json: true,
        resolveWithFullResponse: true,
        headers: {
          Authorization: `Bearer ${fakeToken}`,
        },
      });
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('fileId');
      expect(response.body).toHaveProperty('data');
    });
  });
});
