const sqlite3 = require('sqlite3').verbose();

const dbPath = './database/sqlite/database.db';

const db = new sqlite3.Database(dbPath, (err: any) => {
    if (err) {
        console.error(err.message);
        throw err;
    }
    console.log('Conectado ao banco de dados SQLite.');
});

db.close((err: any) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Conexão com o banco de dados fechada.');
});