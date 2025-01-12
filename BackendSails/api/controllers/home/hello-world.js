const { getConnection } = require("../../../config/database/db-connection");
const oracledb = require("oracledb");

module.exports = {
    inputs: {},

    exits: {},

    fn: async function () {
        const connection = await getConnection();
        const result = await connection.execute(`SELECT sysdate FROM dual`);
        console.log(
            await sails.helpers.procedureWrapper("prc_add", {
                p_first_number: 1,
                p_second_number: 2,
                p_refcursor: {
                    type: oracledb.CURSOR,
                    dir: oracledb.BIND_OUT,
                },
            })
        );

        return `Hello, World!, ${result.rows}`;
    },
};
