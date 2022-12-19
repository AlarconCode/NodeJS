import Movies from '../Movies.json' assert { type: 'json' }

export const getMovie = (req, res) => {
        
    // field guid of movie by params
    const {guid} = req.params

    // Found the movie in BBDD
    let movie = Movies.find((movie) => movie.guid === guid)

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
        _id, 
        guid, 
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

    // The request should be id, guid and name for to be post
    if (!_id || !guid || !title) return res.status(400).send('You must add at least one id, guid and name')

    // We found the movie in BBDD
    let movie = Movies.find((movie) => movie.guid === guid)

    // Validate and reponse
    let response
    if (movie) {

        response = {
            error: true,
            code: 409,
            message: 'Movie exist in BBDD'
        }

    } else {

        Movies.push(
            {
                _id,
                guid,
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
            }
        )

        response = {
            error: false,
            code: 200,
            message: 'The Movie has been created in BBDD',
            movie: {
                _id,
                guid,
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
            }
        }
        
    }
    
    res.send(response)

}

export const putMovie = (req, res) => {

    // fields of movie by body
    const {
        _id, 
        guid, 
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

    // We found the movie in BBDD by guid
    let movie = Movies.find((movie) => movie.guid === guid)

    // Validate and reponse
    let response
    if (!movie) {

        response = {
            error: true,
            code: 409,
            message: 'Movie don`t exist in BBDD'
        }

    } else {

            if (_id) movie._id = _id
            if (title) movie.title = title 
            if (releaseYear) movie.releaseYear = releaseYear 
            if (nationality) movie.nationality = nationality 
            if (language) movie.language = language 
            if (platform) movie.platfotm = platform 
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
    let { guid } = req.query
    
    // Found index movie in BBDD
    let movieIndex = Movies.findIndex((movie) => movie.guid === guid)

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