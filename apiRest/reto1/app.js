console.clear()
import e from 'express'
import express from 'express'
`node --trace-warnings ...`
import data from './Professional-BBDD.json' assert { type: 'json' }
const app = express()
const PORT = 3000



app.use(express.json())


app.get('/professional/:guid',

    (req, res) => {

        // Asignamos a la variable guid el guid pasado en los parametros de la url
        let { guid } = req.params

        // Buscamos el elemento a que queremos recuperar en la base de datos
        let professional = data.find((e) => e.guid === guid)
        // Si este exite 
        if(!professional) {
            res.status(404).send('El profesional buscado no existe')
        }

        res.send(professional)
    }

)

app.post('/professional', 

    (req, res) => {
        
        // Asignacion de varialble destructurando el json que recibo en el body de la request
        let { _id, guid, name, age, weight, isRetired, nationality, oscarNumber, profession } = req.body

        // comprobacion de que existan guid, id y name en el nuevo profesional. Si no existe Bad Request
        if (!guid || !_id || !name) res.status(400).send() 
        
        // Comprobacion de que no exista ya en la base de datos. Si existe 409 conflicto
        if (data.find((e) => e.guid === guid)) res.status(409).send()

        // añadimos el nuevo profesional a la base de datos. 
        data.push({
            _id: _id,
            guid: guid,
            name: name,
            age: age,
            weight: weight,
            isRetired: isRetired,
            nationality: nationality,
            oscarNumber: oscarNumber,
            profession: profession
        })

        res.send()
    }
)

app.put('/professional/:guid',

    (req, res) => {

        // Asignacion de varialble destructurando el json que recibo en el body de la request
        let { name, age, weight, isRetired, nationality, oscarNumber, profession } = req.body
        let { guid } = req.params

        // Comprobacion de que existan guid, id y name en el nuevo profesional. Si no existe Bad Request
        if (!guid) res.status(400).send()

        let professional = data.find((e) => e.guid === guid)
        if (professional) {

            if (name) professional.name = name
            if (age) professional.age = age
            if (weight) professional.weight = weight
            if (isRetired) professional.isRetired = isRetired
            if (nationality) professional.nationality = nationality
            if (oscarNumber) professional.oscarNumber = oscarNumber
            if (profession) professional.profession = profession


        } else res.status(404).res.send('NO EXISTE')

        res.send()

    }

)

app.delete('/professional/:guid', 

    (req, res) => {

        // Asignamos a la variable guid el guid pasado en los parametros de la url
        let { guid } = req.params
        
        // Buscamos el indice del elemento a que queremos eliminar en la base de datos
        let professionalIndex = data.findIndex((e) => e.guid === guid)
        console.log(professionalIndex);
        // Comprobamos que el elemento que queremos borrar exista
        if (professionalIndex == -1) res.status(404).send()
        
        // Eliminamos el elemento de la base de datos
        data.splice(professionalIndex, 1)
        
        res.send('ELEMENTO BORRADO')
    }

)


app.listen(PORT, () => {
    console.log(`listen on port: ${PORT}`);
})