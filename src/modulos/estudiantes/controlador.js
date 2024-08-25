const db = require('../../DB/mysql');

const Tabla = 'estudiante';


 function todos(){
    return db.todos(Tabla)
 }

 function uno(id){
   return db.uno(Tabla, id);
}

function agregar(body){
   return db.agregar(Tabla, body);
}

function eliminar(body){
   return db.eliminar(Tabla, body);
}

 module.exports ={
    todos,
    uno,
    agregar,
    eliminar
 }