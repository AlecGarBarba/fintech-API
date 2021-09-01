import { Router } from 'express';
import DataStorager from "../models/DataStorager"; 
import Cliente from "../models/Cliente"; 
import Cuenta from '../models/Cuenta';
import Transaccion from '../models/Transaccion';
import { auth } from '../middleware/auth';
import { ParametrosDeTransaccion, TipoDeTransaccion } from '../types/types'; 


const router = Router();
// Agregar una cuenta nueva al cliente.
router.post('/cuenta', auth, async (req,res)=>{
    const {nombreUsuario} = req.params;
    const {nombreCliente, tipoCuenta} = req.body;
    const usuario = await DataStorager.retornarUsuario(nombreUsuario);
    if(usuario){ 
        const { rfc, curp, cuentas} = usuario.retornarCliente(nombreCliente) as Cliente;
        if(rfc && curp){ 
            const instanceCliente = new Cliente(nombreCliente,rfc,curp, new Date(), cuentas );
            const cuenta = instanceCliente.agregarCuenta(tipoCuenta); 
            await DataStorager.persistirUsuario(usuario);
            res.status(201).send(cuenta);
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
 
        const { rfc, curp, cuentas} = usuario.retornarCliente(nombreCliente) as Cliente;

        if(rfc && curp){ 
            const instanceCliente = new Cliente(nombreCliente,rfc,curp, new Date(), cuentas );
            const {tipoDeCuenta, transacciones} = instanceCliente.retornarCuenta(idCuenta);
            const cuenta = new Cuenta(tipoDeCuenta, transacciones);
            const parametros: ParametrosDeTransaccion = {
                cantidad: +cantidad,
                concepto: concepto,
                tipoDeTransaccion: tipoDeTransaccion as unknown as TipoDeTransaccion
            } 
            cuenta.agregarTransaccion(parametros);
            await DataStorager.persistirUsuario(usuario);
            res.status(201).send();
        }else{
            res.status(400).send({"error": "El cliente no existe"});
        }
        
    }else{
        res.status(400).send({"error": "Datos insuficientes para transacción"});
    }
});


//regresar todas las cuentas del cliente.
router.get('/cuentas',auth, async(req,res)=>{
    const { nombreUsuario} = req.params; 
    const { nombreCliente } = req.query;
    const usuario = await DataStorager.retornarUsuario(nombreUsuario); 
    if(usuario){ 
        const cliente = usuario.retornarCliente(nombreCliente as string);
        if(cliente){
            res.status(200).send(cliente.cuentas);
        }else{
            res.status(400).send({"error":"Cliente no encontrado"});
        }
        
    }else{
        res.status(400).send({"error": "error al identificar cuenta "});
    }
});

//obtener todas las transacciones del cliente, independientemente de su cuenta. Filtro por fechas*
router.get('/transacciones',auth, async(req,res)=>{
    const nombreUsuario = req.params.nombreUsuario;
    const {inicio, fin} = req.query; 
    const usuario = await DataStorager.retornarUsuario(nombreUsuario);
    let transacciones: Transaccion[] = [];

    if(usuario){

        usuario.clientes.forEach((cliente)=>{ 
            cliente.cuentas.forEach(cuenta=>{ 
                transacciones = [...transacciones, ...cuenta.transacciones]
            });
        });

        if(inicio && fin){
            transacciones = transacciones.filter( (transaccion)=>{
                return new Date(transaccion.fechaTransaccion) >= new Date(''+inicio) && new Date(transaccion.fechaTransaccion) <= new Date(''+fin)
            })
        }else if(inicio){
            transacciones = transacciones.filter( (transaccion)=>{
                return new Date(transaccion.fechaTransaccion) >= new Date(''+inicio)  
            })
        }else if(fin){
            transacciones = transacciones.filter( (transaccion)=>{
                return new Date(transaccion.fechaTransaccion) <= new Date(''+fin)  
            })
        } 
    }
    
    res.status(200).send(transacciones);
    
});

//obtener transacciones por cuenta. Filtro por fecha*
router.get('/cuenta/transacciones', auth, async (req,res)=>{
    const { nombreUsuario} = req.params; 
    const { nombreCliente, idCuenta, inicio, fin } = req.query;

    const usuario = await DataStorager.retornarUsuario(nombreUsuario);
    if(usuario && nombreCliente && idCuenta ){
        let transacciones: Transaccion[]= [];
        const {cuentas} = usuario.retornarCliente(nombreCliente as string) as Cliente;
        const cuentaFiltrada = cuentas.filter( cuenta => cuenta.id=== idCuenta );
        transacciones = cuentaFiltrada[0].transacciones

        if(inicio && fin){
            transacciones = transacciones.filter( (transaccion)=>{
                return new Date(transaccion.fechaTransaccion) >= new Date(''+inicio) && new Date(transaccion.fechaTransaccion) <= new Date(''+fin)
            })
        }else if(inicio){
            transacciones = transacciones.filter( (transaccion)=>{
                return new Date(transaccion.fechaTransaccion) >= new Date(''+inicio)  
            })
        }else if(fin){
            transacciones = transacciones.filter( (transaccion)=>{
                return new Date(transaccion.fechaTransaccion) <= new Date(''+fin)  
            })
        } 

        res.status(201).send( transacciones );
    }else{
        res.status(400).send({"error": "Datos insuficientes"});
    }
});


export default router;