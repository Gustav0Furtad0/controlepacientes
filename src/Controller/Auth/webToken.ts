import jwt from "jsonwebtoken";
import config from "../../../config.json"

const secretKey = config.server.secret;

export const generateToken = (payload: object, expiresIn: string) => {
    return jwt.sign(payload, secretKey, { expiresIn });
}

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, secretKey);
    } catch (err: any) {
        return err.message;
    }
}
