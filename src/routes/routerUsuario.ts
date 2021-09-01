import { Router } from "express";
import { auth } from "src/middleware/auth";


const router = Router();

//Crear usuario.
router.post('/', ()=>{

});

//Login, 
router.post('/login', ()=>{

});



//Transacciones totales. Aquí existen los parámetros opcionales para rangos
router.get('/transacciones', auth, ()=>{

});






