import express from 'express';

//Llamada como función por si en el futuro es necesario agregar algún proceso asíncrono dentro del arranque.
function main(): void {
    const app = express();

    app.listen(process.env.PORT || 4000, () => {
        console.log("Listening on port: ", process.env.PORT || 4000);
    })

};


main();