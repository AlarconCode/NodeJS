import express from 'express'
import Peliculas from '../Peliculas.json' assert { type: 'json' }

const peliculaRouter = express.Router()


peliculaRouter.get('/:guid',

    (req, res) => {
        
        const {guid} = req.params
        let pelicula = Peliculas.find((pelicula) => pelicula.guid === guid)
        if (!pelicula) {
            res.status(404).send('La pelicula no esta en la base de datos')
        }

        res.send(pelicula)

    }

)

peliculaRouter.post('/', 

    (req, res) => {

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

        if (!_id || !guid || !title) return res.status(400).send('Debes añadir un id, guid y titulo')

        if (Peliculas.find((pelicula) => pelicula.guid === guid)) return res.status(409).send('La pelicula ya exite')

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

        res.send('Nuevo registro de Pelicula creado')

    }

)

peliculaRouter.put('/:guid', 

    (req, res) => {
        const {guid} = req.params
        const {
            _id,
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

        if (!guid) return res.status(400).send('Debe enviar el campo guid para identificar la pelicula')

        let pelicula = Peliculas.find((pelicula) => pelicula.guid === guid)

        if (pelicula) {

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

        } else return res.status(404).send('La pelicula no existe')


        res.send('Pelicula modificada')

    }

)

peliculaRouter.delete('/:guid', 

    (req, res) => {

        // Asignamos a la variable guid el guid pasado en los parametros de la url
        let { guid } = req.params
        
        // Buscamos el indice del elemento a que queremos eliminar en la base de datos
        let peliculaIndex = Peliculas.findIndex((pelicula) => pelicula.guid === guid)

        // Comprobamos que el elemento que queremos borrar exista
        if (peliculaIndex == -1) res.status(404).send()
        
        // Eliminamos el elemento de la base de datos
        Peliculas.splice(peliculaIndex, 1)
        
        res.send('ELEMENTO BORRADO')
    }

)

export default peliculaRouter