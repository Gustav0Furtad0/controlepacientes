import jwt from "jsonwebtoken";

class Authentication {
    private readonly secret: string;

    constructor(secret: string) {
        this.secret = secret;
    }

    generateToken(payload: object, expiresIn: string): string {
        return jwt.sign(payload, this.secret, { expiresIn });
    }

    verifyToken(token: string): object | string {
        try {
            return jwt.verify(token, this.secret);
        } catch (err: any) {
            return err.message;
        }
    }
}

export default Authentication;
