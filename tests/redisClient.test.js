import UsersController from '../controllers/UsersController';

jest.mock('../utils/db', () => ({
  db: {
    collection: () => ({
      findOne: jest.fn().mockResolvedValue(null),
      insertOne: jest.fn().mockResolvedValue({ insertedId: '123' }),
    }),
  },
}));

jest.mock('../utils/redis');

describe('usersController', () => {
  describe('postNew', () => {
    it('should create a new user', async () => {
      expect.assertions(2);

      const mockUser = { email: 'test@test.com', password: 'password' };
      const req = {
        body: mockUser,
      };
      const jsonMock = jest.fn();
      const res = {
        status: jest.fn(() => ({ json: jsonMock })),
      };

      await UsersController.postNew(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith({ id: '123', email: mockUser.email });
    });

    it('should return 400 if user data is incomplete', async () => {
      expect.assertions(2);

      const mockUser = { email: 'test@test.com' };
      const req = {
        body: mockUser,
      };
      const jsonMock = jest.fn();
      const res = {
        status: jest.fn(() => ({ json: jsonMock })),
      };

      await UsersController.postNew(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ error: 'Missing password' });
    });
  });
});
