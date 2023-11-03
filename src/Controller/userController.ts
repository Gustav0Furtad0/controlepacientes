import {Request, Response} from "express";
import Usuario from "../Model/usuario/usuario";

export const getUsers = async (req: Request, res: Response) => {
    const users = await Usuario.getUsers();
    res.json(users);
}

export const getUserById = async (req: Request, res: Response) => {
    const user = await Usuario.getUserById(parseInt(req.params.id));
    res.json(user);
}

export const getUserLikeName = async (req: Request, res: Response) => {
    console.log("Procurando por: " + req.params.name);
    const user = await Usuario.getUserLikeName(req.params.name);
    res.json(user);
}

export const createUser = async (req: Request, res: Response) => {
    const user = await Usuario.createUser(req.body.usuario, req.body.senha, req.body.nome, req.body.email, req.body.tipo_usuario, req.body.cargo);
    res.json(user);
}

export const login = async (req: Request, res: Response) => {
    const user = await Usuario.verifyUser(req.body.usuario, req.body.senha);
    res.json(user);
}