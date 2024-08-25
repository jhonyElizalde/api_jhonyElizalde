const respuesta = require('./respuestas');

function errors(error, req, res, next){
    console.error('[error', error);
    const message= error.message || 'error interno';
    const status= error.status || 500;
    respuesta.error(req, res, message, status);
}
 module.exports= errors;