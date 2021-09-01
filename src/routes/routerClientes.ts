import { Router } from 'express';
import DataStorager from "../models/DataStorager";
//import Usuario from "../models/Usuario"; 
//import Cliente from "../models/Cliente";

import { auth } from '../middleware/auth';
import { ParametrosDeTransaccion, TipoDeTransaccion } from 'src/types/types';


const router = Router();

router.post('/cuenta', auth, async (req,res)=>{
    const {nombreUsuario} = req.params;
    const {nombreCliente, tipoCuenta} = req.body;
    const usuario = await DataStorager.retornarUsuario(nombreUsuario);
    if(usuario){
        const cliente = usuario.retornarCliente(nombreCliente);
        if(cliente){
            cliente.agregarCuenta(tipoCuenta);
            await DataStorager.persistirUsuario(usuario);
            res.status(201).send();
        }else{
            res.status(400).send({"error": "El cliente no existe"});
        }
    }else{
        res.status(400).send({"error": "error al identificar cuenta "});
    }
});

//Agregar transaccion a una cuenta específica
router.post('/cuenta/transaccion',auth, async (req,res)=>{
    const { nombreUsuario } = req.params;
    const { nombreCliente, idCuenta,cantidad, concepto, tipoDeTransaccion } = req.body;
    
    const usuario = await DataStorager.retornarUsuario(nombreUsuario);
    if(usuario && nombreCliente && cantidad && concepto && tipoDeTransaccion ){
        const cliente = usuario.retornarCliente(nombreCliente) ;
        const cuenta = cliente?.retornarCuenta(idCuenta);
        if(cuenta){
            const parametros: ParametrosDeTransaccion = {
                cantidad: +cantidad,
                concepto: concepto,
                tipoDeTransaccion: tipoDeTransaccion as unknown as TipoDeTransaccion
            } 
            cuenta.agregarTransaccion(parametros);
            await DataStorager.persistirUsuario(usuario);
            res.status(200).send();
        }else{
            res.status(400).send({"error": "error al identificar cuenta "});
        }
        
    }else{
        res.status(400).send({"error": "Datos insuficientes para transacción"});
    }
});


//obtener todas las transacciones del cliente, independientemente de su cuenta. Filtro por fechas
router.get('/transacciones',auth, ()=>{

});



//obtener transacciones por cuenta. Filtro por fecha
router.get('/cuenta/transacciones', auth, ()=>{

});


export default router;