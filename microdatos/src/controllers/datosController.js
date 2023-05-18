const { Router } = require('express');
const router = Router();
const axios = require('axios');
const datosModel = require('../models/datosModel');

// el sensor le manda el dato ya filtrado, y si es alerta amarilla o roja
router.post('/dato', async (req, res) => {
    const id_nodo = req.body.id_nodo;
    const gas = req.body.gas;
    const temperatura = req.body.temperatura;
    const distancia = req.body.distancia;
    const tiempo = req.body.tiempo;
    const tipo = req.body.tipo;
    var result = await datosModel.crearDato(id_nodo,gas,temperatura,distancia,tiempo, tipo);
    
    if (tipo === "amarillo" || tipo === "rojo") {
        const response = await axios.post('http://192.168.100.2:3003/alerta', {
        "id_nodo": id_nodo,
        "estado": "activo",
        "tipo": tipo
        }
    )
    console.log(response.data)
    res.send("Dato creado y alerta");

    }
    else{
        res.send("Dato creado ");
    }
});

router.get('/dato', async (req, res) => {
    var result; 
    result = await datosModel.traerDatos();
    res.json(result);
});



router.get('/dato/:id_nodo', async (req, res) => {
    const id_nodo = parseInt(req.params.id_nodo);
    // console.log("servicio:" ,id, usuarioD);
    var result; 
    result = await datosModel.traerDatoId_nodo(id_nodo);
    res.json(result);
});

router.get('/dato/usuarios/:usuario', async (req, res) => {
    const usuario = req.params.usuario;
    // console.log("servicio:" ,id, usuarioD);
    var result; 
    result = await datosModel.traerdatosU(usuario);
    res.json(result);
});



module.exports = router
