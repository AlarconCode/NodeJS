// import fs promises

const fsp = require('fs.promises')

const readline = require('readline')

// Promesa de readline
function toAsk(sentence) {
    
    const question = new Promise((resolve, reject) => {
        
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        rl.question(sentence, (response) => {
            resolve(response)
            rl.close()
        })

    })

    return question

}


let obj = {
    name: '',
    surname: '',
    age: ''
}

// toAsk('What is your name? ')
// .then((result) => {
//     obj.name = result
//     return toAsk('What is your surname? ')
// })
// .then((result2) => {
//     obj.surname = result2
//     return toAsk('What is your age? ') 
// }) 
// .then((result3) => {
//     obj.age = result3
//     fsp.writeFile('.myData.json', JSON.stringify(obj))
// })
// .catch((err) => {
//     console.log(err);
// });

// Promesas con asycn / await

async function getData() {

    try {
        
        obj.name = await toAsk('What is your name? ')
        obj.surname = await toAsk('What is your surname? ')
        obj.age = await toAsk('What is your age? ')        
        await fsp.writeFile('.myData.json', JSON.stringify(obj))

    } catch (error) {
        console.log(error);
    }

}

getData()


