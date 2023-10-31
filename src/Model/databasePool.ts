import { Pool } from "pg";

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "test",
    password: "147258",
    port: 5432
});

export default pool;
