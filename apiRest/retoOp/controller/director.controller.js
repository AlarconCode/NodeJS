import express from 'express'
import Movies from '../Movies.json' assert { type: 'json' }

export const getDirector = (req, res) => {
    
    // Guid Movie by params
    const {guid} = req.params

    // Movie stored in a variable
    let movie = Movies.find((movie) => movie.guid === guid)

    // Validate and response
    let response
    if (!movie) {
        
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
            director: movie.director
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
    let movie = Movies.find((movie) => movie.guid === guid)

    // Add new director to movie and response 
    let response
    if (!movie) {

        response = {
            error: true,
            code: 204,
            message: 'The Movie don`t exist in the BBDD'
        }

    } else {

        movie.director = {
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
            movie: movie.director
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
    let movie = Movies.find((movie) => movie.guid === guid)

    // Add new director to movie and response 
    let response
    if (!movie) {

        response = {
            error: true,
            code: 204,
            message: 'The Movie don`t exist in the BBDD'
        }

    } else {

        if (guidDirector) movie.director.guidDirector = guidDirector
        if (name) movie.director.name = name
        if (age) movie.director.age = age
        if (weight) movie.director.weight = weight
        if (isRetired) movie.director.isRetired = isRetired
        if (nationality) movie.director.nationality = nationality
        if (oscarNumber) movie.director.oscarNumber = oscarNumber
        if (profession) movie.director.profession = profession

        response = {
            error: false,
            code: 200,
            message: 'The Director has been add to Movie in BBDD',
            movie: movie.director
        }
        
    }
    
    res.send(response)

}

export const deleteDirector = (req, res) => {

    // Guid Movie and idDirector by body
    const { guid, idDirector } = req.body

    // Stored Movie in a varible
    let movie = Movies.find((movie) => movie.guid === guid)
    if (!movie) return res.status(204).send('The Movie don`t exist in the BBDD')

    let response
    if (movie.director.idDirector != idDirector ) {

        response = {
            error: true,
            code: 204,
            message: 'The director dont exist'
        }

    } else {

        movie.director = {}

        response = {
            error: false,
            code: 200,
            message: 'Director Deleted Successfully'
        }

    }

    res.send('response')

}