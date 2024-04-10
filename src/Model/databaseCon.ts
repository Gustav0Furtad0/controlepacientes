import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

async function initializeDb(): Promise<Database> {
    const db = await open({
        filename: './database/sqlite/database.db',
        driver: sqlite3.Database
    });
    return db;
}

export default initializeDb;