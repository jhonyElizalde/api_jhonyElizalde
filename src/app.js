const express= require('express');
const config = require('./config');

const estudiantes = require('./modulos/estudiantes/rutas');
const profesores = require('./modulos/profesores/rutas')
const morgan = require('morgan')
const error = require('./red/errors')
const app = express();
app.set('port', config.app.port);

// middewart
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// configuracion
module.exports = app;

// rutas
app.use('/api/estudiantes', estudiantes);
app.use('/api/profesores', profesores);
app.use(error);