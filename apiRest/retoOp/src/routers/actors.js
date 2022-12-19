import express from 'express'
import { getActor, postActor, putActor, deleteActor } from '../controller/actors.controller.js'


const actorsRouter = express.Router()


actorsRouter.get('/', getActor)

actorsRouter.post('/', postActor)

actorsRouter.put('/', putActor)

actorsRouter.delete('/', deleteActor)

export default actorsRouter