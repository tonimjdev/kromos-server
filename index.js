const express = require('express');
const cors = require('cors');
const path = require('path');
const { dbConnection } = require('./db/config');
require('dotenv').config();

console.log( process.env );

// Crear el servidor/aplicación de express
const app = express();

// Base de datos
dbConnection();

// Directorio Público
app.use( express.static('public'));

// CORS
app.use( cors() );

// Lectura y parseo del body
app.use( express.json() );

// Ruta kromos
const router = require('./routes/kromos')
app.use('/api', router) // Ruta base (endpoint)

// Ruta Auth User
app.use( '/api/auth', require('./routes/auth') );

// Ruta usuarios
app.use( '/api/user', require('./routes/users') );

// Ruta Messages
const router2= require('./routes/messages')
app.use('/api', router2);


// Manejar demas rutas
app.get( '*', (req, res) => {
    res.sendFile( path.resolve( __dirname, 'public/index.html' ) )
});


app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
})