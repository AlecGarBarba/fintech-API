export enum TipoDeTransaccion{
    aFavor,
    enContra,
}

export enum TipoDeCuenta{
    debito,
    credito
}

export type ParametrosDeTransaccion={
    cantidad:number,
    concepto:string,
    tipoDeTransaccion:TipoDeTransaccion,
    fecha?: Date,
}