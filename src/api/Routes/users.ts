import express from 'express';
import Usuario from '../../Model/usuario/usuario';
import bodyParser from 'body-parser';

const HelloRouter = express.Router();

HelloRouter.get('/users', async (req, res) => {
    const users = await Usuario.getUsers();
    res.json(users);
});

HelloRouter.get('/user/byid/:id', async (req, res) => {
    const user = await Usuario.getUserById(parseInt(req.params.id));
    res.json(user);
});

HelloRouter.get('/user/byname/:name', async (req, res) => {
    const user = await Usuario.getUserById(parseInt(req.query.id as string));
    res.json(user);
})

export default HelloRouter;
