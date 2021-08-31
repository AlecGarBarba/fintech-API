import Transaccion from "./Transaccion";
import {ParametrosTransaccion} from '../types/types';
import { v4 as uuid} from 'uuid';

export default class Cliente{ 

    nombreCliente: string;
    fechaRegistro: Date;
    transacciones: Transaccion[];

    constructor(nombreCliente: string, fechaRegistro?: Date, transacciones?: Transaccion[]){
        this.nombreCliente = nombreCliente;
        if(fechaRegistro){
            this.fechaRegistro = fechaRegistro;
        }else{
            this.fechaRegistro = new Date();
        }
        if(transacciones){
            this.transacciones = transacciones;
        }else{
            this.transacciones = [];
        }
    }

    agregarTransaccion(parametros: ParametrosTransaccion){
        const uid = uuid();
        const {cantidad, concepto, tipoTransaccion, fecha} = parametros;
        const transaccion = new Transaccion(''+uid, cantidad,concepto, tipoTransaccion, fecha);
        this.transacciones.push(transaccion);
    }

    listarTransacciones():Transaccion[]{
        return this.transacciones;
    }

    listarTransaccionesDesde(inicio: Date):Transaccion[]{
        return this.transacciones.filter(transaccion=>{
            return transaccion.fechaTransaccion >= inicio;
        });
    }

    listarTransaccionesHasta(fin: Date):Transaccion[]{
        return this.transacciones.filter(transaccion=>{
            return transaccion.fechaTransaccion <= fin;
        });
    }

    listarTransaccionesPeriodo(inicio: Date, fin:Date):Transaccion[]{
        return this.transacciones.filter(transaccion=>{
            return transaccion.fechaTransaccion >= inicio && transaccion.fechaTransaccion <= fin;
        });
    } 
}