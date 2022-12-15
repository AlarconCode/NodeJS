import express from 'express'
import Peliculas from '../Peliculas.json' assert { type: 'json' }

const writersRouter = express.Router()

writersRouter.get('/:guid',

    (req, res) => {
        
        const {idWriter} = req.query
        const {guid} = req.params
        let pelicula = Peliculas.find((pelicula) => pelicula.guid === guid)
        if (!pelicula) {
            return res.status(404).send('La pelicula no esta en la base de datos')
        }

        if (idWriter) {
            let writer = pelicula.writers.find((actor) => actor._id === idWriter)
            return res.send(writer)
        }

        return res.send(pelicula.writers)


    }

)

writersRouter.post('/:guid', 

    (req, res) => {

        // capturamos el guid de la pelicula
        const { guid } = req.params
        
        // guardamos la pelicula en memoria
        let pelicula = Peliculas.find((pelicula) => pelicula.guid === guid)
        if (!pelicula) return res.status(404).send('La pelicula no existe')

        const {idWriter, guidWriter, name, age, weight, isRetired, nationality, oscarNumber, profession} = req.body

        if (!idWriter || !guidWriter || name) return res.status(400).send('El Guionista debe tener id, guid y nombre')

        // Comprobamos si el actor ya exite
        if (pelicula.writers.find((writer) => writer.guidWriter === guidWriter)) return res.status(409).send('El guionista ya existe en esta pelicula')
 
        // Añadimos los datos recibidos al array
        pelicula.writers.push({
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

        res.send('Guionista Añadido')

    }

)

writersRouter.put('/:guid', 

    (req, res) => {

        // capturamos el guid de la pelicula
        const { guid } = req.params
        
        // guardamos la pelicula en memoria
        let pelicula = Peliculas.find((pelicula) => pelicula.guid === guid)
        if (!pelicula) return res.status(404).send('La pelicula no existe')

        const {idWriter, guidWriter, name, age, weight, isRetired, nationality, oscarNumber, profession} = req.body

       // Buscamos el writer que queremos modificar
       let writer = pelicula.writers.find((writer) => writer.idWriter === idWriter)
       
       // Comprobamos si el writer existe
       if (!writer) return res.status(404).send('El writer no existe en esta pelicula')
       
       // Modificamos los datos del writer comprobando antes si los recibimos o no
       if (guidWriter) writer.guidWriter = guidWriter
       if (name) writer.name = name
       if (age) writer.age = age
       if (weight) writer.weight = weight
       if (isRetired) writer.isRetired = isRetired
       if (nationality) writer.nationality = nationality
       if (oscarNumber) writer.oscarNumber = oscarNumber
       if (profession) writer.profession = profession

       res.send( writer )
    }

)

writersRouter.delete('/:guid', 

    (req, res) => {

        // capturamos el guid de la pelicula
        const { guid } = req.params

        // guardamos la pelicula en memoria
        let pelicula = Peliculas.find((pelicula) => pelicula.guid === guid)
        if (!pelicula) return res.status(404).send('La pelicula no existe')

        // pasamos los datos del writer a eliminar en el body de la request
        const {idWriter, guidWriter, name, age, weight, isRetired, nationality, oscarNumber, profession} = req.body

        // Comprobamos si el writer exite
        if (!pelicula.writers.find((writer) => writer.guidWriter === guidWriter)) return res.status(404).send('El writer no existe en esta pelicula')
        
        // Eliminamos el writer de la pelicula
        let indexWriter = pelicula.writers.findIndex((writer) => writer.guidWwriter === guidWriter )
        pelicula.writers.splice(indexWriter, 1)

        res.send('Guionista Eliminado')

    }

)

export default writersRouter