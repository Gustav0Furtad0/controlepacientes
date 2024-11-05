import {Request, Response} from "express";
import Cobranca from "../Model/cobranca";

export const addCobranca = async (req: Request, res: Response) => {
    try {
        let cobranca = new Cobranca( 
            req.body.pacienteId,
            req.body.usuarioId,
            req.body.tipo,
            req.body.descricao || "",
            req.body.valorTotal,
            req.body.criadoEm
        );
        let result = await cobranca.save();
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

export const getAllCobrancas = async (req: Request, res: Response) => {
    try {   
        const cobrancas = await Cobranca.get({});
        res.json(cobrancas);
    } catch (error) {
        res.json({
            message: "Erro ao buscar cobrancas!",
            code: 500,
        });
    }
}

export const getCobrancaById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const cobranca = await Cobranca.get({ id: Number(id) });
        if (cobranca.length > 0) {
            res.json(cobranca[0]);
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

export const getCobrancaByParam = async (req: Request, res: Response) => {
    try {
        const params = req.query;
        const cobrancas = await Cobranca.get(params);
        if (cobrancas.length > 0) {
            res.json(cobrancas);
        } else {
            res.json({
                message: "Nenhuma cobrança encontrada com os parâmetros fornecidos!",
                code: 404,
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            message: "Erro ao buscar cobranca!",
            code: 500,
        });
    }
}

export const deleteCobranca = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await Cobranca.delete(Number(id));
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

export const updateCobranca = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await Cobranca.update(req.body, Number(id));
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