import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default class Consulta {
    dataInicio: string;
    dataFim: string;
    pacienteId: number;
    clinicoId: number;
    userId: number;
    descricao: string;
    tipoConsulta: string;
    abertoEm: string;

    constructor(
        dataInicio: string,
        dataFim: string,
        pacienteId: number,
        clinicoId: number,
        userId: number,
        descricao: string = "",
        tipoConsulta: string = "",
        abertoEm: string
    ) {
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
        this.pacienteId = pacienteId;
        this.clinicoId = clinicoId;
        this.userId = userId;
        this.descricao = descricao;
        this.tipoConsulta = tipoConsulta;
        this.abertoEm = abertoEm;
    }

    async save() {
        try {
            const result = await prisma.consulta.create({
                data: {
                    dataInicio: this.dataInicio,
                    dataFim: this.dataFim,
                    pacienteId: this.pacienteId,
                    clinicoId: this.clinicoId,
                    userId: this.userId,
                    abertoEm: this.abertoEm,
                    descricao: this.descricao,
                    tipoConsulta: this.tipoConsulta,
                },
            });
            return result;
        } catch (error) {
            console.error("Error creating consulta:", error);
            throw error;
        }
    }

    static async get(params: Record<string, any>) {
        try {
            const filter: any = {};
            
            if (params) {
                if (params.data) {
                    filter.dataInicio = {
                        gte: params.data + ' 00:00',
                        lt: params.data + ' 23:59'
                    };
                }

                if (params.clinicoId) filter.clinicoId = Number(params.clinicoId);
                if (params.pacienteId) filter.pacienteId = Number(params.pacienteId);
                if (params.userId) filter.userId = Number(params.userId);
                if (params.id) filter.id = Number(params.id);
            }

            const consultas = await prisma.consulta.findMany({
                where: filter,
                include: {
                    paciente: true,
                    clinico: true,
                    consultaArquivos: true
                },
                orderBy: {
                    dataInicio: 'desc'
                }
            });

            return consultas.map(consulta => ({
                id: consulta.id,
                dataInicio: consulta.dataInicio,
                dataFim: consulta.dataFim,
                paciente: {
                    id: consulta.paciente.id,
                    nome: consulta.paciente.nomeCompleto,
                    sexo: consulta.paciente.sexo,
                    cpf: consulta.paciente.cpf,
                    dataNascimento: consulta.paciente.dataNascimento,
                    convenio: consulta.paciente.convenio,
                    telefone: consulta.paciente.telefone,
                    endereco: consulta.paciente.endereco,
                    email: consulta.paciente.email,
                    alergias: consulta.paciente.alergias,
                    doencas: consulta.paciente.doencas,
                    nomeCompletoResponsavel: consulta.paciente.nomeCompletoResponsavel,
                    telefoneResponsavel: consulta.paciente.telefoneResponsavel,
                    cpfResponsavel: consulta.paciente.cpfResponsavel,
                },
                clinico: {
                    id: consulta.clinico.uid,
                    nome: consulta.clinico.nomeCompleto,
                    nomeUsuario: consulta.clinico.nomeUsuario,
                    email: consulta.clinico.email,
                    tipoUsuario: consulta.clinico.tipoUsuario,
                    status: consulta.clinico.status,
                },
                userId: consulta.userId,
                abertoEm: consulta.abertoEm,
                descricao: consulta.descricao,
                tipoConsulta: consulta.tipoConsulta,
                arquivos: consulta.consultaArquivos.map(arquivo => ({
                    id: arquivo.id,
                    caminho: arquivo.caminho,
                    nome: arquivo.nome,
                    criadoEm: arquivo.criadoEm,
                })),
            }));
        } catch (error) {
            console.error("Error fetching consultas:", error);
            throw error;
        }
    }

    static async update(params: Record<string, any>, id: number) {
        try {
            const updatedConsulta = await prisma.consulta.update({
                where: { id },
                data: {
                    ...params,
                },
            });
            return updatedConsulta;
        } catch (error) {
            console.error("Error updating consulta:", error);
            throw error;
        }
    }

    static async delete(id: number) {
        try {
            const deletedConsulta = await prisma.consulta.delete({
                where: { id },
            });
            return deletedConsulta;
        } catch (error) {
            console.error("Error deleting consulta:", error);
            throw error;
        }
    }

    static async verificaHorario(params: Record<string, any>) {
        const { clinicoId, dataInicio, dataFim } = params;

        const result = await prisma.consulta.findFirst({
            where: {
                clinicoId: clinicoId,
                OR: [
                    {
                        dataInicio: {
                            gt: dataInicio,
                            lt: dataFim,
                        },
                    },
                    {
                        dataFim: {
                            gt: dataInicio,
                            lt: dataFim,
                        },
                    },
                    {
                        dataInicio: {
                            lt: dataInicio,
                        },
                        dataFim: {
                            gt: dataInicio,
                        },
                    },
                    {
                        dataInicio: {
                            lt: dataFim,
                        },
                        dataFim: {
                            gt: dataFim,
                        },
                    },
                ],
            },
        });
    
        return result;
    }

    static async verificaHorarioIntervalo(params: Record<string, any>) {
        const { clinicoId, dataInicio, dataFim, horaInicio, horaFim } = params;
    
        const inicioPeriodo = `${dataInicio} ${horaInicio}`;
        const fimPeriodo = `${dataFim} ${horaFim}`;
    
        const result = await prisma.consulta.findMany({
            where: {
                clinicoId: clinicoId,
                dataInicio: {
                    gte: `${dataInicio} 00:00`,
                    lte: `${dataFim} 23:59`,
                },
                OR: [
                    {
                        dataInicio: {
                            gte: inicioPeriodo,
                            lte: fimPeriodo,
                        },
                    },
                    {
                        dataFim: {
                            gte: inicioPeriodo,
                            lte: fimPeriodo,
                        },
                    },
                    {
                        dataInicio: {
                            lt: inicioPeriodo,
                        },
                        dataFim: {
                            gt: fimPeriodo,
                        },
                    },
                ],
            },
            select: {
                dataInicio: true,
                dataFim: true,
            },
        });
    
        return result.map((consulta) => ({
            dia: consulta.dataInicio.slice(0, 10),
            inicio: consulta.dataInicio.slice(11),
            fim: consulta.dataFim.slice(11),
        }));
    }
}