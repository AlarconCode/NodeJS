import express from 'express'
import { getWriter, postWriter, putWriter, deleteWriter } from '../controller/writers.controller.js'

const writersRouter = express.Router()

writersRouter.get('/', getWriter)

writersRouter.post('/', postWriter)

writersRouter.put('/', putWriter)

writersRouter.delete('/', deleteWriter)

export default writersRouter