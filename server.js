const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');


const iniciarDB = require('./models/db');
const modeloPelicula = require('./models/peliculas');
const modeloPeliculaM = require('./models/peliculasModificadas');

iniciarDB()
/*
const pelis = [
    {id:0, nombre:'El Maraja de San Telmo', rate:10, author:'Pedro Morales'},
    {id:1, nombre:'The Dark Night', rate:9, author:'Christopher Nolan'}
]
*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/nuevaPelicula', async (req,res)=>{
    let pelis;
    
    try{
        await modeloPelicula.find({})
                .then( (pelis)=>res.json(pelis) )
        
    }
    catch(error){
        console.log('Ocurrió un error')
    }
    

});

app.post('/nuevaPelicula', async (req,res)=>{

    let pelis = req.body;
    const modeloPeli = new modeloPelicula(pelis);
    try{
        await modeloPeli.save()
    }
    catch(error){
        console.log('Ocurrió un error')
    }
    
})


app.post('/cambiarRate', async (req,res)=>{
        console.log(req.body.pelicula)
        try{
            await modeloPelicula.updateOne({_id:req.body.pelicula._id},
                {
                    $set: {rate:req.body.pelicula.rate }
                })
        }
        catch(error){
            console.log('Ocurrió un error cambiando rate')
        }
    
    
    
})

app.post('/changeAuthor', async (req,res)=>{
    
    try{
        await modeloPelicula.updateOne({id:req.body.id},
            {
                $set: {author:req.body.author }
            })
    }
    catch(error){
        console.log('Ocurrió un error')
    }



})

app.post('/duplicar', async (req,res)=>{
    let peliD = req.body.pelicula;
    peliD.isNew =true;
    let newModel = new modeloPelicula(peliD);
    
    try{
        newModel._id = mongoose.Types.ObjectId();
        await newModel.save()
       
    }
    catch(error){
        console.log('Ocurrió un error',error)
    }
    
    
})

app.post('/wasModified', async (req,res)=>{
    console.log("Peli Modificada",req.body.pelicula)
    let pelis = req.body.pelicula;
    const modeloPeliM = new modeloPeliculaM(pelis);
    try{
        if ( await modeloPeliculaM.findOne({_id:pelis._id}) ){
            await modeloPeliculaM.replaceOne({_id:pelis._id},pelis)
        
        }else{
            await modeloPeliM.save()
        }
    }catch(error){
        console.log('Ocurrió un error en cargar modificacion')
    }



})

app.listen(port,()=>{ console.log(`Server Up on port ${port}`) })