import { Router } from "express"; 
import jwt from 'jsonwebtoken';

import DataStorager from "../models/DataStorager";
import Usuario from "../models/Usuario"; 
import Cliente from "../models/Cliente";
import { auth } from '../middleware/auth';
import { filtrarClientesPorFecha } from "../utils/utils";

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

//Login 
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
router.post('/cliente',auth, async (req,res)=>{
    const {nombreCliente, rfc, curp  } = req.body;
    const nombreUsuario = req.params.nombreUsuario;
    const usuario = await DataStorager.retornarUsuario(nombreUsuario);
    if(nombreCliente && rfc && curp && usuario){
        try{
            if(usuario.retornarCliente(nombreCliente)){
                return res.status(400).send({"Error": "Ya existe un cliente con ese nombre"})
            } 
            usuario.agregarCliente(nombreCliente,rfc,curp); 
            await DataStorager.persistirUsuario(usuario);
            return res.status(201).send();
        }catch(e){
            return res.status(500).send({"error": `Error de servidor: ${e.message}`});
        }
    }else{
        return res.status(400).send({"error": "Datos inv??lidos o faltantes para la creaci??n de un nuevo cliente"});
    }
});

//Eliminar cliente
router.delete('/cliente',auth, async (req,res)=>{
    const {nombreCliente } = req.body;
    const nombreUsuario = req.params.nombreUsuario;
    const usuario = await DataStorager.retornarUsuario(nombreUsuario);
    if(usuario){
        const isClienteEliminado = usuario.eliminarCliente(nombreCliente);
        if(isClienteEliminado){
            await DataStorager.persistirUsuario(usuario);
            res.sendStatus(200);
        }else{
            res.status(400).send({"error": "El cliente a eliminar no existe."})
        }
    }else{
        res.status(400).send({"error":"Usuario no encontrado"})
    } 
});

//listarClientes
router.get('/cliente', auth, async (req,res)=>{
    const nombreUsuario = req.params.nombreUsuario;
    const {inicio, fin} = req.query;  
    const usuario = await DataStorager.retornarUsuario(nombreUsuario) as Usuario;
    if(usuario){
        let clientes: Cliente[] = usuario.listarClientes(); 
        clientes = filtrarClientesPorFecha(clientes, inicio as string, fin as string);
        return res.status(200).send(clientes);
    }
    return res.status(400).send({"error": "Usuario no encontrado"});
});

export default router;