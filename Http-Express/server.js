
console.clear()
const http = require('http');
const nodemon = require('nodemon');

const server = http.createServer((req, res) => {    
    
    console.log('Peticion recibida por el cliente');
    console.log(req.method);
    console.log(req.url);
    console.log(req.headers['content-type']);
    console.log(req.headers['content-length']);
    console.log(req.headers['user-agent']);

    
    res.writeHead(200, {'content-type': 'application/json'})
    if (req.url == '/') res.write(JSON.stringify({ok:'true', message:'Recibido'}))    
    if (req.url == '/bye') res.write(JSON.stringify({ok:'true', message:'Adios'}))
    

    res.end()


}).listen(3000)