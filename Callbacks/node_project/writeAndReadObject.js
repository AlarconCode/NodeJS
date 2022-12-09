// import the fs filesystem module
const fs = require('fs')

function writeAndRead(path, obj) {

    fs.writeFile(path, JSON.stringify(obj), (err) => {
        if (err) console.log(err);
        else {
            console.log('File write successfully');
            console.log('The file has the following contents:');
            fs.readFile(path, 'utf8', 
                (err, data) => {
                    err ? console.log(err) : console.log(data);
                }
            );
        }
    })
}

module.exports = {writeAndRead}