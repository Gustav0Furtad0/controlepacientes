import express from 'express';
import * as Session from '../Controller/session';

const SessionRoute = express.Router();

SessionRoute.post('/login', Session.login);

export default SessionRoute;