import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default class ConsultaArquivo {
    consultaId: number;
    caminho: string;
    nome: string;

    constructor(consultaId: number, caminho: string, nome: string) {
        this.consultaId = consultaId;
        this.caminho = caminho;
        this.nome = nome;
    }

    async save() {
        try {
            const result = await prisma.consultaArquivo.create({
                data: {
                    consultaId: this.consultaId,
                    caminho: this.caminho,
                    nome: this.nome,
                },
            });
            return result;
        } catch (error) {
            console.error("Error creating consultaArquivo:", error);
            throw error;
        }
    }

    static async create(data: { consultaId: number; caminho: string; nome: string }) {
        const arquivo = new ConsultaArquivo(data.consultaId, data.caminho, data.nome);
        return await arquivo.save();
    }
}