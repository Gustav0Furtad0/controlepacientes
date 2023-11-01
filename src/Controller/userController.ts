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

export const getUserByName = async (req: Request, res: Response) => {
    console.log("Procurando por: " + req.params.name);
    const user = await Usuario.getUserByName(req.params.name);
    res.json(user);
}