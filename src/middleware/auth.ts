import { Request, Response } from 'express'; 
import jwt from 'jsonwebtoken'; 

export const auth = async (req: Request, res: Response, next: Function)=>{
    try{
        const token = req.header('Authorization')?.replace('Bearer ','');
        const decoded = jwt.verify(token!, process.env.JWT_SECRET as jwt.Secret) as jwt.JwtPayload; 
        req.params.nombreUsuario = decoded.nombre;
       next(); 
    }catch(e){
        res.status(401).send({error: `Error de autenticación: ${e.message}`});
    }
}
 