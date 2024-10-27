import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
        try {
            const result = await prisma.usuario.create({
                data: {
                    nomeUsuario: user.nomeUsuario,
                    nomeCompleto: user.nomeCompleto,
                    senha: user.senha,
                    email: user.email,
                    tipoUsuario: user.tipoUsuario,
                    status: user.status
                }
            });
            return result.uid;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    static getAllUsers = async (): Promise<any[]> => {
        try {
            return await prisma.usuario.findMany({
                orderBy: { nomeCompleto: 'asc' }
            });
        } catch (error) {
            console.log(error);
            return [];
        }
    };

    static getUsersBy = async (param: string, value: string): Promise<any[]> => {
        const allowedParams = ['nomeUsuario', 'nomeCompleto', 'email', 'tipoUsuario', 'status'];
        if (!allowedParams.includes(param)) {
            throw new Error("Parâmetro de busca inválido.");
        }

        try {
            return await prisma.usuario.findMany({
                where: {
                    [param]: value
                }
            });
        } catch (error) {
            console.log(error);
            return [];
        }
    };

    static getUserBy = async (param: string, value: string): Promise<any | null> => {
        const allowedParams = ['nomeUsuario', 'nomeCompleto', 'email', 'tipoUsuario', 'status'];
        if (!allowedParams.includes(param)) {
            throw new Error("Parâmetro de busca inválido.");
        }

        try {
            return await prisma.usuario.findFirst({
                where: {
                    [param]: value
                }
            });
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    static getUserByLikeInit = async (param: string, value: string): Promise<any[]> => {
        const allowedParams = ['nomeUsuario', 'nomeCompleto', 'email', 'tipoUsuario', 'status'];
        if (!allowedParams.includes(param)) {
            throw new Error("Parâmetro de busca inválido.");
        }

        try {
            return await prisma.usuario.findMany({
                where: {
                    [param]: { startsWith: value, mode: 'insensitive' }
                }
            });
        } catch (error) {
            console.log(error);
            return [];
        }
    };

    static getUserPassword = async (usuario: string): Promise<any | null> => {
        try {
            return await prisma.usuario.findFirst({
                where: { nomeUsuario: usuario },
                select: { senha: true }
            });
        } catch (error) {
            console.log(error);
            return null;
        }
    };
}