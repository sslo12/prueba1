const { Router } = require('express');
const router = Router();
const notificacionModel = require('../models/notificacionModel');
router.get('/alerta', async (req, res) => {
    var result;
    result = await notificacionModel.traerAlerta();
    res.json(result);
});

router.post('/alerta', async (req, res) => {
    console.log(req.body)
    const id_nodo = req.body.id_nodo;
    const estado = req.body.estado;
    const tipo = req.body.tipo;
    console.log(req.body)
    console.log(id_nodo)
    console.log(estado)
    console.log(tipo)
    var result = await notificacionModel.crearAlerta(id_nodo, estado,tipo);
    res.send("Nodo creado");
});

router.get('/alerta/usu/:usuario', async (req, res) => {
    var usuario = req.params.usuario; 
    var result;
    result = await notificacionModel.traerAlertaUsuario(usuario);
    res.json(result);
});

router.get('/alerta/:id_nodo', async (req, res) => {
    const id_nodo = req.params.id_nodo;
    result = await notificacionModel.traerAlertaId_nodo(id_nodo);
    res.json(result);
});

//nuevo, trae las alertas rojas y amarillas
router.get('/alertas/bombero', async (req, res) => {
    result = await notificacionModel.traerAlertaBombero();
    res.json(result);
});

router.put('/alerta/:id', async (req, res) => {
    const id = req.params.id;
    const tipo = req.body.tipo;
    const estado = req.body.estado;

    var result = await notificacionModel.actualizarAlerta(estado,tipo,id);
    res.send("Estado de nodo actualizado");
});
router.delete('/alerta/:id', async (req, res) => {
    const id = req.params.id;
    result = await notificacionModel.borrarAlerta(id);
    res.send('alerta borrada');
});


module.exports = router;
