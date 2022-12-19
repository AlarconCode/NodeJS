import express from 'express'
import { getDirector, postDirector, putDirector, deleteDirector } from '../controller/director.controller.js'


const directorRouter = express.Router()

directorRouter.get('/:guid', getDirector)
directorRouter.post('/', postDirector)
directorRouter.put('/', putDirector)
directorRouter.delete('/', deleteDirector)

export default directorRouter