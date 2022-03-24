const mongoose = require('mongoose');

const schemaPelicula = new mongoose.Schema ({
    id:Number,
    nombre:String,
    rate:Number,
    author:String
},{collection:'Peliculas'})

const modeloPelicula = mongoose.model('modeloPelicula',schemaPelicula);


module.exports = modeloPelicula;