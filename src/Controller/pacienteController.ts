import {Request, Response} from "express";
import Paciente from "../Model/paciente";
import {verifyToken} from "./Auth/webToken";

export const getAllPacientes = async (req: Request, res: Response) => {
    if (!req.headers.authorization) {
        res.json({
            message: "Token não encontrado!",
            code: 500,
        });
    }
    const token = req.headers.authorization as string;
    const verify = await verifyToken(token as string);
    if (!verify) {
        res.json({
            message: "Token inválido!",
            code: 500,
        });
    }else {
        const users = await Paciente.getAllPacientes();
        res.json(users);
    }
}

export const addPaciente = async (req: Request, res: Response) => {
    let paciente = new Paciente(req.body.nome, 
        req.body.cpf, 
        req.body.rg || "",
        req.body.data_nascimento || null,
        req.body.sexo || "",
        req.body.cep || "", 
        req.body.convenio || "",
        req.body.matricula || "",
        req.body.plano || "", 
        req.body.validade || "",
        req.body.tipo_sanguineo || "", 
        req.body.fator_rh || "", 
        req.body.alergias || "", 
        req.body.medicamentos || "", 
        req.body.cirurgias || "", 
        req.body.observacoes || "",
        req.body.nome_responsavel || "", 
        req.body.telefone_responsavel || "", 
        req.body.email_responsavel || "", 
        req.body.parentesco || "");
    let result = await paciente.addPaciente()
    if(result){
        res.json({
            message: "Paciente criado com sucesso!",
            code: 200,
        });
    } else {
        res.json({
            message: "Erro ao criar paciente!",
            code: 500,
        });
    }
}

export const getPacienteById = async (req: Request, res: Response) => {
    const param = req.params.param;
    const value = req.params.value;
    const user = await Paciente.getPacienteBy(param, value);
    res.json(user);
}