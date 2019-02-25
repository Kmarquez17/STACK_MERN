// Utilizar nuevas funcionalidades del Ecmascript 6
'use strict'
 
// Cargamos el módulo de mongoose para poder conectarnos a MongoDB
var mongoose = require('mongoose');
 
//Ruta donde esta mi base de datos
const URI = 'mongodb://localhost/mern-tasks'

// Le indicamos a Mongoose que haremos la conexión con Promesas
mongoose.Promise = global.Promise;
 
// Usamos el método connect para conectarnos a nuestra base de datos
mongoose.connect(URI, {useNewUrlParser: true})
        .then(db => console.log('DB is Connect'))
        .catch(err => console.log(err));
        // Si no se conecta correctamente escupimos el error
module.exports = mongoose