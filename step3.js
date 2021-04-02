const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path, out){
    fs.readFile(path, 'utf8', function(err, data) {
        if (err){
            console.log("PATH ERROR", err);
            process.exit(1);
        } else {
            handleOutput(data, out);
        }
    });
}



async function webCat(url, out){
    try {
        let resp = await axios.get(url);
        handleOutput(resp.data, out);
    } catch (err){
        console.log("URL ERROR: ");
        process.exit(1);
    }
}

function handleOutput(text, outOption) {
    if (outOption) {
        fs.writeFile(outOption, text, 'utf8', function(err) {
            if(err) {
                console.log("Couldn't write to file");
                process.exit(1);
            }
        });
    } else {
        console.log(text);
    }
}

let out;
let path;

if (process.argv[2] === '--out'){
    out = process.argv[3];
    path = process.argv[4];
} else {
    path = process.argv[2];
}

if (path.slice(0, 4) === 'http') {
  webCat(path, out);
} else {
  cat(path, out);
}