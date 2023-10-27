import express, {Request} from 'express';

export const router = express.Router();

router.get('/', (req: Request , res: { send: (arg0: string) => void; }) => {
    res.send('Olá, mundo!');
});
