const http = require('http');
const mysql=require('mysql');
const db = require('./DBConnection');
const fs = require('fs');
function getResponse(response, filename, filetype) {
    response.writeHead(200, { 'content-type': filetype });
    fs.readFile(filename, (err, fileContents) => {
        if (err)
            throw err;

        response.write(fileContents);
        response.end();
    });
}
http.createServer((request, response) => {
    let filename = './login.html';
    let filetype = 'text/html';
    if (request.url.includes('.html')) {
        filename = `.${request.url}`; //'.'+request.url
    }
    else if (request.url.includes('.css')) {
        filename = `.${request.url}`;
        filetype = `text/css`;
    }
    else if (request.url.includes('.js')) {
        filename = `.${request.url}`;
        filetype = `text/javascript`;
    }
   
    switch (request.url) {
        case '/register':
            console.log("in register case");
            response.writeHead(200, { 'Content-type': 'application/json' });
            request.on('data', (data) => {

                let registerData = JSON.parse(data)
                let resultset = db.insertStatement(registerData, function (result) {
                    response.write("Successful!!!");
                    response.end();
                });

            });
            break;
            default: getResponse(response, filename, filetype);
        }
    
    }).listen(8080);
