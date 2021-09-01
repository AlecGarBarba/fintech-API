import { Router } from "express"; 
import jwt from 'jsonwebtoken';

import DataStorager from "../models/DataStorager";
import Usuario from "../models/Usuario"; 

import { auth } from '../middleware/auth';
import Cliente from "../models/Cliente";

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
            usuario.agregarCliente(nombreCliente,rfc,curp); 
            await DataStorager.persistirUsuario(usuario);
            res.status(201).send();
        }catch(e){
            res.status(500).send({"error": `Error de servidor: ${e.message}`});
        }
        
    }else{
        res.status(400).send({"error": "Datos inválidos o faltantes para la creación de un nuevo cliente"});
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
router.get('/clientes', auth, async (req,res)=>{
    const nombreUsuario = req.params.nombreUsuario;
    const {inicio, fin} = req.query;  
    const usuario = await DataStorager.retornarUsuario(nombreUsuario) as Usuario;
    if(usuario){
        let clientes: Cliente[] = usuario.listarClientes();
        //inicio y fin 
        if(inicio && fin){  
            clientes = clientes.filter((cliente)=>{  
                return new Date(cliente.fechaRegistro) >=new Date(''+inicio) && new Date(cliente.fechaRegistro) <= new Date(''+fin);
            }); 
        }else if(inicio){  
            clientes = clientes.filter((cliente)=> new Date(cliente.fechaRegistro) >=new Date(''+inicio) ); 
        }else if(fin){ 
            clientes = clientes.filter((cliente)=> new Date(cliente.fechaRegistro) <=new Date(''+fin) ); 
        }
        return res.status(200).send(clientes);
    }
    return res.status(400).send({"error": "Usuario no encontrado"});
    
});



export default router;