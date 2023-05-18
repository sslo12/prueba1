const express = require('express');
const notificacionController = require('./controllers/notificacionController');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(notificacionController);
app.listen(3003, () => {
    console.log('Microservicio Notificaciones ejecutandose en el puerto 3003');
});
