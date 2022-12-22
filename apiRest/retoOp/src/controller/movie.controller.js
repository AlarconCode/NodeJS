import Movies from '../Movies.json' assert { type: 'json' }
import { v4 as uuidv4 } from 'uuid'

export const getMovie = (req, res) => {
        
    // field guid of movie by params
    const {title} = req.query
    
    // Found the movie in BBDD
    let movie = Movies.find((movie) => movie.title === title)

    // Validate Movie and response
    let response 
    if (!movie) {

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
            movie: movie
        }

    }

    res.send(response)

}

export const postMovie = (req, res) => {

    // fields of movie by body
    const {
        idMovie,  
        title, 
        releaseYear, 
        nationality, 
        language, 
        platform, 
        isMCU, 
        mainCharacterName, 
        producer, 
        distributor, 
        genre
    } = req.body

    let guidMovie = uuidv4()

    let response
    // The request should be id, guid and name for to be post
    if (idMovie == null || title == null) {

        response = {
            error: true,
            code: 409,
            message: 'Debes añadir un id y un titulo a la pelicula'
        }

        return res.send(response)
        
    } 

    // We found the movie in BBDD
    let movie = Movies.find((movie) => movie.idMovie === idMovie)

    // Validate and reponse
    if (movie) {

        response = {
            error: true,
            code: 409,
            message: 'Movie exist in BBDD'
        }

    } else {

        Movies.push(
            {
                idMovie,
                guidMovie,
                title,
                releaseYear, 
                nationality, 
                language, 
                platform, 
                isMCU, 
                mainCharacterName, 
                producer, 
                distributor, 
                genre,
            }
        )

        response = {
            error: false,
            code: 200,
            message: 'The Movie has been created in BBDD',
            movie: {
                idMovie,
                guidMovie,
                title, 
                releaseYear, 
                nationality, 
                language, 
                platform, 
                isMCU, 
                mainCharacterName, 
                producer, 
                distributor, 
                genre,genre
            }
        }
        
    }
    
    return res.send(response)

}

export const putMovie = (req, res) => {

    // fields of movie by body
    const {
        idMovie,  
        title, 
        releaseYear, 
        nationality, 
        language, 
        platform, 
        isMCU, 
        mainCharacterName, 
        producer, 
        distributor, 
        genre
    } = req.body

    // We found the movie in BBDD by idMovie
    let movie = Movies.find((movie) => movie.idMovie === idMovie)

    // Validate and reponse
    let response
    if (!movie) {

        response = {
            error: true,
            code: 409,
            message: 'Movie don`t exist in BBDD'
        }

    } else {

            if (title) movie.title = title 
            if (releaseYear) movie.releaseYear = releaseYear 
            if (nationality) movie.nationality = nationality 
            if (language) movie.language = language 
            if (platform) movie.platform = platform 
            if (isMCU) movie.isMCU = isMCU
            if (mainCharacterName) movie.mainCharacterName = mainCharacterName
            if (producer) movie.producer = producer 
            if (distributor) movie.distributor = distributor
            if (genre) movie.genre = genre

        response = {
            error: false,
            code: 200,
            message: 'The Movie has been modified in BBDD',
            movie: movie
        }
        
    }
    
    res.send(response)

}

export const deleteMovie = (req, res) => {

    // Guid movie by body
    let { title } = req.query
    
    // Found index movie in BBDD
    let movieIndex = Movies.findIndex((movie) => movie.title === title)

    // Validate and response
    let response
    if (movieIndex == -1) {

        response = {
            error: true,
            code: 204,
            message: 'The Movie don`t exist in the BBDD'
        }

    } else {
        
        // Deleted Movie
        Movies.splice(movieIndex, 1)
        
        response = {
            error: false,
            code: 200,
            message: 'The Movie has been deleted successfully'
        }

    }
    
    
    res.send(response)
}