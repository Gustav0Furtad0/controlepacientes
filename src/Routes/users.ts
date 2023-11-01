import express from 'express';
import * as UserController from '../Controller/userController';

const UsersRoute = express.Router();

UsersRoute.get('/users', UserController.getUsers);

UsersRoute.get('/users/byid/:id', UserController.getUserById);

UsersRoute.get('/users/byname/:name', UserController.getUserLikeName);

export default UsersRoute;
