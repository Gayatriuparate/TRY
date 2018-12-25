const http = require('http');
const db = require('./DB');
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
    let filename = './index.html';
    let filetype = 'text/html';
    if (request.url.includes('.html')) {
        filename = `.${request.url}`; //'.'+request.url
        console.log(filename);
    }
    else if (request.url.includes('.css')) {
        filename = `.${request.url}`;
        filetype = `text/css`;
    }
    else if (request.url.includes('.js')) {
        filename = `.${request.url}`;
        filetype = `text/javascript`;
    }
    else if (request.url.includes('.svg')) {
        filename = `.${request.url}`;
        filetype = `image/svg+xml`;
    }
    switch (request.url) {
        case '/valReq':
            console.log("in register case");
            response.writeHead(200, { 'Content-type': 'application/json' });
            request.on('data', (data) => {

                let registerData = JSON.parse(data)
                let resultset = db.insertStatement(registerData, function (result) {
                    response.write("Registration Successful!!!");
                    response.end();
                });

            });
        case '/fetchReq':
        console.log("in fetch");
        response.writeHead(200,{'Content-type':'application/json'});
        request.on('data',(data)=>{

            let fetchdata=JSON.parse(data)
            let resultset=db.selectStatement(fetchdata,function(result){
                response.write("data fetchec!!!");
             
                console.log(result);
                response.end();
        
            });
        });
            break;
            default: getResponse(response, filename, filetype);
        }
    
    }).listen(8080);