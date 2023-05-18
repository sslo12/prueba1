const mysql = require('mysql2/promise');
const connection = mysql.createPool({
    host: 'db',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'proyecto'
});
async function crearNodo(direccion,id_usuario) {
    console.log(direccion)
    console.log(id_usuario)
    const result = await connection.query('INSERT INTO nodo VALUES(null,?,?)', [direccion,id_usuario]);
    return result[0];
};



async function traerNodoU(id_usuario) {
    const result = await connection.query('SELECT * FROM nodo where id_usuario=?', [id_usuario]);
    // console.log("traerPaq",result)
    return result[0];
};

async function traerNodoBorrar(id_usuario) {
    const result = await connection.query('SELECT nodo.id, nodo.direccion, usuario.id AS usuario_id, usuario.usuario,usuario.correo FROM nodo INNER JOIN usuario ON nodo.id_usuario = usuario.id');
    // console.log("traerPaq",result)
    return result[0];
};



async function traerNodosU() {
    const result = await connection.query('SELECT * FROM nodo');
    return result[0];
};

async function actualizarNodo(id, direccion) {
    const result = await connection.query('UPDATE nodo SET direccion = ? WHERE id = ?', [direccion, id]); 
    return result[0];
};

async function borrarNodo(id) {
await connection.query('SET FOREIGN_KEY_CHECKS = 0');    
const result = await connection.query('DELETE FROM nodo WHERE id = ?', [id]);
    return result;
}

module.exports = {crearNodo, traerNodosU, actualizarNodo, borrarNodo, traerNodoU,traerNodoBorrar};

