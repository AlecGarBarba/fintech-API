import express from 'express';
function main(): void {
    const app = express();

    app.listen(process.env.PORT || 4000, () => {
        console.log("Listening on port: ", process.env.PORT || 4000);
    })

};

main();