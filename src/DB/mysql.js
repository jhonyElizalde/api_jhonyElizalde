const mysql = require('mysql');
const config = require('../config');

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
};

// Función para conectarnos con la base de datos
let conexion;

function conMysql() {
    conexion = mysql.createConnection(dbconfig);
    conexion.connect((error) => {
        if (error) {
            console.log('[db error]', error);
            setTimeout(conMysql, 200);
        } else {
            console.log('bd conectada');
        }
    });

    conexion.on('error', error => {
        console.log('[db error]', error);
        if (error.code === 'PROTOCOL_CONNECTION_LOST') {
            conMysql();
        } else {
            throw error;
        }
    });
}

conMysql();

// Funciones generales
function todos(tabla) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla}`, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

function uno(tabla, id) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE id = ?`, [id], (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

function insertar(tabla, data) {
    return new Promise((resolve, reject) => {
        conexion.query(`INSERT INTO ${tabla} SET ?`, data, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

function actualizar(tabla, data) {
    return new Promise((resolve, reject) => {
        conexion.query(`UPDATE ${tabla} SET ? WHERE id = ?`, [data, data.id], (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

function agregar(tabla, data) {
    if (data && data.id === 0) {
        return insertar(tabla, data);
    } else {
        return actualizar(tabla, data);
    }
}

function eliminar(tabla, data) {
    return new Promise((resolve, reject) => {
        conexion.query(`DELETE FROM ${tabla} WHERE id = ?`, [data.id], (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

//  profesores
function todosP(tabla) {
    return todos(tabla);
}

function unoP(tabla, id) {
    return uno(tabla, id);
}

function insertarP(tabla, data) {
    return insertar(tabla, data);
}

function actualizarP(tabla, data) {
    return actualizar(tabla, data);
}

function agregarP(tabla, data) {
    return agregar(tabla, data);
}

function eliminarP(tabla, data) {
    return eliminar(tabla, data);
}

// Exportar funciones
module.exports = {
    todos,
    uno,
    agregar,
    eliminar,
    todosP,
    unoP,
    agregarP,
    eliminarP
};
