console.clear()
import e, { response } from 'express'
import express from 'express'
`node --trace-warnings ...`
import data from './Professional-BBDD.json' assert { type: 'json' }
const app = express()
const PORT = 3000



app.use(express.json())


app.get('/professional/:guid',

    (req, res) => {

        // Guerdamos el valor de params en guid
        let { guid } = req.params

        // Buscamos el elemento a que queremos recuperar en la base de datos
        let professional = data.find((e) => e.guid === guid)
        
        // Validamos si existe o no y respondemos
        let response 
        if(!professional) {

            response = {
                error: true,
                code: 200,
                message: 'El profesional buscado no existe'
            }

            res.status(409).send(response)
            
        } else {

            response = {
                error: false,
                code: 200,
                message: professional
            }
            
            res.send(response)
        }

    }

)

app.post('/professional', 

    (req, res) => {
        
        // Guardamos los datos del body en variables
        let { _id, guid, name, age, weight, isRetired, nationality, oscarNumber, profession } = req.body

        // Comprobamos que envien en el body los campos obligatorios para crear el objeto profesional
        if (!guid || !_id || !name) res.status(400).send() 

        // Comprobamos que el objeto que queremos crear no exista ya en la BBDD y enviamos la respuesta
        let response
        if (data.find((e) => e.guid === guid)) {

            response = {
                error: true,
                code: 4049,
                message: 'Los datos ya existen en la BBDD'
            }

            res.status(409).send(response)
 
        } else {

            response = {
                error: false,
                code: 200,
                message: 'Professional created successfully'
            }

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

            res.send(response)
        
        }        
        
    }
)

app.put('/professional',

    (req, res) => {

        // Asignacion de varialble destructurando el json que recibo en el body de la request
        let { guid, name, age, weight, isRetired, nationality, oscarNumber, profession } = req.body
        

        // Comprobacion de que existan guid, id y name en el nuevo profesional. Si no existe Bad Request
        if (!guid) res.status(400).send()

        let response
        let professional = data.find((e) => e.guid === guid)
        
        if (professional) {

            if (name) professional.name = name
            if (age) professional.age = age
            if (weight) professional.weight = weight
            if (isRetired) professional.isRetired = isRetired
            if (nationality) professional.nationality = nationality
            if (oscarNumber) professional.oscarNumber = oscarNumber
            if (profession) professional.profession = profession

            response = {
                error: false,
                code: 200,
                message: professional
            }

            res.send(response)

        } else {
            
            response = {
                error: true,
                code: 204,
                message: 'The professional dont exist in BBDD'
            }

            res.status(204).send(response)
        }


    }

)

app.delete('/professional', 

    (req, res) => {

        // Asignamos a la variable guid el guid pasado en los parametros de la url
        let { guid } = req.body
        
        // Buscamos el indice del elemento a que queremos eliminar en la base de datos
        let professionalIndex = data.findIndex((e) => e.guid === guid)
        
        // Validamos y enviamos la respuesta
        let response
        if (professionalIndex == -1) {
            
            
            response = {
                error: true,
                code: 204,
                message: 'The Professional don`t exist in BBDD'
                
            }
            
            return res.status(204).send(response)
            
        } else {
            
            // Eliminamos el elemento de la base de datos
            data.splice(professionalIndex, 1)
            
            response =  {
                error: false,
                code: 200,
                message: 'The Professional have been deleted successfully'
            }
            
            res.send(response)
        }
        
        
    }

)


app.listen(PORT, () => {
    console.log(`listen on port: ${PORT}`);
})