import { Router } from 'express';
import { auth } from 'src/middleware/auth';


const router = Router();



//clientes. Aquí existen los parámetros opcionales para rangos
router.get('/', auth, ()=>{

});

//Agregar transaccion específica al cliente.s
router.post('/transaccion')