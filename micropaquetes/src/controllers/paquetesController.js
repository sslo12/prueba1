const { Router } = require('express');
const router = Router();
const paquetesModel = require('../models/paquetesModel');

router.post('/nodo', async (req, res) => {
    const direccion = req.body.direccion;
    const id_usuario = req.body.id_usuario;
    var result = await paquetesModel.crearNodo(direccion, id_usuario);
    res.send("Nodo creado");
});

router.get('/nodo', async (req, res) => {
    var result; 
    result = await paquetesModel.traerNodosU();
    res.json(result);
});



router.get('/nodo/:id_usuario', async (req, res) => {
    const id_usuario = parseInt(req.params.id_usuario);
    // console.log("servicio:" ,id, usuarioD);
    var result; 
    result = await paquetesModel.traerNodoU(id_usuario);
    res.json(result);
});

router.get('/nodo/borrar/usuario', async (req, res) => {
    // const usuario = parseInt(req.params.usuario);
    // console.log("servicio:" ,id, usuarioD);
    var result; 
    result = await paquetesModel.traerNodoBorrar();
    res.json(result);
});

router.put('/nodo/:id', async (req, res) => {
    const id = req.params.id;
    const direccion = req.body.direccion;

    var result = await paquetesModel.actualizarNodo(id, direccion);
    res.send("Estado de nodo actualizado");
});

router.delete('/nodo/:id', async (req, res) => {
    const id = req.params.id;
    result = await paquetesModel.borrarNodo(id);
    res.send('nodo borrado');
});

module.exports = router