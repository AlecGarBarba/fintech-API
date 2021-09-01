import { ParametrosDeTransaccion, TipoDeCuenta } from "src/types/types";
import Transaccion from "./Transaccion";
import { v4 as uuid} from 'uuid';

export default class Cuenta{
    id: string;
    tipoDeCuenta: TipoDeCuenta;
    transacciones: Transaccion[];
    constructor(tipoDeCuenta: TipoDeCuenta, transacciones?: Transaccion[]){
        this.id = uuid();
        this.tipoDeCuenta = tipoDeCuenta;
        if(transacciones){
            this.transacciones=transacciones;
        }else{
            this.transacciones=[];
        }
    }

    agregarTransaccion(parametros: ParametrosDeTransaccion){
        const idTransaccion= uuid();
        const {cantidad, concepto, tipoDeTransaccion} = parametros
        const nuevaTransaccion = new Transaccion(idTransaccion, cantidad, concepto, tipoDeTransaccion)
        this.transacciones.push(nuevaTransaccion);
    }

    listarTransacciones():Transaccion[]{
        return this.transacciones;
    }

    listarTransaccionesDesde(inicio: Date){
        return this.transacciones.filter( (transaccion)=>{
            return transaccion.fechaTransaccion>= inicio;
        })
    }

    listarTransaccionesHasta(fin: Date){
        return this.transacciones.filter( (transaccion)=>{
            return transaccion.fechaTransaccion<= fin;
        })
    }

    listarTransaccionesPeriodo(inicio: Date, fin: Date){
        return this.transacciones.filter( (transaccion)=>{
            transaccion.fechaTransaccion>= inicio && transaccion.fechaTransaccion <= fin;
        })
    }
}