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

export const decodeToken = (token: string) => {
    return new Promise((resolve, reject) => {
        try {
            const decodedToken = jwt.decode(token);
            if (decodedToken) {
                resolve(decodedToken);
            } else {
                reject(new Error("Failed to decode token"));
            }
        } catch (error) {
            reject(error);
        }
    });
};

export const updateTokenExpiration = (token: string, expiresIn: string) => {
    return new Promise((resolve, reject) => {
        try {
            const decodedToken = jwt.verify(token, secretKey) as jwt.JwtPayload;
            const { iat, exp, ...payload } = decodedToken;
            const newToken = jwt.sign(payload, secretKey, { expiresIn });
            resolve(newToken);
        } catch (error) {
            reject(error);
        }
    });
};

export const getTokenExpiration = (token: string) => {
    return new Promise((resolve, reject) => {
        try {
            const decodedToken = jwt.verify(token, secretKey) as jwt.JwtPayload;
            if (!decodedToken.exp) {
                return reject(new Error("Token does not have an expiration time"));
            }
            
            const expirationTime = decodedToken.exp * 1000;
            const currentTime = Date.now();
            const timeDifference = expirationTime - currentTime;

            if (timeDifference <= 0) {
                return resolve("Token has already expired");
            }

            const minutes = Math.floor(timeDifference / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            resolve(formattedTime);
        } catch (error) {
            reject(error);
        }
    });
};