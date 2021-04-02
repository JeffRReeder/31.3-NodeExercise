const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path){
    fs.readFile(path, 'utf8', function(err, data) {
        if (err){
            console.log("ERROR", err);
            process.exit(1);
        }
        console.log("Your file shows: ", data);
    });
}

cat(process.argv[2]);

function webCat(path){
    fs.readFile(path, function(err, data){
        if (err){
            console.log(err);
            process.exit(1);
        }
        console.log("Data is: ", data);
    });
}