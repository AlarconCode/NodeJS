// import the fs filesystem module
const fs = require('fs')

let myObject = {
    name: 'Julian',
    surname: 'Alarcon',
    age: 41
}

let data = JSON.stringify(myObject)

fs.writeFile('myObject.json', data, (err) => {
    if (err) console.log(err);
    else {
        console.log('File write successfully');
        console.log('The file has the following contents:');
        fs.readFile('myObject.json', 'utf8', 
            (err, data) => {
                err ? console.log(err) : console.log(data);
            }
        );
    }
})