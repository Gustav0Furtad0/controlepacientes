import express from 'express';
import * as ConsultaController from '../Controller/consultaController';
import verifyTokenMiddleware from '../Controller/Auth/middleware';

const ConsultaRoute = express.Router();

ConsultaRoute.get('/getall', verifyTokenMiddleware, ConsultaController.getAllConsultas);
ConsultaRoute.post('/create', verifyTokenMiddleware, ConsultaController.addConsulta);
ConsultaRoute.get('/:id', verifyTokenMiddleware, ConsultaController.getConsultaById);
ConsultaRoute.get('/search', verifyTokenMiddleware, ConsultaController.getConsultaByParam);
ConsultaRoute.put('/:id', verifyTokenMiddleware, ConsultaController.updateConsulta);
ConsultaRoute.delete('/:id', verifyTokenMiddleware, ConsultaController.deleteConsulta);

export default ConsultaRoute;