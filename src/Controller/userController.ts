import {Request, Response} from "express";
import Usuario from "../Model/usuario";
import * as hash from "./Auth/hash";

export const getAllUsers = async (req: Request, res: Response) => {
    const users = await Usuario.getAllUsers();
    res.json(users);
}

export const getUserById = async (req: Request, res: Response) => {
    const user = await Usuario.getUsersBy("id", req.params.id);
    res.json(user);
}

export const getUsersByType = async (req: Request, res: Response) => {
    const user = await Usuario.getUsersBy("tipoUsuario", req.params.type);
    res.json(user);
}

export const getUserLikeName = async (req: Request, res: Response) => {
    const user = await Usuario.getUserByLikeInit("nome", req.params.name);
    res.json(user);
}

export const createUser = async (req: Request, res: Response) => {
    const hashPass = await hash.generateHash(req.body.senha);
    let user = new Usuario(req.body.nomeUsuario, req.body.nomeCompleto, hashPass as string, req.body.email, req.body.tipoUsuario);
    
    let newUserId = await Usuario.addUser(user);

    if (newUserId === null) {
        return res.json({
            message: "Erro ao criar usuário!",
            code: 500,
        });
    }

    return res.json({
        message: "Usuário criado com sucesso!",
        code: 200,
        userId: newUserId,
    });
};