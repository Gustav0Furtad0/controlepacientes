import {Request, Response} from "express";
import Usuario from "../Model/usuario/usuario";
import * as hash from "./Auth/hash";
import {generateToken, verifyToken} from "./Auth/webToken";

export const getAllUsers = async (req: Request, res: Response) => {
    console.log("Get all users")
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
        const users = await Usuario.getAllUsers();
        res.json(users);
    }
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
    let user = new Usuario(req.body.nome, req.body.email, hashPass as string, req.body.cargo, req.body.tipo_usuario, req.body.usuario);
    let addData = await Usuario.addUser(user);

    if (addData) {
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

    if (!compare) {
        res.json({
            message: "Senha incorreta!",
            code: 500,
        });
    }

    const userPayload = { 
        id: user.id,
        username: user.usuario,
        tipo_usuario: user.tipo_usuario,
    };

    const token = generateToken(userPayload, '1m');

    res.json({
        message: "Login realizado com sucesso!",
        code: 200,
        token: token,
    });

}