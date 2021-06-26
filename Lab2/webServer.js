const http=require('http');
const fs=require('fs');
const server=http.createServer();

server.on('request',function(req,res){
    res.writeHead(200,{'Content-Type':'image/jpg'});
    let image=fs.readFileSync('./tsion.jpg');
    res.end(image,'binary');
});
server.listen(3000);


