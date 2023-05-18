const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'db',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'proyecto'
});

async function crearDato(id_nodo,gas,temperatura,distancia,tiempo, tipo) {
    const result = await connection.query('INSERT INTO dato VALUES(null,?,?,?,?,?,?)', [id_nodo,gas,temperatura,distancia,tiempo, tipo]);
    return result;
};

async function traerdatosU(usuario) {
    const result = await connection.query('SELECT * FROM nodo n JOIN dato d ON n.id = d.id_nodo WHERE n.id_usuario = (SELECT id FROM usuario WHERE usuario = ?)', [usuario]);
    // console.log("traerPaq",result)
    return result[0];
};

async function traerDatos() {
    const result = await connection.query('SELECT * FROM dato');
    return result[0];
};
async function traerDatoId_nodo(id_nodo) {
    const result = await connection.query('SELECT * FROM dato WHERE id_nodo = ?', [id_nodo]);
    return result[0];
};



module.exports = {crearDato, traerDatos, traerDatoId_nodo, traerdatosU};

