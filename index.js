const { dbConnect } = require('./database/config');
const express = require('express');
require('dotenv').config();
const cors = require('cors');

//console.log(process.env), para ver las variables de entorno y revisar que se esten tomando correctamente.

//Crear servidor de express
const app = express();

//Base de datos

dbConnect();

//CORS
app.use(cors())


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