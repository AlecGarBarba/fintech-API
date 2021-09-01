import { Router } from 'express';
import { auth } from 'src/middleware/auth';


const router = Router();



//clientes. Aquí existen los parámetros opcionales para rangos
router.get('/', auth, ()=>{

});


//obtener todas las transacciones del cliente, independientemente de su cuenta
router.get('/transacciones', ()=>{

});

//obtener transacciones por cuenta
router.get('/cuenta/transacciones')

//Agregar transaccion específica al cliente.s
router.post('/transaccion')