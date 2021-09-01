import { Router } from "express"; 
import jwt from 'jsonwebtoken';

import DataStorager from "../models/DataStorager";
import Usuario from "../models/Usuario";

import { auth } from '../middleware/auth';

const router = Router();

//Crear usuario. 
router.post('/', async (req,res)=>{
    const { nombre, password} = req.body; 
    if(nombre && password){ 
        const nuevoUsuario = new Usuario(nombre, password);
        const isUsuarioAgregado = await DataStorager.agregarUsuario(nuevoUsuario);
        if(isUsuarioAgregado){
            const token = jwt.sign({nombre}, process.env.JWT_SECRET as jwt.Secret);
            return res.status(201).send({token});
        } 
        return res.status(400).send({"error": "El usuario ya existe en la plataforma"})
    }else{
        return res.status(400).send({"Error": "faltan datos o son incorrectos"});
    }  
});

//Login, 
router.post('/login', async (req,res)=>{
    const {nombre, password} = req.body;
    const usuario = await DataStorager.retornarUsuario(nombre);
    if(usuario && usuario.password == password){
        const token = jwt.sign({nombre}, process.env.JWT_SECRET as jwt.Secret);
        return res.status(201).send({token});
    }
    return res.status(400).send({"error": "Usuario no encontrado"});

});

//Crear cliente
router.post('/cliente',auth, ()=>{

});
//Eliminar cliente
router.delete('/cliente', ()=>{

});

//listarClientes
router.get('/clientes', ()=>{

});

//obtener todas las transacciones del Usuario.
router.get('/transacciones', ()=>{

});


export default router;