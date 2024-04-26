import express from 'express';
import * as UserController from '../Controller/userController';
import verifyTokenMiddleware from '../Controller/Auth/middleware';

const UsersRoute = express.Router();

UsersRoute.get('/getall', verifyTokenMiddleware, UserController.getAllUsers);

UsersRoute.get('/getbytype/:type', verifyTokenMiddleware, UserController.getUsersByType);

UsersRoute.get('/byid/:id', verifyTokenMiddleware, UserController.getUserById);

UsersRoute.get('/byname/:name', verifyTokenMiddleware, UserController.getUserLikeName);

UsersRoute.post('/create', verifyTokenMiddleware, UserController.createUser);

export default UsersRoute;
