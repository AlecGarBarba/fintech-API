import Cliente from "./Cliente"; 

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
    agregarCliente(nombreCliente:string, rfc:string, curp:string, fecha?: Date):boolean{
        let nuevoCliente: Cliente;
        if(fecha){
            nuevoCliente = new Cliente(nombreCliente,rfc,curp,fecha);
        }else{
            nuevoCliente = new Cliente(nombreCliente,rfc,curp);
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

    
}