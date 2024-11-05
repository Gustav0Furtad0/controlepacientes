import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default class Pagamento{
    dataPagamento: string;
    valorPago: number;
    usuarioId: number;
    tipoPagamento: string;
    cobrancaId?: number;

    constructor(
        dataPagamento: string, 
        valorPago: number, 
        usuarioId: number, 
        tipoPagamento: string,
        cobrancaId?: number
    ) {
        this.dataPagamento = dataPagamento;
        this.valorPago = valorPago;
        this.usuarioId = usuarioId;
        this.tipoPagamento = tipoPagamento;
        this.cobrancaId = cobrancaId;
    }

    async save() {
        try {
            const result = await prisma.pagamento.create({
                data: {
                    dataPagamento: this.dataPagamento, 
                    valorPago: this.valorPago, 
                    usuarioId: this.usuarioId, 
                    tipoPagamento: this.tipoPagamento,
                    cobrancaId: this.cobrancaId !== undefined ? this.cobrancaId : null
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
            const updatedCobranca = await prisma.pagamento.update({
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
            const result = await prisma.pagamento.delete({
                where: { id },
            });
            return result;
        } catch (error) {
            console.error("Error deleting consulta:", error);
            throw error;
        }
    }

    static getCobrancaBy = async (param: string, value: string): Promise<any[]> => {
        const allowedParams = ['cobrancaId', 'vencimento', 'status'];
        if (!allowedParams.includes(param)) {
            throw new Error("Parâmetro de busca inválido.");
        }

        try {
            return await prisma.pagamento.findMany({
                where: {
                    [param]: value
                }
            });
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    static async get(params: Record<string, any>) {
        try {
            const filter: any = {};
            
            if (params) {
                if (params.id) filter.id = Number(params.id);
                if (params.cobrancaId) filter.cobrancaId = Number(params.cobrancaId);
                if (params.valorPago) filter.valorPago = Number(params.valorPago);
                if (params.dataPagamento) filter.dataPagamento = params.dataPagamento;
            }

            const pagamentos = await prisma.pagamento.findMany({
                where: filter,
                include: {
                    cobranca: true,
                    usuario: true
                },
                orderBy: {
                    dataPagamento: 'desc'
                }
            });

            return pagamentos.map(pagamento => {
                const pagamentoObj: any = {
                    id: pagamento.id,
                    dataPagamento: pagamento.dataPagamento,
                    valorPago: pagamento.valorPago,
                    usuario: {
                        id: pagamento.usuario.uid,
                        nome: pagamento.usuario.nomeCompleto,
                        nomeUsuario: pagamento.usuario.nomeUsuario,
                        email: pagamento.usuario.email,
                        tipoUsuario: pagamento.usuario.tipoUsuario,
                        status: pagamento.usuario.status,
                    },
                    tipoPagamento: pagamento.tipoPagamento,
                    cobrancaId: pagamento.cobrancaId,
                };

                if (pagamento.cobranca) {
                    pagamentoObj.cobranca = {
                        id: pagamento.cobranca.id,
                        pacienteId: pagamento.cobranca.pacienteId,
                        tipo: pagamento.cobranca.tipo,
                        descricao: pagamento.cobranca.descricao,
                        valorTotal: pagamento.cobranca.valorTotal,
                        criadoEm: pagamento.cobranca.criadoEm,
                    };
                }

                return pagamentoObj;
            });
        } catch (error) {
            console.error("Error cobrancas:", error);
            throw error;
        }
    }
}