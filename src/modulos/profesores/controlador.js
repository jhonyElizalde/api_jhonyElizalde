const db = require('../../DB/mysql');

const Tabla = 'profesor';


 function todosP(){
    return db.todosP(Tabla)
 }

 function unoP(id){
   return db.unoP(Tabla, id);
}

function agregarP(body){
   return db.agregarP(Tabla, body);
}

function eliminarP(body){
   return db.eliminarP(Tabla, body);
}

 module.exports ={
    todosP,
    unoP,
    agregarP,
    eliminarP
 }