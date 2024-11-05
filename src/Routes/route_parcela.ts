import express from 'express';
import * as ParcelaController from '../Controller/parcelaController';
import verifyTokenMiddleware from '../Controller/Auth/middleware';

const ParcelaRoute = express.Router();

ParcelaRoute.get('/getall', verifyTokenMiddleware, ParcelaController.getAllParcelas);
ParcelaRoute.post('/create', verifyTokenMiddleware, ParcelaController.addParcela);
ParcelaRoute.get('/search', verifyTokenMiddleware, ParcelaController.getParcelaByParam);
ParcelaRoute.get('/:id', verifyTokenMiddleware, ParcelaController.getParcelaById);
ParcelaRoute.put('/:id', verifyTokenMiddleware, ParcelaController.updateParcela);
ParcelaRoute.delete('/:id', verifyTokenMiddleware, ParcelaController.deleteParcela);

export default ParcelaRoute;