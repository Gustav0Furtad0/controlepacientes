import express from 'express';
import { Request } from 'express';

module.exports = () => {
    const router = express.Router();

    router.get('/', (req:Request , res: { send: (arg0: string) => void; }) => {
        res.send('Olá, mundo!');
    });

    return router;
}
