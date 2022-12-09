// import fs promises

const fsp = require('fs.promises')


let obj = {
    name: 'Pedro',
    surname: 'Ruiz',
    age: '33'
}

// Tratando promesas con then and catch

fsp.writeFile('.myData.json', JSON.stringify(obj))

// .then((result) => {
//     console.log('File written succesfully');
//     console.log(result);
// }).catch((err) => {
//     console.log('con error');
//     console.log(err);
// });

// Crear archivo tratando promesas con Async / Await

async function createFile() {
    try {
        await fsp.writeFile('.myData.json', JSON.stringify(obj))
        console.log('File written succesfully');

    } catch (err) {
        console.log(err);
    }
}

createFile()