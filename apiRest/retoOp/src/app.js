console.clear();
import express from 'express'
import { errorHandling } from './error/errorHandling.js';
import movieRouter from './routers/movie.js';
import actorsRouter from './routers/actors.js';
import writersRouter from './routers/writers.js';
import directorRouter from './routers/director.js';
const app = express()

app.set('PORT', process.env.PORT || 3000)
app.use(express.json())
app.use('/movie/actors', actorsRouter)
app.use('/movie/writers', writersRouter)
app.use('/movies/director', directorRouter)
app.use('/movie', movieRouter)
app.use(errorHandling)




export default app