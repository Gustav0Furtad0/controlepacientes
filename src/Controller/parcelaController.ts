import {Request, Response} from "express";
import Parcela from "../Model/parcela";

export const addParcela = async (req: Request, res: Response) => {
    try {
        let parcela = new Parcela( 
            req.body.cobrancaId,
            req.body.numeroParcela,
            req.body.valor,
            req.body.vencimento,
            req.body.status,
            req.body.pagamentoId
        );
        let result = await parcela.save();
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

export const getAllParcelas = async (req: Request, res: Response) => {
    try {   
        const parcelas = await Parcela.get({});
        res.json(parcelas);
    } catch (error) {
        res.json({
            message: "Erro ao buscar parcelas!",
            code: 500,
        });
    }
}

export const getParcelaById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const parcela = await Parcela.get({ id: Number(id) });
        if (parcela.length > 0) {
            res.json(parcela[0]);
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

export const getParcelaByParam = async (req: Request, res: Response) => {
    try {
        const params = req.query;
        const parcelas = await Parcela.get(params);
        if (parcelas.length > 0) {
            res.json(parcelas);
        } else {
            res.json({
                message: "Nenhuma cobrança encontrada com os parâmetros fornecidos!",
                code: 404,
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            message: "Erro ao buscar parcela!",
            code: 500,
        });
    }
}

export const deleteParcela = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await Parcela.delete(Number(id));
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

export const updateParcela = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await Parcela.update(req.body, Number(id));
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