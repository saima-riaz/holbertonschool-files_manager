import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient(); // Create Redis client instance

    // Handling connection and errors
    this.client.on('error', (error) => {
      console.error(`Redis client error: ${error}`);
    });

    // Explicitly connecting to Redis
    this.client.connect().catch((error) => {
      console.error(`Failed to connect to Redis: ${error}`);
    });
  }

  // Check if Redis client is alive
  isAlive() {
    return this.client.isOpen;
  }

  // Get a value from Redis
  async get(key) {
    try {
      return await this.client.get(key);
    } catch (error) {
      console.error(`Error getting key "${key}": ${error}`);
      throw error; // Re-throw the error for handling at higher levels
    }
  }

  // Set a value in Redis with an expiration time
  async set(key, value, duration) {
    try {
      return await this.client.setEx(key, duration, value);
    } catch (error) {
      console.error(`Error setting key "${key}": ${error}`);
      throw error; // Re-throw the error for handling at higher levels
    }
  }

  // Delete a key from Redis
  async del(key) {
    try {
      return await this.client.del(key);
    } catch (error) {
      console.error(`Error deleting key "${key}": ${error}`);
      throw error; // Re-throw the error for handling at higher levels
    }
  }
}

// Create and export a single instance of the Redis client
const redisClient = new RedisClient();
export default redisClient;
