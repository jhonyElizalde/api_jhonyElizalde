const app = require('./app.js');
app.listen(app.get('port'),() => {
    console.log("Servidor escuchgando en el puerto ", app.get("port"));
})