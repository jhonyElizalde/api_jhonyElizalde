const express = require('express');

const respuestas = require('../../red/respuestas');
const controlador = require('./controlador');

const router = express.Router();

router.get('/', todosP);
router.get('/:id', unoP);
router.post('/', agregarP);
router.put('/', eliminarP);

async function todosP(req, res, next){
    try{
        const items = await controlador.todosP();

        respuestas.success(req,res, items, 200); 
    } catch(error){
        next(error);
    }
     
};

async function unoP (req, res, next){
    try{
        const items = await controlador.unoP(req.params.id);

        respuestas.success(req,res, items, 200);
    } catch(error){
        next(error);
    }
      
};

async function agregarP (req, res, next){
    try{
        const items = await controlador.agregarP(req.body);
        if(req.body.id == 0){
            mensaje = 'se agrego correctamente el dato'; 
        }else{
            mensaje = 'se actualizo el dato';  
        }

        respuestas.success(req,res, mensaje, 201);
    } catch(error){
        next(error);
    }
      
};

async function eliminarP (req, res, next){
    try{
        const items = await controlador.eliminarP(req.body);

        respuestas.success(req,res, 'item eliminado correctamente', 200);
    } catch(error){
        next(error);
    }
      
};

module.exports = router; 
