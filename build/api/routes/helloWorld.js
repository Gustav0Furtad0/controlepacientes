"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
// Rota principal
router.get('/', (req, res) => {
    res.send('Olá, mundo!');
});
module.exports = router;
