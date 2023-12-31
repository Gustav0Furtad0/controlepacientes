import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './webToken';

const verifyTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return res.status(401).json({
            message: "Token não fornecido!",
            code: 401,
        });
    }

    const token = req.headers.authorization as string;
    const verify = await verifyToken(token as string);

    console.log(verify);
    
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

    next();
};

export default verifyTokenMiddleware;
