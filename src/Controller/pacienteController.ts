import {Request, Response} from "express";
import Paciente from "../Model/paciente";

export const getAllPacientes = async (req: Request, res: Response) => {
    try {
        const users = await Paciente.getAllPacientes();
        res.json(users);
    } catch (error) {
        res.json({
            message: "Erro ao buscar pacientes!",
            code: 500,
        });
    }
}

export const addPaciente = async (req: Request, res: Response) => {
    try {
        let paciente = new Paciente( 
            req.body.nomeCompleto || "",
            req.body.sexo || "",
            req.body.cpf || "",
            req.body.dataNascimento || null,
            req.body.convenio || "",
            req.body.telefone || "",
            req.body.endereco || "",
            req.body.email || "",
            req.body.alergias || "",
            req.body.doencas || "",
            req.body.nomeCompletoResponsavel || "",
            req.body.telefoneResponsavel || "",
            req.body.cpfResponsavel || ""
        );
        let result = await Paciente.addPaciente(paciente) as any;
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
    } catch (error) {
        console.log(error);
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