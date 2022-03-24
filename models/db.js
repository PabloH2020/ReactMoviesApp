const mongoose = require('mongoose');

const iniciarDB = async function(){
    await mongoose.connect('mongodb://localhost:27017/Peliculas');
    console.log('Base de Datos Conectada');
}

module.exports = iniciarDB;