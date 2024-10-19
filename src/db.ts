require('dotenv').config();
import { Pool, QueryConfig, QueryResult } from 'pg';

const pool: Pool = new Pool({
    user: process.env.POSTGREUSER,
    host: process.env.POSTGREHOST,
    database: process.env.POSTGREDATABASE,
    password: process.env.POSTGREPASSWORD,
    port: Number(process.env.POSTGREPORT)
});

const logQuery = (query: string, params?: any[]) => {
    console.log('Consulta:', query);
    if (params && params.length > 0) {
        console.log('Valores:', params);
    }
};

const originalQuery = pool.query.bind(pool);
pool.query = (query: string | QueryConfig<any[]>, ...params: any[]): Promise<QueryResult<any>> => {
    if (typeof query === 'string') {
        logQuery(query, params);
    } else {
        logQuery(query.text, query.values);
    }
    return originalQuery(query, ...params);
};

export default pool;