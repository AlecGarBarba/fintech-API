import { Request, Response } from 'express'; 
import jwt from 'jsonwebtoken';
//import DataStorager from '../models/DataStorager';

export const auth = async (req: Request, res: Response, next: Function)=>{
    try{
        const token = req.header('Authorization')?.replace('Bearer ','');
        const decoded = jwt.verify(token!, process.env.JWT_SECRET as jwt.Secret) as jwt.JwtPayload;
        const {nombre} = decoded;
        req.params.nombreUsuario = nombre;
       next(); 
    }catch(e){
        res.status(401).send({error: `Error de autenticación: ${e.message}`});
    }
}
 