var static = require('node-static');

//
// Create a node-static server instance to serve the './public' folder
//
var file = new (static.Server)('./src/main/resources');
var testFile = new (static.Server)('./src/test/resources');

require('http').createServer(
    function (request, response) {
        request.addListener('end', function () {
            console.log("Serving " + request.url);
            file.serve(request, response);
        });
    }).listen(8080);


require('http').createServer(
    function (request, response) {
        request.addListener('end', function () {
            console.log("Serving " + request.url);
            testFile.serve(request, response);
        });
    }).listen(8081);