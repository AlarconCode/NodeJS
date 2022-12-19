import express from 'express'
import Movies from '../Movies.json' assert { type: 'json' }

export const getWriter = (req, res) => {

    // datos de la request
    const { guid, idWriter } = req.query
    console.log(guid);

    // Validamos si hemos recibido guid e idwriter 
    if (!guid || !idWriter) res.status(400).send('Es necesario enviar los campos')  

    // Guardamos la movie que buscamos en la variable movie
    let movie = Movies.find((movie) => movie.guid === guid)

    // Validamos, si la movie no existe respondemos com 204 no content
    let response
    if (!movie) {

        response = {
            error: true,
            code: 204,
            message: 'Movie no found'
        }

        res.status(204).send(response)

    }

    // Validamos si el writer existe en la movie y respondemos
    let writer = movie.writers.find((writer) => writer.idWriter === idWriter)
    if (writer) {

        response = {
            error: false,
            code: 200,
            message: 'Found successfully',
            writer: writer
        }

        res.send(response)


    } else {

        response = {
            error: true,
            code: 204,
            message: 'The Writer not found'
        }

        res.status(204).send(response)

    }

}

export const postWriter = (req, res) => {

    // capturamos el guid de la movie
    const { guid, idWriter, guidWriter, name, age, weight, isRetired, nationality, oscarNumber, profession} = req.body
    console.log(guid);
    
    // Validamos que se introducen los datos obligatorios del nuevo writer
    if (!idWriter || !guidWriter || !name) return res.status(400).send('El writer debe tener al menos id, guid y nombre')
    
    // guardamos la movie en memoria
    let movie = Movies.find((movie) => movie.guid === guid)
    if (!movie) return res.status(404).send('La movie no existe')

    // Comprobamos si el writer ya exite y enviamos la respuesta
    let writer = movie.writers.find((writer) => writer.idWriter === idWriter)
    let response
    if (writer) {

        response = {
            error: true,
            code: 200,
            message: 'The writer exist in this Film'
        }

    } else {

        // Añadimos los datos recibidos al array
        movie.writers.push({
            idWriter,
            guidWriter,
            name,
            age,
            weight,
            isRetired,
            nationality,
            oscarNumber,
            profession
        })

        response = {
            error: false,
            code: 200,
            message: 'The writer has been created successfully',
            writer: {
                idWriter,
                guidWriter,
                name,
                age,
                weight,
                isRetired,
                nationality,
                oscarNumber,
                profession
            }
        }
        
    }
    
    res.send(response)
}

export const putWriter = (req, res) => {

    // capturamos el guid de la movie
    const { guid, idWriter, guidWriter, name, age, weight, isRetired, nationality, oscarNumber, profession} = req.body
    console.log(guid);

    // Validamos que se introducen los datos obligatorios para buscar el writer a modificar
    if (!idWwriter || !guid) return res.status(400).send('El writer debe tener al menos guid de la movie e id del writer')

    // guardamos la movie en memoria
    let movie = Movies.find((movie) => movie.guid === guid)
    if (!movie) return res.status(404).send('La movie no existe')

    // Comprobamos si el writer ya exite y enviamos la respuesta
    let writer = movie.writers.find((writer) => writer.idWriter === idWriter)
    let response
    if (writer) {


        if (guidWriter) writer.guidWriter = guidWriter
        if (name) writer.name = name
        if (age) writer.age = age
        if (weight) writer.weight = weight
        if (isRetired) writer.isRetired = isRetired
        if (nationality) writer.nationality = nationality
        if (oscarNumber) writer.oscarNumber = oscarNumber
        if (profession) writer.profession = profession

        response = {
            error: false,
            code: 200,
            message: 'writer Modified',
            writer: writer
        }

    } else {

        response = {
            error: true,
            code: 200,
            message: 'The writer don`t exists in this film'
        }


    }
    
    
    res.send(response)

}

export const deleteWriter = (req, res) => {

    // capturamos el guid de la movie
    const { guid, idWriter } = req.body

    // guardamos la movie en memoria
    let movie = Movies.find((movie) => movie.guid === guid)
    if (!movie) return res.status(404).send('La movie no existe')

    // Comprobamos si el writer exite y enviamos la respuesta
    let writer = movie.writers.find((writer) => writer.idWriter === idWriter)
    let response
    if (writer) {

        // Eliminamos el writer de la movie
        let indexWriter = movie.writers.findIndex((writer) => writer.idWriter === idWriter )
        movie.writers.splice(indexWriter, 1)

        response = {
            error: false,
            code: 200,
            message: 'writer deleted'
        }

    } else {

        response = {
            error: true,
            code: 204,
            message: 'writer dont exists'
        }

    }
    
    res.send(response)

}
