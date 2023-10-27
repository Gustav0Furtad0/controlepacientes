import express from 'express';
import { Request } from 'express';

const router = express.Router();

router.get('/', (req:Request , res: { send: (arg0: string) => void; }) => {
    res.send('Olá, mundo!');
});

export { router };