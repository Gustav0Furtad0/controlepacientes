import {Request, Response} from "express";
import Usuario from "../Model/usuario";
import * as hash from "./Auth/hash";
import {generateToken, verifyToken} from "./Auth/webToken";

export const login = async (req: Request, res: Response) => {
    try {
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

        res.json({
            message: "Login realizado com sucesso!",
            code: 200,
            token: token,
            user: userPayload,
        }); 
    } catch (error) {
        console.error("Erro durante o login:", error);
        res.status(500).json({
            message: "Erro interno do servidor: " + error,
            code: 500,
        });
    }
};