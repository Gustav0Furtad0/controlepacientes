import jwt from "jsonwebtoken";
import config from "../../../config.json"

const secretKey = config.server.secret;

export const generateToken = (payload: object, expiresIn: string) => {
    return jwt.sign(payload, secretKey, { expiresIn });
}

export const verifyToken = (token: string) => {
    return new Promise((resolve) => {
        const decodedToken = jwt.verify(token, secretKey);
        resolve(decodedToken);
    });
}
