import express from 'express';
import * as PacienteController from '../Controller/pacienteController';
import verifyTokenMiddleware from '../Controller/Auth/middleware';

const PacienteRoute = express.Router();

PacienteRoute.get('/getall', verifyTokenMiddleware, PacienteController.getAllPacientes);

PacienteRoute.post('/create', verifyTokenMiddleware, PacienteController.addPaciente);

export default PacienteRoute;