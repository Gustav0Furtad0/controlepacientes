import express from 'express';
import Usuario from '../../Model/usuario/usuario';
import bodyParser from 'body-parser';

const UsersRoute = express.Router();

UsersRoute.get('/users', async (req, res) => {
    const users = await Usuario.getUsers();
    res.json(users);
});

UsersRoute.get('/users/byid/:id', async (req, res) => {
    const user = await Usuario.getUserById(parseInt(req.params.id));
    res.json(user);
});

UsersRoute.get('/users/byname/:name', async (req, res) => {
    console.log("Procurando por: " + req.params.name);
    const user = await Usuario.getUserByName(req.params.name);
    res.json(user);
})

export default UsersRoute;
