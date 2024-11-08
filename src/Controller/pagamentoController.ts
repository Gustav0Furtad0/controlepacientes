import {Request, Response} from "express";
import Pagamento from "../Model/pagamento";

export const addPagamento = async (req: Request, res: Response) => {
    try {
        let pagamento = new Pagamento( 
            req.body.dataPagamento,
            req.body.valorPago,
            req.body.usuarioId,
            req.body.tipoPagamento,
            req.body.cobrancaId
        );
        let result = await pagamento.save();
        if(result){
            res.json({
                message: "Cobrança criada com sucesso!",
                code: 200,
            });
        } else {
            res.json({
                message: "Erro ao criar cobrança!",
                code: 500,
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            message: "Erro ao criar cobrança!",
            code: 500,
        });
    }
}

export const getAllPagamentos = async (req: Request, res: Response) => {
    try {   
        const pagamentos = await Pagamento.get({});
        res.json(pagamentos);
    } catch (error) {
        res.json({
            message: "Erro ao buscar pagamentos!",
            code: 500,
        });
    }
}

export const getPagamentoById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const pagamento = await Pagamento.get({ id: Number(id) });
        if (pagamento.length > 0) {
            res.json(pagamento[0]);
        } else {
            res.json({
                message: "Cobrança não encontrada!",
                code: 404,
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            message: "Erro ao buscar cobrança!",
            code: 500,
        });
    }
}

export const getPagamentoByParam = async (req: Request, res: Response) => {
    try {
        const params = req.query;
        const pagamentos = await Pagamento.get(params);
        if (pagamentos.length > 0) {
            res.json(pagamentos);
        } else {
            res.json({
                message: "Nenhuma cobrança encontrada com os parâmetros fornecidos!",
                code: 404,
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            message: "Erro ao buscar pagamento!",
            code: 500,
        });
    }
}

export const deletePagamento = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await Pagamento.delete(Number(id));
        if(result){
            res.json({
                message: "Cobrança deletada com sucesso!",
                code: 200,
            });
        } else {
            res.json({
                message: "Erro ao deletar cobrança!",
                code: 500,
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            message: "Erro ao deletar cobrança!",
            code: 500,
        });
    }
}

export const updatePagamento = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await Pagamento.update(req.body, Number(id));
        if(result){
            res.json({
                message: "Cobrança atualizada com sucesso!",
                code: 200,
            });
        } else {
            res.json({
                message: "Erro ao atualizar consulta!",
                code: 500,
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            message: "Erro ao atualizar consulta!",
            code: 500,
        });
    }
}