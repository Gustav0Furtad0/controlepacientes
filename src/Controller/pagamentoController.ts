import { Request, Response } from "express";
import Pagamento from "../Model/pagamento";
import { getSessionInfo } from "./session";

export const getAllPagamentos = async (req: Request, res: Response) => {
    try {
        console.log("getAllPagamentos");
        const pagamentos = await Pagamento.get({});
        res.json(pagamentos);
    } catch (error) {
        console.log(error);
        res.json({
            message: "Erro ao buscar pagamentos!",
            code: 500,
        });
    }
}

export const addPagamento = async (req: Request, res: Response) => {
    try {
        const { consultaId, valor, status, pacienteId } = req.body;
        const session = getSessionInfo(req, res);
        const userId = session ? (session as any).uid : null;
        const pagamento = new Pagamento(null, consultaId, userId, valor, status, null, pacienteId);
        const result = await pagamento.save();
        if(result){
            res.json({
                message: "Pagamento criado com sucesso!",
                code: 201,
            });
        } else {
            res.json({
                message: "Erro ao criar pagamento!",
                code: 500,
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            message: "Erro ao criar pagamento!",
            code: 500,
        });
    }
}

export const getPagamentoById = async (req: Request, res: Response) => {
    console.log("getPagamentoById");
    try {
        const { id } = req.params;
        const pagamento = await Pagamento.get({ id: Number(id) });
        res.json(pagamento);
    } catch (error) {
        res.json({
            message: "Erro ao buscar pagamento!",
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
                message: "Nenhuma consulta encontrada com os parâmetros fornecidos!",
                code: 404,
            });
        }
    } catch (error) {
        res.json({
            message: "Erro ao buscar pagamento!",
            code: 500,
        });
    }
}

export const updatePagamento = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await Pagamento.update(req.body, Number(id));

    if(result){
        res.json({
            message: "Pagamento atualizado com sucesso!",
            code: 200,
        });
    } else {
        res.json({
            message: "Erro ao atualizar pagamento!",
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
                message: "Pagamento deletado com sucesso!",
                code: 200,
            });
        } else {
            res.json({
                message: "Erro ao deletar pagamento!",
                code: 500,
            });
        }
    } catch (error) {
        res.json({
            message: "Erro ao deletar pagamento!",
            code: 500,
        });
    }
}