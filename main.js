import redisClient from './utils/redis.mjs';

(async () => {
  console.log(redisClient.isAlive());
  console.log(await redisClient.get('myKey'));
  
  // Convert value to a string before setting it in Redis
  await redisClient.set('myKey', '12', 5); // Use a string instead of a number
  console.log(await redisClient.get('myKey'));

  setTimeout(async () => {
    console.log(await redisClient.get('myKey'));
  }, 1000 * 10);
})();
