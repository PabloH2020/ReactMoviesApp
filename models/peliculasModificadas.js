const mongoose = require('mongoose');

const schemaPelicula = new mongoose.Schema ({
    id:Number,
    nombre:String,
    rate:Number,
    author:String
},{collection:'SoloPeliculasModificadas'})

const modeloPeliculaM = mongoose.model('modeloPeliculaM',schemaPelicula);


module.exports = modeloPeliculaM;