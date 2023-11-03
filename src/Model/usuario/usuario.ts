import pool from "../databasePool";

export default class Usuario {

    nome: string;
    email: string;
    senha: string;
    cargo: string;
    tipo_usuario: number;
    usuario: string = '';

    constructor(nome?: string, email?: string, senha?: string, cargo?: string, tipo_usuario?: number, usuario?: string) {
        this.nome = nome || '';
        this.email = email || '';
        this.senha = senha || '';
        this.cargo = cargo || '';
        this.tipo_usuario = tipo_usuario || 0;
        this.usuario = usuario || '';
    }

    static addUser = async (user: Usuario) => {
        return new Promise((resolve, reject) => {
            pool.query(`INSERT INTO usuarios (usuario, senha, nome, email, tipo_usuario, cargo) VALUES ($1, $2, $3, $4, $5, $6)`, [user.usuario, user.senha, user.nome, user.email, user.tipo_usuario, user.cargo], (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    };

    static getAllUsers = () => {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM userdata", (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res.rows);
                }
            });
        });
    };

    static getUserBy = async (param: string, value: string) => {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM userdata WHERE $1 = $2`, [param, value], (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    console.log(result.rows)
                    resolve(result.rows[0]);
                }
            });
        });
    };

    static getUserByLikeInit = async (param: string,value: string) => {
        value = value + "%";
        console.log("Procurando por: " + value + " em " + param)
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM usuarios WHERE UPPER(${param}) LIKE UPPER('${value}');`, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(result.rows);
                }
            });
        });
    };

    static getUserPassword = async (usuario: string) => {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT senha FROM userprofile WHERE usuario = $1`, [usuario], (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(result.rows[0]);
                }
            });
        });
    }
}
