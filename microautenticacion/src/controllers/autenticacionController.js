const { Router } = require('express');
const router = Router();
const autenticacionModel = require('../models/autenticacionModels');
// Login
router.get('/usuarios/:usuario/:contrasena', async (req, res) => {
    const usuario = req.params.usuario;
    const contrasena = req.params.contrasena; 
    var result;
    result = await autenticacionModel.validarUsuario(usuario, contrasena);
    res.json(result);
});


module.exports = router; 