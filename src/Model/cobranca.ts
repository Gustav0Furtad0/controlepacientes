import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default class Cobranca{
    pacienteId: number;
    usuarioId: number;
    tipo: string;
    descricao: string;
    valorTotal: number;
    criadoEm: string;

    constructor(
        pacienteId: number,
        usuarioId: number,
        tipo: string,
        descricao: string,
        valorTotal: number,
        criadoEm: string
    ) {
        this.pacienteId = pacienteId;
        this.usuarioId = usuarioId;
        this.tipo = tipo;
        this.descricao = descricao;
        this.valorTotal = valorTotal;
        this.criadoEm = criadoEm;
    }

    async save() {
        try {
            const result = await prisma.cobranca.create({
                data: {
                    pacienteId: this.pacienteId,
                    usuarioId: this.usuarioId,
                    tipo: this.tipo,
                    descricao: this.descricao,
                    valorTotal: this.valorTotal,
                    criadoEm: this.criadoEm
                },
            });
            return result;
        } catch (error) {
            console.error("Error creating consulta:", error);
            throw error;
        }
    }

    static async update(params: Record<string, any>, id: number) {
        try {
            const updatedCobranca = await prisma.cobranca.update({
                where: { id },
                data: {
                    ...params,
                },
            });
            return updatedCobranca;
        } catch (error) {
            console.error("Error updating consulta:", error);
            throw error;
        }
    }

    static async delete(id: number) {
        try {
            const result = await prisma.cobranca.delete({
                where: { id },
            });
            return result;
        } catch (error) {
            console.error("Error deleting consulta:", error);
            throw error;
        }
    }

    static async get(params: Record<string, any>) {
        try {
            const filter: any = {};
            
            if (params) {
                if (params.pacienteId) filter.pacienteId = Number(params.pacienteId);
                if (params.usuarioId) filter.userId = Number(params.userId);
                if (params.id) filter.id = Number(params.id);
                if (params.valorTotal) filter.valorTotal = Number(params.valorTotal);
            }

            const cobrancas = await prisma.cobranca.findMany({
                where: filter,
                include: {
                    paciente: true,
                    usuario: true,
                    parcelas: true,
                    pagamentos: true
                },
                orderBy: {
                    criadoEm: 'desc'
                }
            });

            return cobrancas.map(cobranca => ({
                id: cobranca.id,
                paciente: {
                    id: cobranca.paciente.id,
                    nome: cobranca.paciente.nomeCompleto,
                    sexo: cobranca.paciente.sexo,
                    cpf: cobranca.paciente.cpf,
                    dataNascimento: cobranca.paciente.dataNascimento,
                    convenio: cobranca.paciente.convenio,
                    telefone: cobranca.paciente.telefone,
                    endereco: cobranca.paciente.endereco,
                    email: cobranca.paciente.email,
                    alergias: cobranca.paciente.alergias,
                    doencas: cobranca.paciente.doencas,
                    nomeCompletoResponsavel: cobranca.paciente.nomeCompletoResponsavel,
                    telefoneResponsavel: cobranca.paciente.telefoneResponsavel,
                    cpfResponsavel: cobranca.paciente.cpfResponsavel,
                },
                usuario: {
                    id: cobranca.usuario.uid,
                    nome: cobranca.usuario.nomeCompleto,
                    nomeUsuario: cobranca.usuario.nomeUsuario,
                    email: cobranca.usuario.email,
                    tipoUsuario: cobranca.usuario.tipoUsuario,
                    status: cobranca.usuario.status,
                },
                criadoEm: cobranca.criadoEm,
                descricao: cobranca.descricao,
                valorTotal: cobranca.valorTotal ,
                tipo: cobranca.tipo
            }));
        } catch (error) {
            console.error("Error cobrancas:", error);
            throw error;
        }
    }
}