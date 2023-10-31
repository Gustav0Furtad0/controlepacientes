import pool from "../databasePool";

export default class Usuario {

    static getUsers = async () => {
        /**
         * Retorna todos os usuários
         * @param params em SQL
         */
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM person", (err, res) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(res.rows);
                }
            });
        });
    };

    static getUserById = async (id: number) => {
        /**
         * Retorna um usuário pelo id
         * @param id 
         */
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM person WHERE id = $1`, [id], (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    console.log(result.rows)
                    resolve(result.rows);
                }
            });
        });
    };

    static getUserByName = async (name: string) => {
        /**
         * Retorna um usuário pelo nome
         * @param name 
         */
        name = name + "%";
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM person WHERE UPPER(name) LIKE UPPER($1)`, [name], (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    console.log(result.rows)
                    resolve(result.rows);
                }
            });
        });
    };

}
