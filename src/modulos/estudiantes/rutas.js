const express = require('express');

const respuestas = require('../../red/respuestas');
const controlador = require('./controlador');

const router = express.Router();

router.get('/', todos);
router.get('/:id', uno);
router.post('/', agregar);
router.put('/', eliminar);

async function todos(req, res, next){
    try{
        const items = await controlador.todos();

        respuestas.success(req,res, items, 200); 
    } catch(error){
        next(error);
    }
     
};

async function uno (req, res, next){
    try{
        const items = await controlador.uno(req.params.id);

        respuestas.success(req,res, items, 200);
    } catch(error){
        next(error);
    }
      
};

async function agregar (req, res, next){
    try{
        const items = await controlador.agregar(req.body);
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

async function eliminar (req, res, next){
    try{
        const items = await controlador.eliminar(req.body);

        respuestas.success(req,res, 'item eliminado correctamente', 200);
    } catch(error){
        next(error);
    }
      
};

module.exports = router; 
