var static = require('node-static');
var jsonProducer = require("./json-producer");

//
// Create a node-static server instance to serve the './public' folder
//
var file = new (static.Server)('./src/main/resources');
var testFile = new (static.Server)('./src/test/resources');
var json = new (jsonProducer.Server)("hourreg");

require('http').createServer(
    function (request, response) {
        request.addListener('end', function () {
            if (request.url.match(/\/?hourreg\/.*/)) {
                console.log("Serving JSON")
                json.serve(request, response);
            } else {
                console.log("Serving " + request.url);
                file.serve(request, response);
            }
        });
    }).listen(8080);


require('http').createServer(
    function (request, response) {
        request.addListener('end', function () {
            console.log("Serving " + request.url);
            testFile.serve(request, response);
        });
    }).listen(8081);