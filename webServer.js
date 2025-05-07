const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

var sever = http.createServer(function (req, res){
    //var q = url.parse(req.url, true).query;
    //var txt = q.fname + " " + q.lname;
    var q = url.parse(req.url, true);
    let filePath = "." + req.url;
    if ( filePath === "./") filePath = "./index.html";

    const extName = path.extname(filePath)
    let contentType = "text/html";
    if (extName === ".css") contentType = "text/css";
    fs.readFile(filePath, function(err, htmlDoc){
        if(err){
            res.writeHead(404,{'Content-Type': 'text/html'});
            return res.end("404 File Not Found!!");
        }
        res.writeHead(200, {'Content-Type': contentType});
        res.write(htmlDoc);
        res.end();
    });
    
})

sever.listen(8080);