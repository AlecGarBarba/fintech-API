export enum TipoTransaccion{
    ventaCredito,
    ventaEfectivo,
}

export type ParametrosTransaccion={
    cantidad:number,
    concepto:string,
    tipoTransaccion:TipoTransaccion,
    fecha?: Date,
}