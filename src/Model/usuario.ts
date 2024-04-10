import initializeDb from "./databaseCon";

export default class Usuario {
    nome: string;
    email: string;
    senha: string;
    cargo: string;
    tipo_usuario: number;
    usuario: string;

    constructor(nome?: string, email?: string, senha?: string, cargo?: string, tipo_usuario?: number, usuario?: string) {
        this.nome = nome || '';
        this.email = email || '';
        this.senha = senha || '';
        this.cargo = cargo || '';
        this.tipo_usuario = tipo_usuario || 0;
        this.usuario = usuario || '';
    }

    static addUser = async (user: Usuario): Promise<number | null> => {
        const db = await initializeDb();
        const result = await db.run(
            `INSERT INTO usuarios (usuario, senha, nome, email, tipo_usuario, cargo) VALUES (?, ?, ?, ?, ?, ?)`,
            [user.usuario, user.senha, user.nome, user.email, user.tipo_usuario, user.cargo]
        );
        return result.lastID ?? null;
    };

    static getAllUsers = async (): Promise<any[]> => {
        const db = await initializeDb();
        return db.all("SELECT * FROM usuarios ORDER BY nomeCompleto ASC");
    };

    static getUserBy = async (param: string, value: string): Promise<any> => {
        const db = await initializeDb();
        const allowedParams = ['usuario', 'nome', 'email', 'tipo_usuario', 'cargo'];
        if (!allowedParams.includes(param)) {
            throw new Error("Parâmetro de busca inválido.");
        }

        return db.get(`SELECT * FROM usuarios WHERE ${param} = ?`, [value]);
    };

    static getUserByLikeInit = async (param: string, value: string): Promise<any[]> => {
        const db = await initializeDb();
        const allowedParams = ['usuario', 'nome', 'email', 'tipo_usuario', 'cargo']; // Certifique-se de que esta lista inclua todos os campos pelos quais você permite busca
        if (!allowedParams.includes(param)) {
            throw new Error("Parâmetro de busca inválido.");
        }

        value = value + "%";
        return db.all(`SELECT * FROM usuarios WHERE UPPER(${param}) LIKE UPPER(?)`, [value]);
    }

    static getUserPassword = async (usuario: string): Promise<any> => {
        const db = await initializeDb();
        return db.get(`SELECT senha FROM usuarios WHERE nomeUsuario = ?`, [usuario]);
    }
}
