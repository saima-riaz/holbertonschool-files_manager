import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();

    this.client.on('error', (error) => {
      console.error(`Redis client error: ${error}`);
    });

    this.client.connect().catch((error) => {
      console.error(`Failed to connect to Redis: ${error}`);
    });
  }

  isAlive() {
    return this.client.isOpen;
  }

  async get(key) {
    try {
      return await this.client.get(key);
    } catch (error) {
      console.error(`Error getting key "${key}": ${error}`);
      throw error;
    }
  }

  async set(key, value, duration) {
    try {
      return await this.client.setEx(key, duration, value);
    } catch (error) {
      console.error(`Error setting key "${key}": ${error}`);
      throw error;
    }
  }

  async del(key) {
    try {
      return await this.client.del(key);
    } catch (error) {
      console.error(`Error deleting key "${key}": ${error}`);
      throw error;
    }
  }
}

const redisClient = new RedisClient();
export default redisClient;
