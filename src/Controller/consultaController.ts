import { Request, Response } from "express";
import Consulta from "../Model/consulta";

export const getAllConsultas = async (req: Request, res: Response) => {
    try {
        const consultas = await Consulta.get({});
        res.json(consultas);
    } catch (error) {
        res.json({
            message: "Erro ao buscar consultas!",
            code: 500,
        });
    }
}

export const addConsulta = async (req: Request, res: Response) => {
    try {
        let consulta = new Consulta(
            req.body.dataInico || null,
            req.body.dataFim || null,
            req.body.pacienteId || null,
            req.body.clinicoId || null,
            req.body.userId || null,
            req.body.descricao || "",
            req.body.tipoConsulta || "",
            req.body.abertoEm || null
        );
        let result = await consulta.save();
        if(result){
            res.json({
                message: "Consulta criada com sucesso!",
                code: 200,
            });
        } else {
            res.json({
                message: "Erro ao criar consulta!",
                code: 500,
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            message: "Erro ao criar consulta!",
            code: 500,
        });
    }
}

export const getConsultaById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const consulta = await Consulta.get({ id: Number(id) });
        if (consulta.length > 0) {
            res.json(consulta[0]);
        } else {
            res.json({
                message: "Consulta não encontrada!",
                code: 404,
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            message: "Erro ao buscar consulta!",
            code: 500,
        });
    }
}

export const getConsultaByParam = async (req: Request, res: Response) => {
    try {
        const params = req.query;  // Usando query parameters para flexibilidade
        const consultas = await Consulta.get(params);
        if (consultas.length > 0) {
            res.json(consultas);
        } else {
            res.json({
                message: "Nenhuma consulta encontrada com os parâmetros fornecidos!",
                code: 404,
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            message: "Erro ao buscar consulta!",
            code: 500,
        });
    }
}

export const updateConsulta = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await Consulta.update(req.body, Number(id));
        if(result){
            res.json({
                message: "Consulta atualizada com sucesso!",
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

export const deleteConsulta = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await Consulta.delete(Number(id));
        if(result){
            res.json({
                message: "Consulta deletada com sucesso!",
                code: 200,
            });
        } else {
            res.json({
                message: "Erro ao deletar consulta!",
                code: 500,
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            message: "Erro ao deletar consulta!",
            code: 500,
        });
    }
}
