import express from 'express';
import bodyParser from 'body-parser';
import UsersRoute from '../Routes/users';

export const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', UsersRoute);
