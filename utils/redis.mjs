import redis from 'redis';

class RedisClient {
    constructor() {
        this.client = redis.createClient(); // Initialize Redis client

        // Handle Redis client errors
        this.client.on('error', (err) => {
            console.error('Redis Client Error:', err);
        });
    }

    isAlive() {
        return this.client.connected; // Return true if Redis client is connected
    }

    async get(key) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, value) => {
                if (err) {
                    console.error(`Failed to get value for key "${key}":`, err);
                    reject(err);
                } else {
                    resolve(value);
                }
            });
        });
    }

    async set(key, value, duration) {
        return new Promise((resolve, reject) => {
            this.client.set(key, value, 'EX', duration, (err) => {
                if (err) {
                    console.error(`Failed to set value for key "${key}":`, err);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    async del(key) {
        return new Promise((resolve, reject) => {
            this.client.del(key, (err) => {
                if (err) {
                    console.error(`Failed to delete key "${key}":`, err);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}

const redisClient = new RedisClient();
export default redisClient;