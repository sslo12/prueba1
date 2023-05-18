const mysql = require('mysql2/promise');
const connection = mysql.createPool({
    host: 'db',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'proyecto'
});
async function traerUsuarios() {
    const result = await connection.query('SELECT * FROM usuario');
    console.log(result)
    return result[0];
} 

async function crearUsuario(tipo_usuario, usuario, contrasena, correo,telefono1,telefono2) {
    const result = await connection.query('INSERT INTO usuario VALUES(null, ?,?,?,?,?,?)', 
    [tipo_usuario,usuario,contrasena,correo,telefono1,telefono2]);
    return result;
}

async function traerUsuario(usuario) {
    const result = await connection.query('SELECT * FROM usuario WHERE usuario = ? ', usuario);
    return result[0];
}

async function actualizarUsuario(correo, telefono1, telefono2,id) {
    console.log(correo)
    console.log(telefono1)
    console.log(telefono2)
    console.log(id)
const query = 'UPDATE usuario SET correo = IFNULL(?, correo), telefono1 = IFNULL(?, telefono1), telefono2 = IFNULL(?, telefono2) WHERE id = ?';
const result = await connection.query(query, [correo,telefono1, telefono2,id]) 
return result[0];

}

async function borrarUsuario(id) {
    await connection.query('SET FOREIGN_KEY_CHECKS = 0;');
    const result = await connection.query('DELETE FROM usuario where id = ?' , [id]);
    return result;
}

module.exports = {traerUsuarios, crearUsuario,  traerUsuario, borrarUsuario, actualizarUsuario}
