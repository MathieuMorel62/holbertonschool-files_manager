import redis from 'redis';
import { promisify } from 'util';

class RedisClient {
  // Builder of the class that creates a new Redis client
  constructor() {
    this.client = redis.createClient();
    this.client.on('error', (error) => {
      console.log(` Redis client not connected: ${error.message}`);
    });
  }

  // Method to check if the Redis client is connected
  isAlive() {
    return this.client.connected;
  }

  // Method to retrieve a value associated with a key in Redis
  async get(key) {
    const getKey = promisify(this.client.get).bind(this.client);
    const value = await getKey(key);
    return value;
  }

  // Method to set a value for a key in Redis
  async set(key, value, duration) {
    this.client.set(key, value, 'EX', duration);
  }

  // Method to delete a key and its associated value from Redis
  async del(key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
