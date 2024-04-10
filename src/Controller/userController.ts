import {Request, Response} from "express";
import Usuario from "../Model/usuario";
import * as hash from "./Auth/hash";
import {generateToken, verifyToken} from "./Auth/webToken";

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
    let user = new Usuario(req.body.nome, req.body.email, hashPass as string, req.body.cargo, req.body.tipo_usuario, req.body.usuario);
    
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

export const login = async (req: Request, res: Response) => {
    try {
        console.log(req.body.username, req.body.password)
        const user = await Usuario.getUserPassword(req.body.username);

        if (!user) {
            return res.status(404).json({
                message: "Usuário não encontrado!",
                code: 404,
            });
        }

        const compare = await hash.comparePassword(req.body.password, (user as { senha: string })['senha']);

        if (!compare) {
            return res.status(401).json({
                message: "Senha incorreta!",
                code: 401,
            });
        }

        const userPayload = { 
            id: (user as { id: string }).id,
            username: (user as { usuario: string }).usuario,
            tipo_usuario: (user as { tipo_usuario: string }).tipo_usuario,
        };

        const token = generateToken(userPayload, '15m');

        console.log(await verifyToken(token));

        res.json({
            message: "Login realizado com sucesso!",
            code: 200,
            token: token,
            user: userPayload,
        }); 
    } catch (error) {
        console.error("Erro durante o login:", error);
        res.status(500).json({
            message: "Erro interno do servidor",
            code: 500,
        });
    }
};