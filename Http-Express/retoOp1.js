console.clear()
const express = require('express')
const app = express()
const PORT = 3000

app.use(express.json())

app.get('/', (req, res) => {

    let name = req.query.name;

    if ( name != null) {
        res.send(`<h1>Nombre es ${name}</h1>`)
    } else {
        res.send('No existe name')
    }
    

    
})


app.post('/', (req, res) => {
    
    let obj = {
        name: req.body.name,
        surname: req.body.surname,
        age: req.body.age      
    }
    
    if ( obj != null) {

        res.send(obj)

    } else {
                
        res.send('error')

    }
    

})




app.listen(PORT, () => {
    console.log(`lisen Port: ${PORT}`);
})