const express = require('express');
const autenticacionController = require('./controllers/autenticacionController');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(autenticacionController);
app.listen(3000, () => {
    console.log('Microservicio Usuarios ejecutandose en el puerto 3000');
});