import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default class Parcela {
    cobrancaId: number;
    numeroParcela: number;
    valor: number;
    vencimento: string;
    status: string;
    pagamentoId?: number;

    constructor(
        cobrancaId: number, 
        numeroParcela: number, 
        valor: number, 
        vencimento: string, 
        status: string,
        pagamentoId?: number
    ) {
        this.cobrancaId = cobrancaId;
        this.numeroParcela = numeroParcela;
        this.valor = valor;
        this.vencimento = vencimento;
        this.status = status;
        this.pagamentoId = pagamentoId;
    }

    async save() {
        try {
            const result = await prisma.parcela.create({
                data: {
                    cobrancaId: this.cobrancaId, 
                    numeroParcela: this.numeroParcela, 
                    valor: this.valor, 
                    vencimento: this.vencimento, 
                    status: this.status,
                    pagamentoId: this.pagamentoId !== undefined ? this.pagamentoId : null,
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
            const updatedCobranca = await prisma.parcela.update({
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
            const result = await prisma.parcela.delete({
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
                if (params.id) filter.id = Number(params.id);
                if (params.cobrancaId) filter.pacienteId = Number(params.pacienteId);
                if (params.parcela) filter.parcela = Number(params.parcela);
            }

            const parcelas = await prisma.parcela.findMany({
                where: filter,
                include: {
                    cobranca: true,
                    pagamento: true,
                },
                orderBy: {
                    numeroParcela: 'asc'
                }
            });

            return parcelas.map(parcela => ({
                id: parcela.id,
                cobrancaId: parcela.cobrancaId,
                numeroParcela: parcela.numeroParcela,
                valor: parcela.valor,
                vencimento: parcela.vencimento,
                status: parcela.status,
                pagamentos: parcela.pagamento
            }));
        } catch (error) {
            console.error("Error cobrancas:", error);
            throw error;
        }
    }
}