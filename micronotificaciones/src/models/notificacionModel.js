const mysql = require('mysql2/promise');
const connection = mysql.createPool({
    host: 'db',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'proyecto'
});
async function traerAlerta() {
    const result = await connection.query('SELECT * FROM alerta');
    return result[0];
}
async function traerAlertaUsuario(usuario) {
    const result = await connection.query('SELECT a.*, n.direccion, u.usuario FROM alerta a JOIN nodo n ON a.id_nodo = n.id JOIN usuario u ON n.id_usuario = u.id WHERE u.usuario = ?', [usuario]);
    return result[0];
}

async function traerAlertaId_nodo(id_nodo) {
    const result = await connection.query('SELECT * FROM alerta WHERE id_nodo = ?', id_nodo);
    return result[0];
}
async function traerAlertaBombero() {
    const result = await connection.query('SELECT usuario.usuario, usuario.telefono1, usuario.telefono2, nodo.direccion, alerta.id, alerta.id_nodo, alerta.tiempo, alerta.estado, alerta.tipo FROM usuario INNER JOIN nodo ON usuario.id = nodo.id_usuario	INNER JOIN alerta ON nodo.id = alerta.id_nodo WHERE alerta.tipo != "verde";');
    return result[0];
}

async function actualizarAlerta(estado,tipo,id) {
    const result = await connection.query('UPDATE alerta SET estado = COALESCE(?, estado), tipo = COALESCE(?, tipo) WHERE id = ?',[estado,tipo, id]); 
    return result[0];
};

async function borrarAlerta(id) {
    const result = await connection.query('DELETE FROM alerta WHERE id = ?' ,[id]);
    return result;
}


async function crearAlerta(id_nodo, estado,tipo) {
    const result = await connection.query('INSERT INTO alerta (id_nodo, estado, tipo) VALUES (?, ?,?)', [id_nodo, estado, tipo]);
    return result;
}


module.exports = {crearAlerta, traerAlerta, traerAlertaId_nodo, borrarAlerta,traerAlertaUsuario,traerAlertaBombero,actualizarAlerta};
