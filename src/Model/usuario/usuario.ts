import pool from "../databasePool";
import bcrypt from "bcrypt";

const saltRounds = 10;

export default class Usuario {
    static login = async (usuario: string, senha: string) => {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM usuarios WHERE usuario = $1`, [usuario], (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    if (result.rows.length > 0) {
                        if (bcrypt.compareSync(senha, result.rows[0].senha)) {
                            resolve(result.rows);
                        } else {
                            reject("Senha incorreta");
                        }
                    } else {
                        reject("Usuário não encontrado");
                    }
                }
            });
        });
    };

    static hashPassword = async (senha: string) => {
        return new Promise((resolve, reject) => {
            bcrypt.hash(senha, saltRounds, function (err, hash) {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(hash);
                }
            });
        });
    }

    static createUser = async (usuario: string, senha: string, nome: string, email: string, tipo_usuario: string, cargo: string) => {
        const passhash = await Usuario.hashPassword(senha);
        return new Promise((resolve, reject) => {
            pool.query(`INSERT INTO usuarios (usuario, senha, nome, email, tipo_usuario, cargo) VALUES ($1, $2, $3, $4, $5, $6)`, [usuario, passhash, nome, email, tipo_usuario, cargo], (err, result) => {
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
            pool.query(`SELECT * FROM usuarios WHERE id = $1`, [id], (err, result) => {
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
            pool.query(`SELECT * FROM usuarios WHERE UPPER(nome) LIKE UPPER($1)`, [name], (err, result) => {
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

    static getUserByUsername = async (username: string) => {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM usuarios WHERE usuario = $1`, [username], (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    console.log(result.rows)
                    resolve(result.rows);
                }
            });
        });
    }

    static verifyUser = async (usuario: string, senha: string) => {
        const user = await Usuario.getUserByUsername(usuario) as any[];
        if (user.length > 0) {
            if (bcrypt.compareSync(senha, user[0].senha)) {
                return user;
            } else {
                throw new Error("Senha incorreta");
            }
        } else {
            throw new Error("Usuário não encontrado");
        }
    };
}
