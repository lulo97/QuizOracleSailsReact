const Redis = require("ioredis");
const { SECOND } = require("../../utils/consts")

let redisClient = null;
let connectionAttempts = 0;

function getRedisConnection() {
    if (!redisClient) {
        redisClient = new Redis({
            port: process.env.REDIS_PORT,
            host: process.env.REDIS_HOST,
            retryStrategy: (times) => {
                connectionAttempts++;
                if (connectionAttempts > process.env.REDIS_RECONNECTION_TIMES) {
                    console.error("Redis: Maxeimum retry attempts reached. Stopping reconnection.");
                    return null;
                }

                const delay = process.env.REDIS_RECONNECTION_MILISECONDS;
                console.warn(`Redis: Attempting to reconnect (${connectionAttempts}/${process.env.REDIS_RECONNECTION_TIMES}) in ${delay / SECOND}s`);
                return delay;
            }
        });

        redisClient.on("connect", () => {
            connectionAttempts = 0; // Reset attempts on successful connection
            console.log("Connected to Redis!");
        });

        redisClient.on("error", (err) => {
            console.error("Redis error:", err.message);
        });

        redisClient.on("end", () => {
            console.warn("Redis connection closed.");
        });
    }
    return redisClient;
}

function closeRedisConnection() {
    if (redisClient) {
        redisClient.quit();
        redisClient = null;
        connectionAttempts = 0;
        console.log("Redis connection closed.");
    }
}

module.exports = { getRedisConnection, closeRedisConnection };
