import express from 'express';
import HelloRouter from '../api/Routes/users';
import bodyParser from 'body-parser';

export const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', HelloRouter);
