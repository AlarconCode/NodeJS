// import writeAndRead and import readConsole
const { readConsole } = require('./readConsole')
const { writeAndRead } = require('./writeAndReadObject')

// import readline
const readline = require('readline')
// create interface
const rl = readline.createInterface(process.stdin, process.stdout)

let obj = {
    name: 'Pedro',
    surname: 'Ruiz' ,
    age: '20'
}

const path = './myObject.json'

rl.question('Do you want input data by console? ', (input) => {
    if (input == 'yes' || input == 'Y' || input == 'y') {
        readConsole(writeAndRead)
    } else {
        writeAndRead(path, obj)
        rl.close()
    }
    
})






