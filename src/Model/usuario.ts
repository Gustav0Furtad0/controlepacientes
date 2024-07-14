import initializeDb from "./databaseCon";

export default class Usuario {
    nomeCompleto: string;
    email: string;
    senha: string;
    tipoUsuario: string;
    nomeUsuario: string;
    status: number;

    constructor(nomeUsuario?: string, nomeCompleto?: string, senha?: string, email?: string, tipoUsuario?: string) {
        this.nomeUsuario = nomeUsuario || '';
        this.nomeCompleto = nomeCompleto || '';
        this.senha = senha || '';
        this.email = email || '';
        this.tipoUsuario = tipoUsuario || '';
        this.status = 1;
    }

    static addUser = async (user: Usuario): Promise<number | null> => {
        const db = await initializeDb();
        try {
            const result = await db.run(
                `INSERT INTO usuarios (nomeUsuario, nomeCompleto, senha, email, tipoUsuario, status) VALUES (?, ?, ?, ?, ?, 1)`,
                [user.nomeUsuario, user.nomeCompleto, user.senha, user.email, user.tipoUsuario]
            );
            return result.lastID ?? null;
        } catch (error) {
            console.log(error);
            return null;
        } finally {
            db.close();
        }
    };

    static getAllUsers = async (): Promise<any[]> => {
        const db = await initializeDb();
        try {
            return db.all("SELECT * FROM usuarios ORDER BY nomeCompleto ASC");
        } catch (error) {
            console.log(error);
            return [];
        } finally {
            db.close();
        }
    };

    static getUsersBy = async (param: string, value: string): Promise<any> => {
        const db = await initializeDb();
        try {
            const allowedParams = ['nomeUsuario', 'nomeCompleto', 'email', 'tipoUsuario', 'status'];
            if (!allowedParams.includes(param)) {
                throw new Error("Parâmetro de busca inválido.");
            }
            return db.all(`SELECT * FROM usuarios WHERE ${param} = ?`, [value]);
        } catch (error) {
            console.log(error);
            return null;
        } finally {
            db.close();
        }
    };

    static getUserBy = async (param: string, value: string): Promise<any> => {
        const db = await initializeDb();
        try {
            const allowedParams = ['nomeUsuario', 'nomeCompleto', 'email', 'tipoUsuario', 'status'];
            if (!allowedParams.includes(param)) {
                throw new Error("Parâmetro de busca inválido.");
            }
            return db.get(`SELECT * FROM usuarios WHERE ${param} = ?`, [value]);
        } catch (error) {
            console.log(error);
            return null;
        } finally {
            db.close();
        }
    };

    static getUserByLikeInit = async (param: string, value: string): Promise<any[]> => {
        const db = await initializeDb();
        try {
            const allowedParams = ['nomeUsuario', 'nomeCompleto', 'email', 'tipoUsuario', 'status'];
            if (!allowedParams.includes(param)) {
                throw new Error("Parâmetro de busca inválido.");
            }

            value = value + "%";
            return db.all(`SELECT * FROM usuarios WHERE UPPER(${param}) LIKE UPPER(?)`, [value]);
        } catch (error) {
            console.log(error);
            return [];
        } finally {
            db.close();
        }
    };

    static getUserPassword = async (usuario: string): Promise<any> => {
        const db = await initializeDb();
        try {
            return db.get(`SELECT senha FROM usuarios WHERE nomeUsuario = ?`, [usuario]);
        } catch (error) {
            console.log(error);
            return null;
        } finally {
            db.close();
        }
    }
}
