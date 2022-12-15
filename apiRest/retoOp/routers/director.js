import express from 'express'
import Peliculas from '../Peliculas.json' assert { type: 'json' }

const directorRouter = express.Router()

directorRouter.get('/:guid',

    (req, res) => {
        
        const {guid} = req.params
        let pelicula = Peliculas.find((pelicula) => pelicula.guid === guid)
        if (!pelicula) {
            return res.status(404).send('La pelicula no esta en la base de datos')
        }


        return res.send(pelicula.director)


    }

)

directorRouter.post('/:guid', 

    (req, res) => {

        // capturamos el guid de la pelicula
        const { guid } = req.params
        
        // guardamos la pelicula en memoria
        let pelicula = Peliculas.find((pelicula) => pelicula.guid === guid)
        if (!pelicula) return res.status(404).send('La pelicula no existe')

        // Datos del director a crear enviados en el body de la request
        const {idDirector, guidDirector, name, age, weight, isRetired, nationality, oscarNumber, profession} = req.body

        // Comprobamos que se envian al menos estos tres datos del director que queremos crear
        if (!idDirector || !guidDirector || name) return res.status(400).send('El Director debe tener id, guid y nombre')

        // Comprobamos si el director existe
        if ( pelicula.director.guidDirector === guidDirector )  return res.status(409).send('El director ya existe en esta pelicula')

        // Añadimos los datos recibidos
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

        res.send('Director Añadido')

    }

)

directorRouter.put('/:guid', 

    (req, res) => {

        // capturamos el guid de la pelicula
        const { guid } = req.params
        
        // guardamos la pelicula en memoria
        let pelicula = Peliculas.find((pelicula) => pelicula.guid === guid)
        if (!pelicula) return res.status(404).send('La pelicula no existe')

        const {idDirector, guidDirector, name, age, weight, isRetired, nationality, oscarNumber, profession} = req.body

        // Comprobamos si el actor no exite
        if (pelicula.director.guidDirector != guidDirector) return res.status(404).send('El director no existe en esta pelicula')
 
        // Modificamos los datos recibidos al array

           if (idDirector) pelicula.director.idDirector = idDirector
           if (guidDirector) pelicula.director.guidDirector = guidDirector
           if (name) pelicula.director.name = name
           if (age) pelicula.director.age = age
           if (weight) pelicula.director.weight = weight
           if (isRetired) pelicula.director.isRetired = isRetired
           if (nationality) pelicula.director.nationality = nationality
           if (oscarNumber) pelicula.director.oscarNumber = oscarNumber
           if (profession) pelicula.director.profession = profession

        res.send(pelicula.director)

    }

)

directorRouter.delete('/:guid', 

    (req, res) => {

        // capturamos el guid de la pelicula
        const { guid } = req.params

        // guardamos la pelicula en memoria
        let pelicula = Peliculas.find((pelicula) => pelicula.guid === guid)
        if (!pelicula) return res.status(404).send('La pelicula no existe')

        // pasamos los datos del Director a eliminar en el body de la request
        const {idDirector, guidDirector, name, age, weight, isRetired, nationality, oscarNumber, profession} = req.body

        // Comprobamos si el Director exite
        if (pelicula.director.guidDirector != guidDirector ) return res.status(404).send('El Director no existe en esta pelicula')
        
        // Eliminamos el Director de la pelicula
        pelicula.director = {}

        res.send('Director Eliminado')

    }

)

export default directorRouter