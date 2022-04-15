var connect = require('connect');
var http = require('http');

var app = connect();

var compression = require('compression');
app.use(compression());

app.use(function (req, res, next) {
    console.log("custom-middleware")
    if (req.url.indexOf("error") >= 0) {
        next(new Error("test"));
    } else {
        res.end('Hello');
    }
});

app.use(function (error, req, res, next) {
    console.log("error-handler");
    res.end("Error: " + error);
});

//create node.js http server and listen on port
http.createServer(app).listen(8888);
