import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './webToken';

const verifyTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({   
                message: "Token não fornecido!",
                code: 401,
            });
        }

        let token = req.headers.authorization as string;
        token = token.split(" ")[1];
        const verify = await verifyToken(token as string);
        
        if (typeof verify !== "object") {
            if (verify === "jwt expired") {
                return res.status(403).json({
                    message: "Token expirado!",
                    code: 403,
                });
            }
            return res.status(401).json({
                message: "Token inválido!",
                code: 401,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Erro interno!",
            code: 500,
        });
    }
    next();
};

export default verifyTokenMiddleware;
