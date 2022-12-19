import express from 'express'
import { getMovie, postMovie, putMovie, deleteMovie } from '../controller/movie.controller.js'

const movieRouter = express.Router()


movieRouter.get('/:guid', getMovie)

movieRouter.post('/', postMovie)

movieRouter.put('/', putMovie)

movieRouter.delete('/', deleteMovie)

export default movieRouter