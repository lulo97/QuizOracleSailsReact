const { getConnection } = require("../../../config/database/db-connection");
const oracledb = require("oracledb");

module.exports = {
    inputs: {},

    exits: {},

    fn: async function () {
        const connection = await getConnection();
        
        const result = await connection.execute(`SELECT sysdate FROM dual`);

        return `Hello, World!, ${result.rows}`;
    },
};
