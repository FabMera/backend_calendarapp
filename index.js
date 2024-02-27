
const express = require('express');
require('dotenv').config();
//console.log(process.env), para ver las variables de entorno y revisar que se esten tomando correctamente.


//Base de datos
const { dbConnect } = require('./database/config');
dbConnect();

//Crear servidor de express
const app = express();


//Middlewares (funciones que se ejecutan cuando se levanta el servidor),directorio publico
app.use(express.static('public'));

//Lectura y parseo del body
app.use(express.json()); //cualquier informacion que venga en formato json la va a intentar serializar

//Rutas
app.use('/api/auth', require('./routes/auth'));

//Escuchar peticiones
app.listen(process.env.PORT, (req, res) => {
    console.log(`Servidor corriendo en ${process.env.PORT}`);
})