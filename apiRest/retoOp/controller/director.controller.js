import express from 'express'
import Peliculas from '../Peliculas.json' assert { type: 'json' }

export const getDirector = (req, res) => {
    
    // Guid Movie by params
    const {guid} = req.params

    // Movie stored in a variable
    let pelicula = Peliculas.find((pelicula) => pelicula.guid === guid)

    // Validate and response
    let response
    if (!pelicula) {
        
        response = {
            error: true,
            code: 204,
            message: 'Movie don`t exist in the BBDD'
        }

    } else {

        response = {
            error: false,
            code: 200,
            message: 'Director found succesfully',
            director: pelicula.director
        }

    }

    res.send(response)

}

export const postDirector = (req, res) => {

    // guid movie and fields new director to post by body
    const {guid, idDirector, guidDirector, name, age, weight, isRetired, nationality, oscarNumber, profession} = req.body

    // The request must be guid of movie
    if (!guid) res.status(204).send('You must send guid of Movie in body')

    // The new director in body must be at least one idDirector and name
    if (!idDirector || !name) res.status(409).send('You must send at least one idDirector and name')

    // We found the movie in BBDD
    let pelicula = Peliculas.find((pelicula) => pelicula.guid === guid)

    // Add new director to movie and response 
    let response
    if (!pelicula) {

        response = {
            error: true,
            code: 204,
            message: 'The Movie don`t exist in the BBDD'
        }

    } else {

        pelicula.director = {
            idDirector,
            guidDirector,
            name,
            age,
            weight,
            isRetired,
            nationality,
            oscarNumber,
            profession
        }

        response = {
            error: false,
            code: 200,
            message: 'The Director has been add to Movie in BBDD',
            pelicula: pelicula.director
        }
        
    }
    
    res.send(response)

}

export const putDirector = (req, res) => {

    // guid movie and fields new director to post by body
    const {guid, idDirector, guidDirector, name, age, weight, isRetired, nationality, oscarNumber, profession} = req.body

    // The request must be guid of movie
    if (!guid) res.status(204).send('You must send guid of Movie in body')

    // You have to send ideDirector to modified your data
    if (!idDirector) res.status(409).send('You must send at least one idDirector to modified')

    // We found the movie in BBDD
    let pelicula = Peliculas.find((pelicula) => pelicula.guid === guid)

    // Add new director to movie and response 
    let response
    if (!pelicula) {

        response = {
            error: true,
            code: 204,
            message: 'The Movie don`t exist in the BBDD'
        }

    } else {

        if (guidDirector) pelicula.director.guidDirector = guidDirector
        if (name) pelicula.director.name = name
        if (age) pelicula.director.age = age
        if (weight) pelicula.director.weight = weight
        if (isRetired) pelicula.director.isRetired = isRetired
        if (nationality) pelicula.director.nationality = nationality
        if (oscarNumber) pelicula.director.oscarNumber = oscarNumber
        if (profession) pelicula.director.profession = profession

        response = {
            error: false,
            code: 200,
            message: 'The Director has been add to Movie in BBDD',
            pelicula: pelicula.director
        }
        
    }
    
    res.send(response)

}

export const deleteDirector = (req, res) => {

    // Guid Movie and idDirector by body
    const { guid, idDirector } = req.body

    // Stored Movie in a varible
    let pelicula = Peliculas.find((pelicula) => pelicula.guid === guid)
    if (!pelicula) return res.status(204).send('The Movie don`t exist in the BBDD')

    let response
    if (pelicula.director.idDirector != idDirector ) {

        response = {
            error: true,
            code: 204,
            message: 'The director dont exist'
        }

    } else {

        pelicula.director = {}

        response = {
            error: false,
            code: 200,
            message: 'Director Deleted Successfully'
        }

    }

    res.send('response')

}