const { Router } = require('express');
const router = Router();
const usuariosModel = require('../models/usuarioModels');
router.get('/usuario', async (req, res) => {
    var result;
    result = await usuariosModel.traerUsuarios();
    res.json(result);
});

router.post('/usuario', async (req, res) => {
    const tipo_usuario = req.body.tipo_usuario;
    const usuario = req.body.usuario;
    const contrasena = req.body.contrasena;
    const correo = req.body.correo;
    const telefono1 = req.body.telefono1;
    const telefono2 = req.body.telefono2;
    var result = await usuariosModel.crearUsuario(tipo_usuario, usuario, contrasena, correo,telefono1,telefono2);
    res.send("usuario creado");
});


router.get('/usuarios/:usuario', async (req, res) => {
    const usuario = req.params.usuario;
    var result;
    result = await usuariosModel.traerUsuario(usuario);
    res.json(result[0]);
});
router.put('/usuario/:id', async (req, res) => {
    const { id } = req.params;
	const { correo } = req.body;
	const { telefono1 } = req.body;
	const { telefono2 } = req.body;
    var result;
    result = await usuariosModel.actualizarUsuario(correo, telefono1, telefono2,id);
    res.send('usuario modificado');
});
router.delete('/usuario/:id', async (req, res) => {
    const id = req.params.id;
    result = await usuariosModel.borrarUsuario(id);
    res.send('usuario borrado');
});

module.exports = router; 