import { Request, Response, NextFunction } from 'express';
import { verifyToken, updateTokenExpiration, getTokenExpiration } from './webToken';

const verifyTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    let token = "";
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({   
                message: "Token não fornecido!",
                type: "token_erro",
                code: 401,
            });
        }

        token = req.headers.authorization as string;
        token = token.split(" ")[1];
        const verify = await verifyToken(token as string);
        
        if (typeof verify !== "object") {
            if (verify === "jwt expired") {
                return res.status(403).json({
                    message: "Token expirado!",
                    type: "token_erro",
                    code: 403,
                });
            }
            return res.status(401).json({
                message: "Token inválido!",
                type: "token_erro",
                code: 401,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Erro interno!",
            type: "token_erro",
            code: 500,
        });
    }
    const newToken = await updateTokenExpiration(token, '15m');
    res.setHeader('Authorization', `Bearer ${newToken}`);
    next();
};

export default verifyTokenMiddleware;
