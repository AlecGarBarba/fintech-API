import fs from 'fs';
import path from 'path'; 
import Usuario from "./Usuario";



const DIRECCION_ARCHIVO_USUARIOS = path.join(__dirname,"../../localDB/usuarios.json")
export default class DataStorager{

    constructor(){

    }
 
    static agregarUsuario(usuario: Usuario): Promise<boolean>{
        return new Promise( (resolve, reject)=>{
            fs.readFile(DIRECCION_ARCHIVO_USUARIOS, (error, datos)=>{
                if(error) reject( error);
                let db = JSON.parse(datos.toString());
                if( usuario.nombre in db ){
                    resolve(false);
                } 
                db[usuario.nombre] = usuario;
                fs.writeFile(DIRECCION_ARCHIVO_USUARIOS, JSON.stringify(db),(error,)=>{
                    if(error) reject( error );
                    resolve(true);
                });
            })
        })
    }

    static persistirUsuario(usuario: Usuario): Promise<boolean>{
        return new Promise( (resolve, reject)=>{
            fs.readFile(DIRECCION_ARCHIVO_USUARIOS, (error, datos)=>{
                if(error) reject(error);
                let db = JSON.parse(datos.toString());
                db[usuario.nombre] = usuario;
                fs.writeFile(DIRECCION_ARCHIVO_USUARIOS, JSON.stringify( db),(error,)=>{
                    if(error) reject(error);
                    resolve(true);
                });
            });
        });
    }

    static async borrarUsuario(nombreUsuario: string):Promise<boolean>{
        return new Promise( (resolve, reject)=>{
            fs.readFile(DIRECCION_ARCHIVO_USUARIOS, (error, datos)=>{
                if(error) reject (error);
                let db = JSON.parse(datos.toString());
                if( !(nombreUsuario in db) ) resolve(false);
                delete db[nombreUsuario];
                fs.writeFile(DIRECCION_ARCHIVO_USUARIOS, JSON.stringify( db),(error,)=>{
                    if(error) throw error;
                    resolve(true)
                });
            })
        })
        
    }

    static retornarUsuario(nombreUsuario: string): Promise<Usuario | false>{
        return new Promise( (resolve, reject)=>{
            fs.readFile(DIRECCION_ARCHIVO_USUARIOS, (error, datos)=>{
                if(error) reject(error);
                let db = JSON.parse(datos.toString()); 
                if(nombreUsuario in db){ 
                    const {password, clientes} = db[nombreUsuario]; 
                    resolve(new Usuario(nombreUsuario, password, clientes ));
                }else{
                    resolve(false);
                }
                resolve(false); 
            });
        })
    }
}