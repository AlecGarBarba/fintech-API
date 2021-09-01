import Transaccion from "./Transaccion";
import {ParametrosDeTransaccion, TipoDeCuenta} from '../types/types';
import Cuenta from './Cuenta'; 

export default class Cliente{ 

    nombreCliente: string;
    rfc: string;
    curp:string;
    fechaRegistro: Date;
    cuentas: Cuenta[];

    constructor(nombreCliente: string, rfc:string, curp:string, fechaRegistro?: Date, cuentas?: Cuenta[]){
        this.nombreCliente = nombreCliente;
        this.rfc=rfc;
        this.curp=curp;
        if(fechaRegistro){
            this.fechaRegistro = fechaRegistro;
        }else{
            this.fechaRegistro = new Date();
        }
        if(cuentas){
            this.cuentas = cuentas;
        }else{
            this.cuentas = [];
        }
    }

    agregarCuenta(tipoDeCuenta: TipoDeCuenta): Cuenta{
        const nuevaCuenta = new Cuenta(tipoDeCuenta);
        this.cuentas.push(nuevaCuenta); 
        return nuevaCuenta;
    }

    eliminarCuenta(idCuenta:string):boolean{
        let isRemoved:boolean = false;
        this.cuentas = this.cuentas.filter((cuenta)=> {
            if(cuenta.id == idCuenta){
                isRemoved = true;
                return false;
            }else{
                return true;
            }
        }); 
        return isRemoved
    }

    retornarCuenta(idCuenta:string):Cuenta{
        return this.cuentas.filter(cuenta => cuenta.id === idCuenta)[0];
    }

    listarCuentas():Cuenta[]{
        return this.cuentas;
    }

    agregarTransaccionCuenta( idCuenta: string,  parametros: ParametrosDeTransaccion):boolean{
        const cuenta = this.retornarCuenta(idCuenta);
        if(cuenta){ 
            cuenta.agregarTransaccion(parametros)
            return true;
        }
        return false; 
    }

    listarTransaccionesCuenta(idCuenta: string):Transaccion[]{
        let transaccionesDeCuenta:Transaccion[] = [];
        const cuenta = this.retornarCuenta(idCuenta); 
        if(cuenta){
            transaccionesDeCuenta = cuenta.listarTransacciones();
        } 
        return transaccionesDeCuenta;
    }

    listarTransaccionesCuentaDesde(idCuenta: string, inicio: Date):Transaccion[]{
        let transaccionesDeCuenta:Transaccion[] = [];
        const cuenta = this.retornarCuenta(idCuenta); 
        if(cuenta){
            transaccionesDeCuenta = cuenta.listarTransaccionesDesde(inicio);
        } 
        return transaccionesDeCuenta;
    }

    listarTransaccionesCuentaHasta(idCuenta: string, fin: Date):Transaccion[]{
        let transaccionesDeCuenta:Transaccion[] = [];
        const cuenta = this.retornarCuenta(idCuenta); 
        if(cuenta){
            transaccionesDeCuenta = cuenta.listarTransaccionesHasta(fin);
        } 
        return transaccionesDeCuenta;
    }

    listarTransaccionesCuentaPeriodo(idCuenta:string, inicio: Date, fin:Date):Transaccion[]{
        let transaccionesDeCuenta:Transaccion[] = [];
        const cuenta = this.retornarCuenta(idCuenta); 
        if(cuenta){
            transaccionesDeCuenta = cuenta.listarTransaccionesPeriodo(inicio,fin);
        } 
        return transaccionesDeCuenta;
    } 
}