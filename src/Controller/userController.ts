import {Request, Response} from "express";
import Usuario from "../Model/usuario/usuario";
import * as hash from "./Auth/hash";

export const getAllUsers = async (req: Request, res: Response) => {
    const users = await Usuario.getAllUsers();
    res.json(users);
}

export const getUserById = async (req: Request, res: Response) => {
    const user = await Usuario.getUserBy("id", req.params.id);
    res.json(user);
}

export const getUserLikeName = async (req: Request, res: Response) => {
    const user = await Usuario.getUserByLikeInit("nome", req.params.name);
    res.json(user);
}

export const createUser = async (req: Request, res: Response) => {
    const hashPass = await hash.generateHash(req.body.senha);
    let user = new Usuario(req.body.usuario, hashPass as string, req.body.nome, req.body.email, req.body.tipo_usuario, req.body.cargo);
    let addData = await Usuario.addUser(user);

    if (addData ) {
        res.json({
            message: "Erro ao criar usuário!",
            code: 500,
        });
    }

    res.json({
        message: "Usuário criado com sucesso!",
        code: 200,
    });
} 

export const login = async (req: Request, res: Response) => {
    const user = await Usuario.getUserPassword(req.body.usuario) as any;

    if (!user) {
        res.json({
            message: "Usuário não encontrado!",
            code: 500,
        });
    }

    const compare = await hash.comparePassword(req.body.senha, user.senha);
    if (compare) {
        res.json({
            message: "Login efetuado com sucesso!",
            code: 200,
        });
    } else {
        res.json({
            message: "Senha incorreta!",
            code: 500,
        });
    }
}