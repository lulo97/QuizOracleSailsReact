const {
    getRedisConnection,
} = require("../../config/redis/redis-connection");

module.exports = {
    inputs: {
      key: {
        type: 'string',
        required: true,
      },
      value: {
        type: 'ref',
        required: true
      },
    },
    fn: async function (inputs, exits) {
        const { key, value } = inputs;

        if (process.env.REDIS_IS_CONNECT === 'N') return exits.success(value); ;

        const redisClient = await getRedisConnection();

        const value_string = JSON.stringify(value);

        const is_exist = await redisClient.exists(key);

        if (is_exist) {
            let result_cache = await redisClient.get(key);
            result_cache = JSON.parse(result_cache);
            return exits.success(result_cache); 
        } else {
            await redisClient.set(key, value_string);
        }

        return exits.success(value); 
    }
}