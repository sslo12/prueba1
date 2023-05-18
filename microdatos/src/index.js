const express = require('express');
const datosController = require('./controllers/datosController');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(datosController);
app.listen(3004, () => {
    console.log('Microservicio Paquetes ejecutandose en el puerto 3004');
});
