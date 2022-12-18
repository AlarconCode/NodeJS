console.clear();
import express from 'express'
import { errorHandling } from './error/errorHandling.js';
import peliculaRouter from './routers/pelicula.js';
import actorsRouter from './routers/actors.js';
import writersRouter from './routers/writers.js';
import directorRouter from './routers/director.js';
const app = express()

app.set('PORT', process.env.PORT || 3000)
app.use(express.json())
app.use('/pelicula/actors', actorsRouter)
app.use('/pelicula/writers', writersRouter)
app.use('/peliculas/director', directorRouter)
app.use('/pelicula', peliculaRouter)
app.use(errorHandling)




export default app