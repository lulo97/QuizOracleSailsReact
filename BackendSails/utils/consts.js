const oracledb = require("oracledb");

module.exports = {
    CURSOR: {
        type: oracledb.CURSOR,
        dir: oracledb.BIND_OUT,
    },
    VARCHAR2: {
        type: oracledb.STRING,
        dir: oracledb.BIND_OUT,
    },
    SECOND: 1000
};
