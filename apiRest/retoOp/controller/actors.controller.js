import express from 'express'
import Peliculas from '../Peliculas.json' assert { type: 'json' }


export const getActor = (req, res) => {
        
    // datos de la request
    const { guid, idActor } = req.query
    console.log(guid);

    // Validamos si hemos recibido guid e idActor 
    if (!guid || !idActor) res.status(400).send('Es necesario enviar los campos')  

    // Guardamos la pelicula que buscamos en la variable pelicula
    let pelicula = Peliculas.find((pelicula) => pelicula.guid === guid)

    // Validamos, si la pelicula no existe respondemos com 204 no content
    let response
    if (!pelicula) {
        
        response = {
            error: true,
            code: 204,
            message: 'La pelicula no existe'
        }

        res.status(204).send(response)

    }

    // Validamos si el actor existe en la pelicula y respondemos


    let actor = pelicula.actors.find((actor) => actor.idActor === idActor)
    if (actor) {
        
        response = {
            error: false,
            code: 200,
            message: 'Found successfully',
            actor: actor
        }

        res.send(response)


    } else {

        response = {
            error: true,
            code: 204,
            message: 'The Actor not found'
        }

        res.status(204).send(response)

    }


}

export const postActor = (req, res) => {

    // capturamos el guid de la pelicula
    const { guid, idActor, guidActor, name, age, weight, isRetired, nationality, oscarNumber, profession} = req.body
    console.log(guid);
    
    // Validamos que se introducen los datos obligatorios del nuevo actor
    if (!idActor || !guidActor || !name) return res.status(400).send('El Actor debe tener al menos id, guid y nombre')
    
    // guardamos la pelicula en memoria
    let pelicula = Peliculas.find((pelicula) => pelicula.guid === guid)
    if (!pelicula) return res.status(404).send('La pelicula no existe')

    // Comprobamos si el actor ya exite y enviamos la respuesta
    let actor = pelicula.actors.find((actor) => actor.idActor === idActor)
    let response
    if (actor) {

        response = {
            error: true,
            code: 200,
            message: 'The Actor exist in this Film'
        }

    } else {

        // Añadimos los datos recibidos al array
        pelicula.actors.push({
            idActor,
            guidActor,
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
            message: 'The Actor has been created successfully',
            actor: {
                idActor,
                guidActor,
                name,
                age,
                weight,
                isRetired,
                nationality,
                oscarNumber,
                profession
            }
        }
        
        
        res.send(response)
    }

}

export const putActor = (req, res) => {

    // capturamos el guid de la pelicula
    const { guid, idActor, guidActor, name, age, weight, isRetired, nationality, oscarNumber, profession} = req.body
    console.log(guid);

    // Validamos que se introducen los datos obligatorios para buscar el actor a modificar
    if (!idActor || !guid) return res.status(400).send('El Actor debe tener al menos guid de la pelicula e id del actor')

    // guardamos la pelicula en memoria
    let pelicula = Peliculas.find((pelicula) => pelicula.guid === guid)
    if (!pelicula) return res.status(404).send('La pelicula no existe')

    // Comprobamos si el actor ya exite y enviamos la respuesta
    let actor = pelicula.actors.find((actor) => actor.idActor === idActor)
    let response
    if (actor) {


        if (guidActor) actor.guidActor = guidActor
        if (name) actor.name = name
        if (age) actor.age = age
        if (weight) actor.weight = weight
        if (isRetired) actor.isRetired = isRetired
        if (nationality) actor.nationality = nationality
        if (oscarNumber) actor.oscarNumber = oscarNumber
        if (profession) actor.profession = profession

        response = {
            error: false,
            code: 200,
            message: 'Actor Modified',
            actor: actor
        }

    } else {

        response = {
            error: true,
            code: 200,
            message: 'The Actor don`t exists in this film'
        }


    }
    
    
    res.send(response)

}

export const deleteActor = (req, res) => {

    // capturamos el guid de la pelicula
    const { guid, idActor } = req.body

    // guardamos la pelicula en memoria
    let pelicula = Peliculas.find((pelicula) => pelicula.guid === guid)
    if (!pelicula) return res.status(404).send('La pelicula no existe')

    // Comprobamos si el actor exite y enviamos la respuesta
    let actor = pelicula.actors.find((actor) => actor.idActor === idActor)
    let response
    if (actor) {

        // Eliminamos el actor de la pelicula
        let indexActor = pelicula.actors.findIndex((actor) => actor.idActor === idActor )
        pelicula.actors.splice(indexActor, 1)

        response = {
            error: false,
            code: 200,
            message: 'Actor deleted'
        }

    } else {

        response = {
            error: true,
            code: 204,
            message: 'Actor dont exists'
        }

    }
    
    res.send(response)

}

