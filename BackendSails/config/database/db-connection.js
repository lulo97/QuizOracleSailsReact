const oracledb = require('oracledb');

let pool;

const DB_CONFIG = {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    connectString: `${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_SERVICE}`,
    poolMin: Number(process.env.DB_POOL_MIN),
    poolMax: Number(process.env.DB_POOL_MAX),
    poolIncrement: Number(process.env.DB_POOL_INCREMENT),
}

async function initConnectionPool() {
    try {
        if (!pool) {
            oracledb.initOracleClient({ libDir: process.env.DB_CLENT_PATH });
            pool = await oracledb.createPool(DB_CONFIG);
            console.log("Oracle connection pool initialized.");
        }
    } catch (err) {
        console.error("Error initializing connection pool:", err);
    }
}

// Get a connection from the pool
async function getConnection() {
    if (!pool) {
        await initConnectionPool();  // Initialize the pool if not yet initialized
    }
    return pool.getConnection();
}

// Close the pool
async function closePool() {
    if (pool) {
        try {
            await pool.close();
            console.log("Oracle connection pool closed.");
        } catch (err) {
            console.error("Error closing connection pool:", err);
        }
    }
}

module.exports = {
    getConnection,
    closePool,
    DB_CONFIG
};
