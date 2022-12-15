import express from 'express'
import Peliculas from '../Peliculas.json' assert { type: 'json' }

const actorsRouter = express.Router()


actorsRouter.get('/:guid',

    (req, res) => {
        
        const {idActor} = req.query
        const {guid} = req.params
        let pelicula = Peliculas.find((pelicula) => pelicula.guid === guid)
        if (!pelicula) {
            return res.status(404).send('La pelicula no esta en la base de datos')
        }

        if (idActor) {
            let actor = pelicula.actors.find((actor) => actor.idActor === idActor)
            return res.send(actor)
        }

        return res.send(pelicula.actors)


    }
)

actorsRouter.post('/:guid', 

    (req, res) => {

        // capturamos el guid de la pelicula
        const { guid } = req.params
        
        // guardamos la pelicula en memoria
        let pelicula = Peliculas.find((pelicula) => pelicula.guid === guid)
        if (!pelicula) return res.status(404).send('La pelicula no existe')

        const {idActor, guidActor, name, age, weight, isRetired, nationality, oscarNumber, profession} = req.body

        if (!idActor || !guidActor || !name) return res.status(400).send('El Actor debe tener id, guid y nombre')

        // Comprobamos si el actor ya exite
        if (pelicula.actors.find((actor) => actor.guidActor === guidActor)) return res.status(409).send('El actor ya existe en esta pelicula')
 
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

        res.send('Actor Añadido')

    }

)

actorsRouter.put('/:guid', 

    (req, res) => {

        // capturamos el guid de la pelicula
        const { guid } = req.params
        
        // guardamos la pelicula en memoria
        let pelicula = Peliculas.find((pelicula) => pelicula.guid === guid)
        if (!pelicula) return res.status(404).send('La pelicula no existe')

        // pasamos los datos del actor a modificar en el body de la request
        const {idActor, guidActor, name, age, weight, isRetired, nationality, oscarNumber, profession} = req.body

        // Buscamos el actor que queremos modificar
        let actor = pelicula.actors.find((actor) => actor.idActor === idActor)
       
        // Comprobamos si el actor existe
        if (!actor) return res.status(404).send('El actor no existe en esta pelicula')
        
        // Modificamos los datos del actor comprobando antes si los recibimos o no
        if (guidActor) actor.guidActor = guidActor
        if (name) actor.name = name
        if (age) actor.age = age
        if (weight) actor.weight = weight
        if (isRetired) actor.isRetired = isRetired
        if (nationality) actor.nationality = nationality
        if (oscarNumber) actor.oscarNumber = oscarNumber
        if (profession) actor.profession = profession

        res.send( actor )

    }

)

actorsRouter.delete('/:guid', 

    (req, res) => {

        // capturamos el guid de la pelicula
        const { guid } = req.params

        // guardamos la pelicula en memoria
        let pelicula = Peliculas.find((pelicula) => pelicula.guid === guid)
        if (!pelicula) return res.status(404).send('La pelicula no existe')

        // pasamos los datos del actor a eliminar en el body de la request
        const {idActor, guidActor, name, age, weight, isRetired, nationality, oscarNumber, profession} = req.body

        // Comprobamos si el actor exite
        if (!pelicula.actors.find((actor) => actor.guidActor === guidActor)) return res.status(404).send('El actor no existe en esta pelicula')
        
        // Eliminamos el actor de la pelicula
        let indexActor = pelicula.actors.findIndex((actor) => actor.guidActor === guidActor )
        pelicula.actors.splice(indexActor, 1)

        res.send('Actor Eliminado')

    }

)

export default actorsRouter