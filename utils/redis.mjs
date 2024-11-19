import { createClient } from 'redis';

class RedisClient {
    constructor() {
        this.client = createClient();

        this.client.on('error', (err) => {
            console.error('Redis Client Error:', err);
        });

        this.client.connect().catch(console.error); // Ensures the client is connected
    }

    isAlive() {
        return this.client.isOpen;
    }

    async get(key) {
        return this.client.get(key);
    }

    async set(key, value, duration) {
        await this.client.set(key, value, {
            EX: duration, // Set expiration in seconds
        });
    }

    async del(key) {
        await this.client.del(key);
    }
}

const redisClient = new RedisClient();
export default redisClient;
