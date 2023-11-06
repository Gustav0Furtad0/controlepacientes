import express from 'express';
import * as UserController from '../Controller/userController';
import {generateToken, verifyToken} from '../Controller/Auth/webToken';

const UsersRoute = express.Router();

UsersRoute.get('/users', UserController.getAllUsers);

UsersRoute.get('/users/byid/:id', UserController.getUserById);

UsersRoute.get('/users/byname/:name', UserController.getUserLikeName);

UsersRoute.post('/users/create', UserController.createUser);

UsersRoute.post('/users/login', UserController.login);

export default UsersRoute;
