// import readline module
const readline = require('readline')

// create interface input output
const rl = readline.createInterface(process.stdin, process.stdout)

function readConsole(callback) {
    let myObject = {
        name: '',
        surname: '' ,
        age: ''
    }
    
    rl.question('What is your name? ', (input) => {
        myObject.name = input
        rl.question('What is your surname? ', (input) => {
            myObject.surname = input
            rl.question('What is your age? ', (input) => {
                myObject.age = input
                rl.close()
                callback('myObject.json', myObject)
            })
        })
    })
}


module.exports = {readConsole}