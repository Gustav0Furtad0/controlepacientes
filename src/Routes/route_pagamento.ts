import express from 'express';
import * as PagamentoController from '../Controller/pagamentoController';
import verifyTokenMiddleware from '../Controller/Auth/middleware';

const PagamentoRoute = express.Router();

PagamentoRoute.get('/getall', verifyTokenMiddleware, PagamentoController.getAllPagamentos);
PagamentoRoute.post('/create', verifyTokenMiddleware, PagamentoController.addPagamento);
PagamentoRoute.get('/search', verifyTokenMiddleware, PagamentoController.getPagamentoByParam);
PagamentoRoute.get('/:id', verifyTokenMiddleware, PagamentoController.getPagamentoById);
PagamentoRoute.put('/:id', verifyTokenMiddleware, PagamentoController.updatePagamento);
PagamentoRoute.delete('/:id', verifyTokenMiddleware, PagamentoController.deletePagamento);

export default PagamentoRoute;