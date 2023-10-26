const express = require('express');
const router = express.Router();

import { Request, Response } from 'express';

router.get('/', (req:Request , res: { send: (arg0: string) => void; }) => {
    res.send('Olá, mundo!');
});

module.exports = router;
