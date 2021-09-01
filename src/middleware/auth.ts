import { Request, Response } from 'express';
import md5 from 'md5';
import crypto from 'crypto';

import DataStorager from 'src/models/DataStorager';

export const auth = async (req: Request, res: Response, next: Function)=>{
    try{
        const md5 = req.header('Authorization')?.replace('Bearer ','');
        const nombreUsuario = req.header('user'); 
        const user = await DataStorager.retornarUsuario(''+nombreUsuario);
        if(user && user.password == md5 ){
            next();
        }else{
            throw new Error();
        }
        
    }catch(e){
        res.status(401).send({error: "Error de autenticación"})
    }
}
 