import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default class Paciente {
    nomeCompleto: string;
    sexo: string;
    cpf: string;
    dataNascimento: string;
    convenio: string;
    telefone: string;
    endereco: string;
    email: string;
    alergias: string;
    doencas: string;
    nomeCompletoResponsavel: string;
    telefoneResponsavel: string;
    cpfResponsavel: string;

    constructor(
        nomeCompleto: string,
        sexo: string,
        cpf: string,
        dataNascimento: string,
        convenio: string,
        telefone: string,
        endereco: string,
        email: string,
        alergias: string,
        doencas: string,
        nomeCompletoResponsavel: string,
        telefoneResponsavel: string,
        cpfResponsavel: string
    ) {
        this.nomeCompleto = nomeCompleto;
        this.sexo = sexo;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.convenio = convenio;
        this.telefone = telefone;
        this.endereco = endereco;
        this.email = email;
        this.alergias = alergias;
        this.doencas = doencas;
        this.nomeCompletoResponsavel = nomeCompletoResponsavel;
        this.telefoneResponsavel = telefoneResponsavel;
        this.cpfResponsavel = cpfResponsavel;
    }

    static async addPaciente(paciente: Paciente): Promise<boolean> {
        try {
            await prisma.paciente.create({
                data: {
                    nomeCompleto: paciente.nomeCompleto,
                    sexo: paciente.sexo,
                    cpf: paciente.cpf,
                    dataNascimento: paciente.dataNascimento,
                    convenio: paciente.convenio,
                    telefone: paciente.telefone,
                    endereco: paciente.endereco,
                    email: paciente.email,
                    alergias: paciente.alergias,
                    doencas: paciente.doencas,
                    nomeCompletoResponsavel: paciente.nomeCompletoResponsavel,
                    telefoneResponsavel: paciente.telefoneResponsavel,
                    cpfResponsavel: paciente.cpfResponsavel,
                },
            });
            return true;
        } catch (error) {
            console.error('Error while adding paciente:', error);
            return false;
        }
    }

    static async getAllPacientes(): Promise<any[]> {
        try {
            return await prisma.paciente.findMany({
                orderBy: { nomeCompleto: 'asc' },
            });
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    static async getPacienteBy(param: string, value: string): Promise<any | null> {
        const allowedParams = [
            'nomeCompleto',
            'sexo',
            'cpf',
            'dataNascimento',
            'convenio',
            'telefone',
            'endereco',
            'email',
            'alergias',
            'doencas',
            'nomeCompletoResponsavel',
            'telefoneResponsavel',
            'cpfResponsavel',
        ];
        if (!allowedParams.includes(param)) {
            throw new Error('Parâmetro de busca inválido.');
        }

        try {
            return await prisma.paciente.findFirst({
                where: {
                    [param]: value,
                },
            });
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    static async getPacienteByLike(param: string, value: string): Promise<any[]> {
        const allowedParams = [
            'nomeCompleto',
            'sexo',
            'cpf',
            'dataNascimento',
            'convenio',
            'telefone',
            'endereco',
            'email',
            'alergias',
            'doencas',
            'nomeCompletoResponsavel',
            'telefoneResponsavel',
            'cpfResponsavel',
        ];
        if (!allowedParams.includes(param)) {
            throw new Error('Parâmetro de busca inválido.');
        }

        try {
            return await prisma.paciente.findMany({
                where: {
                    [param]: {
                        contains: value,
                        mode: 'insensitive'
                    },
                },
            });
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    static async updatePaciente(paciente: Paciente): Promise<boolean> {
        try {
            await prisma.paciente.update({
                where: { cpf: paciente.cpf },
                data: {
                    nomeCompleto: paciente.nomeCompleto,
                    sexo: paciente.sexo,
                    dataNascimento: paciente.dataNascimento,
                    convenio: paciente.convenio,
                    telefone: paciente.telefone,
                    endereco: paciente.endereco,
                    email: paciente.email,
                    alergias: paciente.alergias,
                    doencas: paciente.doencas,
                    nomeCompletoResponsavel: paciente.nomeCompletoResponsavel,
                    telefoneResponsavel: paciente.telefoneResponsavel,
                    cpfResponsavel: paciente.cpfResponsavel,
                },
            });
            return true;
        } catch (error) {
            console.error('Error while updating paciente:', error);
            return false;
        }
    }
}