"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
module.exports = () => {
    const app = (0, express_1.default)();
    app.set('port', 3000);
    const helloRoute = require('../api/Routes/helloWorld');
    app.use('/', helloRoute);
    return app;
};
