import express from 'express';
import bodyParser from 'body-parser';
import UsersRoute from '../Routes/route_usuario';
import PacienteRoute from '../Routes/route_paciente';
import SessionRoute from '../Routes/route_session';
import cors from 'cors';

export const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/usuario', UsersRoute);
app.use('/paciente', PacienteRoute);
app.use('/session', SessionRoute);
