// import the fs filesystem module
const fs = require('fs')

// import readline module
const readline = require('readline')

// create interface input output
const rl = readline.createInterface(process.stdin, process.stdout)

let myObject = {
    name: 'Julian',
    surname: 'Alarcon' ,
    age: '41'
}

rl.question('What is your name? ', (input) => {
    myObject.name = input
    rl.question('What is your surname? ', (input) => {
        myObject.surname = input
        rl.question('What is your age? ', (input) => {
            myObject.age = input
            rl.close()
            fs.writeFile('myObject.json', JSON.stringify(myObject), (err) => {
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
        })
    })
})



