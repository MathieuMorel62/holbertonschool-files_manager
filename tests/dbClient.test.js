import dbClient from '../utils/db';

describe('dbClient', () => {
  describe('isAlive', () => {
    it('should return true if the db is connected', () => {
      expect.assertions(1);
      dbClient.db = {};
      expect(dbClient.isAlive()).toBe(true);
    });

    it('should return false if the db is not connected', () => {
      expect.assertions(1);
      dbClient.db = null;
      expect(dbClient.isAlive()).toBe(false);
    });
  });

  describe('nbUsers', () => {
    it('should return the number of users', async () => {
      expect.assertions(1);
      dbClient.db = {
        collection: jest.fn().mockReturnValue({
          countDocuments: jest.fn().mockResolvedValue(10),
        }),
      };
      const nbUsers = await dbClient.nbUsers();
      expect(nbUsers).toBe(10);
    });
  });

  describe('nbFiles', () => {
    it('should return the number of files', async () => {
      expect.assertions(1);
      dbClient.db = {
        collection: jest.fn().mockReturnValue({
          countDocuments: jest.fn().mockResolvedValue(5),
        }),
      };
      const nbFiles = await dbClient.nbFiles();
      expect(nbFiles).toBe(5);
    });
  });
});
