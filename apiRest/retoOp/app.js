console.clear();
import express from 'express'
import Peliculas from './Peliculas.json' assert { type: 'json' }
const app = express()
const PORT = 3000

app.use(express.json())


app.get('/pelicula/:guid',

    (req, res) => {
        
        const {guid} = req.params
        let pelicula = Peliculas.find((pelicula) => pelicula.guid === guid)
        if (!pelicula) {
            res.status(404).send('La pelicula no esta en la base de datos')
        }

        res.send(pelicula)

    }

)

app.post('/pelicula', 

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

app.put('/pelicula/:guid', 

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

app.delete('/pelicula/:guid', 

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

app.get('/pelicula/actors/:guid',

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

app.post('/pelicula/actors/:guid', 

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

app.put('/pelicula/actors/:guid', 

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

app.delete('/pelicula/actors/:guid', 

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

app.get('/pelicula/director/:guid',

    (req, res) => {
        
        const {guid} = req.params
        let pelicula = Peliculas.find((pelicula) => pelicula.guid === guid)
        if (!pelicula) {
            return res.status(404).send('La pelicula no esta en la base de datos')
        }


        return res.send(pelicula.director)


    }

)

app.post('/pelicula/director/:guid', 

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

app.put('/pelicula/director/:guid', 

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

app.delete('/pelicula/director/:guid', 

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

app.get('/pelicula/writers/:guid',

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

app.post('/pelicula/writers/:guid', 

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

app.put('/pelicula/writers/:guid', 

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

app.delete('/pelicula/writers/:guid', 

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




app.listen(PORT, ()=> {
    console.log(`Server listen on port ${PORT}`);
})