import { Pool } from "pg";
import config from "../../config.json";

const con = config.database.con;

const pool = new Pool({
    user: con.user,
    host: con.host,
    database: con.database,
    password: con.password,
    port: con.port
});

export default pool;
