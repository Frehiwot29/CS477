/**
 * 1.create a http or https server which is listen to 3000 port
 * 2.The home page "/" which displays an html page with 
 * one input to enter any text message
 * 3.user enter some message ,then click 'submit' button
 * 4.the user's input are stored in a locall file on the server side
 * 5.User will be redirect to home page after saving successfully
 */
const http = require('http');
const fs = require('fs');
http.createServer((req, res) => {
    const url = req.url;
    if (url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.createReadStream('index.html').pipe(res);
        //console.log("hello world");
    } else if (url === '/message' && req.method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
            fs.writeFileSync('text.txt', Buffer.concat(body).toString().split('=')[1]);
        })
        res.statusCode = 302;
        res.setHeader("Location", "/");
        res.end();

    }
}).listen(3000, () => console.log('listing on 3000'));