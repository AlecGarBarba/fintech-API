import express, { Response } from 'express';
import routerUsuario from './routes/routerUsuario';
function main(): void {
    const app = express();
app.use(express.json());
    app.use('/user', routerUsuario);

    app.get('/', (_, res: Response)=>{
        res.send("Hola, mundo!");
    })

    app.listen(process.env.PORT || 4000, () => {
        console.log("Listening on port: ", process.env.PORT || 4000);
    })

};

main();