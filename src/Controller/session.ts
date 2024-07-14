import {Request, Response} from "express";
import Usuario from "../Model/usuario";
import * as hash from "./Auth/hash";
import { decodeToken, generateToken } from "./Auth/webToken";

export const login = async (req: Request, res: Response) => {
    try {
        const user = await Usuario.getUserBy('nomeUsuario', req.body.username);
        if (!user) {
            return res.status(404).json({
                message: "Usuário não encontrado!",
                code: 404,
            });
        }

        const compare = await hash.compareHash(req.body.password, user.senha);

        if (!compare) {
            return res.status(401).json({
                message: "Senha incorreta!",
                code: 401,
            });
        }

        const userPayload = {
            uid: user.uid,
            nomeUsuario: user.nomeUsuario,
            nomeCompleto: user.nomeCompleto,
            email: user.email,
            tipoUsuario: user.tipoUsuario,
            status: user.status,
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

export const getSessionInfo = async (req: Request, res: Response) => {
    try {
        if (req.headers.authorization) {
            let token = req.headers.authorization as string;
            token = token.split(" ")[1];
            const decodedToken = await decodeToken(token);
            if (decodedToken) {
                return decodedToken;
            } else {
                return false;
            }   
        }
    } catch (error) {
        console.log(error)
        return false;
    }
};