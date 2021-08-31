import {TipoTransaccion} from '../types/types';

export default class Transaccion{
    id:string;
    cantidad:number;
    concepto:string;
    tipoTransaccion: TipoTransaccion;
    fechaTransaccion: Date;
    constructor(id:string, cantidad:number, concepto:string, tipoTransaccion: TipoTransaccion, fechaTransaccion?: Date){
        this.id=id;
        this.cantidad=cantidad;
        this.concepto=concepto;
        this.tipoTransaccion=tipoTransaccion;
        if(fechaTransaccion){
            this.fechaTransaccion = fechaTransaccion;
        }else{
            this.fechaTransaccion = new Date();
        }
    }
}