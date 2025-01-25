const { getConnection } = require("../../../config/database/db-connection");
const oracledb = require("oracledb");
const {
    getRedisConnection,
} = require("../../../config/redis/redis-connection");

module.exports = {
    inputs: {},

    exits: {},

    fn: async function () {
        const req = this.req;

        const prc_name = "prc_crud_subject";

        const prc_params = {
            p_action: "READ",
            p_id: req.query.id,
            p_name: req.query.name,
            p_description: req.query.description,
            p_parent_id: req.query.parent_id,
        };

        const result = await sails.helpers.procedureWrapper(
            prc_name,
            prc_params,
            req
        );

        const redisClient = await getRedisConnection();

        const key = "SUBJECT";
        const value = JSON.stringify(result);

        const is_exist = await redisClient.exists(key);

        if (is_exist) {
            let result_cache = await redisClient.get(key);
            result_cache = JSON.parse(result_cache);
            return result_cache;
        } else {
            console.log("Set data to redis");
            await redisClient.set(key, value);
        }

        console.log("No cache data found");

        return result;
    },
};
