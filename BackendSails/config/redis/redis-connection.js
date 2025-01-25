const Redis = require("ioredis");

let redisClient = null;

function getRedisConnection() {
    if (!redisClient) {
        redisClient = new Redis({
            port: process.env.REDIS_PORT,
            host: process.env.REDIS_HOST,
        });

        redisClient.on('connect', function () {
            redisClient.flushall();
            console.log('Connected to Redis!');
        });

        redisClient.on('error', function (err) {
            console.error('Redis error:', err);
        });
    }
    return redisClient;
}

function closeRedisConnection() {
    if (redisClient) {
        redisClient.quit(); 
        redisClient = null;
        console.log('Redis connection closed.');
    }
}

module.exports = { getRedisConnection, closeRedisConnection };
