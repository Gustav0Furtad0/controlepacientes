import express from 'express';
import router from './api/Routes/helloWorld';

export const app = express();

app.use('/', router);
