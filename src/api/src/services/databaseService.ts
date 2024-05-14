import { PoolConnection, Pool, createPool } from "mysql2/promise";

let connectionPool: Pool;

export function getConnection(): Promise<PoolConnection> {
    if (!connectionPool) {
        connectionPool = createPool({
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT as string),
            database: process.env.DB_DATABASE,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT as string),
        });
    }

    return connectionPool.getConnection();
}