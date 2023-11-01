import pool from "../databasePool";
import bcrypt from "bcrypt";

const saltRounds = 10;

export default class Usuario {

    static createUser = async (usuario: string, senha: string, nome: string, email: string, tipo_usuario: string, cargo: string) => {
        
        return new Promise((resolve, reject) => {
            pool.query(`INSERT INTO usuarios (usuario, senha, nome, email, tipo_usuario, cargo) VALUES ($1, $2, $3, $4, $5, $6)`, [usuario, senha, nome, email, tipo_usuario, cargo], (err, result) => {
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

    static getUsers = async () => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM usuarios", (err, res) => {
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

    static getUserLikeName = async (name: string) => {
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
