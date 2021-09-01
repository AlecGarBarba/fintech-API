import Cliente from "../models/Cliente";
import Transaccion from "../models/Transaccion"

export function filtrarTransaccionesPorFecha(transacciones: Transaccion[], inicio?: string , fin?: string ):Transaccion[]{
    if(inicio && fin){
        transacciones = transacciones.filter( (transaccion)=>{
            return new Date(transaccion.fechaTransaccion) >= new Date(inicio) && new Date(transaccion.fechaTransaccion) <= new Date(fin);
        })
    }else if(inicio){
        transacciones = transacciones.filter( (transaccion)=>{
            return new Date(transaccion.fechaTransaccion) >= new Date(inicio);
        })
    }else if(fin){
        transacciones = transacciones.filter( (transaccion)=>{
            return new Date(transaccion.fechaTransaccion) <= new Date(fin);
        })
    }
    return transacciones;
}

export function filtrarClientesPorFecha(clientes: Cliente[], inicio: string, fin: string){
    if(inicio && fin){  
        clientes = clientes.filter((cliente)=>{  
            return new Date(cliente.fechaRegistro) >=new Date(inicio) && new Date(cliente.fechaRegistro) <= new Date(fin);
        }); 
    }else if(inicio){  
        clientes = clientes.filter((cliente)=> new Date(cliente.fechaRegistro) >=new Date(inicio) ); 
    }else if(fin){ 
        clientes = clientes.filter((cliente)=> new Date(cliente.fechaRegistro) <=new Date(fin) ); 
    }
    return clientes;
}