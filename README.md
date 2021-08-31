## Instrucciones

En una empresa Fintech se necesita de una API que pueda proveer a la empresa de los recursos necesarios para que su equipo de soporte pueda consultar los movimientos de las cuentas de sus usuarios.
Se espera contar con los siguientes recursos para poder cumplir con el requerimiento:
•   Login de usuarios, el password se envía en formato md5.
•   Agregar clientes nuevos
•   Eliminar clientes
•   Lista de clientes con sus respectivas cuentas
•   Lista de transacciones por cliente
•   Cada lista se puede filtrar por fecha de registro
 
Notas
No es necesario crear una base de datos, se puede trabajar con datos de forma local, en caso de usar BD es necesario proporcionar lo necesario para su conexión.
Puedes generar los Endpoints que consideres necesario para cumplir con el requerimiento.
Evaluaremos cómo estructuras tu proyecto (archivos) así como tu código, agrega comentarios o documentación y lo que consideres útil para el día a día.
Usa al menos un commit por funcionalidad.
Está prohibido copiar código de algún sitio web.


## Versión de Node

Este proyecto fue creado y probado en una laptop corriendo Windows 10, con un procesador Intel core i5 8th Gen, y utilizando la versión de Node.js 16.7.0.


## Estructuracion del proyecto

El proyecto cuenta con una serie de archivos para la configuración del servidor, así como diferentes directorios para mantener una organización a lo largo del desarrollo. Los archivos de configuración son:

    Package.json - Metadatos acerca del proyecto: Licencia, scripts, dependencias, y demás información relacionada a la parte técnica del proyecto

    tsconfig.json - archivo de configuración para compilación en Typescript. Tiene una configuración altamente restrictiva para que el proyecto sea lo más explícito posible en cuanto a su tipado.

    .gitignore - indica cuáles directorios y archivos no serán agregados a los commits

    .jest.config.ts - Archivo de configuración para las pruebas automáticas de jest.

    README.md - Archivo de descripción del proyecto

El proyecto cuenta con cuatro directorios además del dedicado a los módulos de node para poder funcionar tanto en un ambiente de desarrollo, como en uno de producción. 

La carpeta "config" se encarga de guardar el archivo que contiene las variables de entorno (environment variables), con el fin de diferenciar los entornos de desarrollo y producción. En este caso, quedaron fuera del archivo .gitignore para que cualquier persona pueda utilizar las mismas variables de entorno que yo utilicé en desarrollo y tener los mismos resultados.

La carpeta "localDB" funcionará como un mock de una base de datos noSQL, almacenando en archivos JSON toda la información necesaria para el proyecto

La carpeta "tests" contendrá todas las pruebas automatizadas, creadas y realizadas con el framework de Jest, para probar los diferentes endpoints, inicialmente divididos por router (Router de Usuario, y Router de transacción) que se generen utilizando Express.js

Por último, la carpeta "src" contendrá el código fuente del Back-end. el punto de entrada es el archivo "app.ts", el cual importa los routers y establece la configuración inicial de Jest. Está sección está dividida en las siguientes carpetas:
    models:
        Esta carpeta puede almacenar los archivos que contengan los diferentes Schemas para los diferentes entes que se encuentren en la base de datos. Aplica en caso de migración a bases de datos como MongoDB.


    routes:
        Esta carpeta almacenará todos los routers generados con express para dividir los endpoints y mantenerlos de una forma organizada.

    types:
        Carpeta para almacenar el archivo de tipos personalizados para el proyecto.



### Comandos establecidos

Test:
    Arranca el framework de pruebas, realiza todas las test suites, y se queda observando cambios en el código
    
Dev:
    Obtiene todas las variables de entorno de desarrollo de la carpeta config, y utiliza nodemon para hacer un restart con cualquier cambiod e código.

start:
    script de producción


