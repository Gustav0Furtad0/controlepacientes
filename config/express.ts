import express from 'express';
import { router } from '../api/Routes/helloWorld';

export const app = express();

app.set('port', 3000);

app.use('/', router);
