import express from 'express';
import * as CobrancaController from '../Controller/cobrancaController';
import verifyTokenMiddleware from '../Controller/Auth/middleware';

const CobrancaRoute = express.Router();

CobrancaRoute.get('/getall', verifyTokenMiddleware, CobrancaController.getAllCobrancas);
CobrancaRoute.post('/create', verifyTokenMiddleware, CobrancaController.addCobranca);
CobrancaRoute.get('/search', verifyTokenMiddleware, CobrancaController.getCobrancaByParam);
CobrancaRoute.get('/:id', verifyTokenMiddleware, CobrancaController.getCobrancaById);
CobrancaRoute.put('/:id', verifyTokenMiddleware, CobrancaController.updateCobranca);
CobrancaRoute.delete('/:id', verifyTokenMiddleware, CobrancaController.deleteCobranca);

export default CobrancaRoute;