const express = require('express');
const paquetesController = require('./controllers/paquetesController');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(paquetesController);
app.listen(3002, () => {
    console.log('Microservicio Paquetes ejecutandose en el puerto 3002');
});