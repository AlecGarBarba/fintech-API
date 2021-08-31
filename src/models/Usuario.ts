import { ParametrosTransaccion } from "src/types/types";
import Cliente from "./Cliente";
import Transaccion from "./Transaccion";

export default class Usuario{
    nombre: string;
    password: string;
    clientes: Cliente[];

    constructor(nombre:string, password:string, clientes?: Cliente[]){
        this.nombre = nombre;
        this.password = password;
        if(clientes){
            this.clientes = clientes;
        }else{
            this.clientes = [];
        }
    }

    agregarCliente(nombreCliente:string, fecha?: Date):boolean{
        let nuevoCliente: Cliente;
        if(fecha){
            nuevoCliente = new Cliente(nombreCliente,fecha);
        }else{
            nuevoCliente = new Cliente(nombreCliente);
        }
        
        if(this.clientes.includes(nuevoCliente)){
            return false;
        }else{
            this.clientes.push(nuevoCliente)
            return true;
        }
    }

    eliminarCliente(nombreCliente:string): boolean{ 
        let isRemoved:boolean = false;
        this.clientes = this.clientes.filter((cliente)=> {
            if(cliente.nombreCliente == nombreCliente){
                isRemoved = true;
                return false;
            }else{
                return true;
            }
        }); 
        return isRemoved
    }

    agregarTransaccionCliente(nombreCliente:string, parametros: ParametrosTransaccion):boolean{
        const cliente = this.retornarCliente(nombreCliente);
        if(cliente){
            cliente.agregarTransaccion(parametros);
            return true;
        }
        return false;
         
    }

    retornarCliente(nombreCliente: string): Cliente | null{
        return this.clientes.filter(cliente => cliente.nombreCliente === nombreCliente)[0];
    }

    listarClientes():Cliente[]{ 
        return this.clientes;
    }

    listarClientesDesde(inicio: Date):Cliente[]{
        const clientesDesde: Cliente[] = [];
        this.clientes.forEach(cliente=>{
            if(cliente.fechaRegistro >= inicio){
                clientesDesde.push(cliente);
            }
        });
        return clientesDesde;
    }

    listarClientesHasta(fin:Date):Cliente[]{
        const clientesHasta: Cliente[] = [];
        this.clientes.forEach(cliente=>{
            if(cliente.fechaRegistro <= fin){
                clientesHasta.push(cliente);
            }
        });
        return clientesHasta;
    }

    listarClientesPeriodo(inicio:Date, fin:Date):Cliente[]{
        const clientesPeriodo: Cliente[] = [];

        this.clientes.forEach(cliente=>{
            if(cliente.fechaRegistro <= fin && cliente.fechaRegistro >= inicio){
                clientesPeriodo.push(cliente);
            }
        });

        return clientesPeriodo;
    }

    listarTransaccionesTotalesCliente(nombreCliente: string): Transaccion[]{
        const cliente = this.retornarCliente(nombreCliente); 
        if(cliente){
            return cliente.listarTransacciones();
        }
        return [];
    }

    listarTransaccionesClientesDesde(nombreCliente: string, inicio: Date):Transaccion[]{
        const cliente = this.retornarCliente(nombreCliente);
        if(cliente) {
            return cliente.listarTransaccionesDesde(inicio);
        }
        return []
    }

    listarTransaccionesClientesHasta(nombreCliente: string, fin: Date):Transaccion[]{
        const cliente = this.retornarCliente(nombreCliente); 
        if(cliente){
            return cliente.listarTransaccionesHasta(fin);
        }
        return [];
    }

    listarTransaccionesClientesPeriodo(nombreCliente: string, inicio: Date, fin: Date):Transaccion[]{
        const cliente = this.retornarCliente(nombreCliente); 
        if(cliente){
            return cliente.listarTransaccionesPeriodo(inicio, fin);
        }
        return [];
    }

    listarTotalTransacciones():Transaccion[]{
        let totalTransacciones: Transaccion[] =[];
        let transacciones: Transaccion[] = [];
        this.clientes.forEach((cliente)=>{
            transacciones = cliente.listarTransacciones();
            totalTransacciones = [...transacciones, ...totalTransacciones ];
        });
        return totalTransacciones;
    }

    listarTotalTransaccionesDesde(inicio:Date):Transaccion[]{
        let totalTransacciones: Transaccion[] =[];
        let transacciones: Transaccion[] = [];
        this.clientes.forEach((cliente)=>{
            transacciones = cliente.listarTransaccionesDesde(inicio);
            totalTransacciones = [...transacciones, ...totalTransacciones ];
        });
        return totalTransacciones;
    }

    listarTotalTransaccionesHasta(fin:Date):Transaccion[]{
        let totalTransacciones: Transaccion[] =[];
        let transacciones: Transaccion[] = [];
        this.clientes.forEach((cliente)=>{
            transacciones = cliente.listarTransaccionesHasta(fin);
            totalTransacciones = [...transacciones, ...totalTransacciones ];
        });
        return totalTransacciones;
    }

    listarTotalTransaccionesPeriodo(inicio:Date, fin:Date):Transaccion[]{
        let totalTransacciones: Transaccion[] =[];
        let transacciones: Transaccion[] = [];
        this.clientes.forEach((cliente)=>{
            transacciones = cliente.listarTransaccionesPeriodo(inicio, fin);
            totalTransacciones = [...transacciones, ...totalTransacciones ];
        });
        return totalTransacciones;
    }

}