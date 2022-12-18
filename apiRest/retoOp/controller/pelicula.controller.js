import express from 'express'
import Peliculas from '../Peliculas.json' assert { type: 'json' }


export const getPelicula = (req, res) => {
        
    // field guid of movie by params
    const {guid} = req.params

    // Found the movie in BBDD
    let pelicula = Peliculas.find((pelicula) => pelicula.guid === guid)

    // Validate Movie and response
    let response 
    if (!pelicula) {

        response = {
            error: true,
            code: 204,
            message: 'Movie don`t exist in BBDD'
        }

    } else {

        response = {
            error: false,
            code: 200,
            message: 'Movie has been found',
            pelicula: pelicula
        }

    }

    res.send(response)

}

export const postPelicula = (req, res) => {

    // fields of pelicula by body
    const {
        _id, 
        guid, 
        title, 
        releaseYear, 
        nationality, 
        lenguaje, 
        platform, 
        isMCU, 
        mainCharacterName, 
        producer, 
        distributor, 
        gendre
    } = req.body

    // The request should be id, guid and name for to be post
    if (!_id || !guid || !title) return res.status(400).send('You must add at least one id, guid and name')

    // We found the movie in BBDD
    let pelicula = Peliculas.find((pelicula) => pelicula.guid === guid)

    // Validate and reponse
    let response
    if (pelicula) {

        response = {
            error: true,
            code: 409,
            message: 'Movie exist in BBDD'
        }

    } else {

        Peliculas.push(
            {
                _id,
                guid,
                title, 
                releaseYear, 
                nationality, 
                lenguaje, 
                platform, 
                isMCU, 
                mainCharacterName, 
                producer, 
                distributor, 
                gendre
            }
        )

        response = {
            error: false,
            code: 200,
            message: 'The Movie has been created in BBDD',
            pelicula: {
                _id,
                guid,
                title, 
                releaseYear, 
                nationality, 
                lenguaje, 
                platform, 
                isMCU, 
                mainCharacterName, 
                producer, 
                distributor, 
                gendre
            }
        }
        
    }
    
    res.send(response)

}

export const putPelicula = (req, res) => {

    // fields of pelicula by body
    const {
        _id, 
        guid, 
        title, 
        releaseYear, 
        nationality, 
        lenguaje, 
        platform, 
        isMCU, 
        mainCharacterName, 
        producer, 
        distributor, 
        gendre
    } = req.body

    // We found the movie in BBDD by guid
    let pelicula = Peliculas.find((pelicula) => pelicula.guid === guid)

    // Validate and reponse
    let response
    if (!pelicula) {

        response = {
            error: true,
            code: 409,
            message: 'Movie don`t exist in BBDD'
        }

    } else {

            if (_id) pelicula._id = _id
            if (title) pelicula.title = title 
            if (releaseYear) pelicula.releaseYear = releaseYear 
            if (nationality) pelicula.nationality = nationality 
            if (lenguaje) pelicula.lenguaje = lenguaje 
            if (platform) pelicula.platfotm = platform 
            if (isMCU) pelicula.isMCU = isMCU
            if (mainCharacterName) pelicula.mainCharacterName = mainCharacterName
            if (producer) pelicula.producer = producer 
            if (distributor) pelicula.distributor = distributor
            if (gendre) pelicula.gendre = gendre

        response = {
            error: false,
            code: 200,
            message: 'The Movie has been modified in BBDD',
            pelicula: pelicula
        }
        
    }
    
    res.send(response)

}

export const deletePelicula = (req, res) => {

    // Guid pelicula by body
    let { guid } = req.params
    
    // Found index pelicula in BBDD
    let peliculaIndex = Peliculas.findIndex((pelicula) => pelicula.guid === guid)

    // Validate and response
    let response
    if (peliculaIndex == -1) {

        response = {
            error: true,
            code: 204,
            message: 'The Movie don`t exist in the BBDD'
        }

    } else {
        
        // Deleted Movie
        Peliculas.splice(peliculaIndex, 1)
        
        response = {
            error: false,
            code: 200,
            message: 'The Movie has been deleted successfully'
        }

    }
    
    
    res.send(response)
}