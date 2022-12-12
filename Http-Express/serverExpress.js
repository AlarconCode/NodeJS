console.clear()
const express = require('express')
const app = express()
const PORT = 4000

app.use(express.json())

app.get('/', (req, res) => {
    console.log('Peticion Recibida del cliente');
    res.send({ok:'true', message:'Recibido'} )
    console.log(req.url, req.method, req.headers['user-agent']);
})

app.get('/bye', (req, res) => {
    console.log('Peticion Recibida del cliente');
    res.send({ok:'true', message:'Adios'})
    console.log(req.url, req.method, req.headers['user-agent']);
})


app.listen(PORT, () => {
    console.log(`Listen on port ${PORT}`);
})