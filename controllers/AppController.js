import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
  // Method which returns the status of the Redis database and client
  static async getStatus(request, response) {
    const status = {
      redis: redisClient.isAlive(),
      db: dbClient.isAlive(),
    };
    response.status(200).json(status);
  }

  // Method that returns the number of users and files in the database
  static async getStats(request, response) {
    const stats = {
      users: await dbClient.nbUsers(),
      files: await dbClient.nbFiles(),
    };
    response.status(200).json(stats);
  }
}

export default AppController;
