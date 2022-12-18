import express from 'express'
import { getPelicula, postPelicula, putPelicula, deletePelicula } from '../controller/pelicula.controller.js'

const peliculaRouter = express.Router()


peliculaRouter.get('/:guid', getPelicula)

peliculaRouter.post('/', postPelicula)

peliculaRouter.put('/', putPelicula)

peliculaRouter.delete('/', deletePelicula)

export default peliculaRouter