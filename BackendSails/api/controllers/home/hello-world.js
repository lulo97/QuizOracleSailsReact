const { getConnection } = require("../../../config/database/db-connection");
const oracledb = require("oracledb");
const { getRedisConnection } = require("../../../config/redis/redis-connection")

module.exports = {
    inputs: {},

    exits: {},

    fn: async function () {
        const connection = await getConnection();
        
        const result = await connection.execute(`SELECT sysdate FROM dual`);

        const redisClient = await getRedisConnection();

        return `Hello, World!, ${result.rows}`;
    },
};
