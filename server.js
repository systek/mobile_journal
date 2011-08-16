var static = require('node-static');

//
// Create a node-static server instance to serve the './public' folder
//
var file = new(static.Server)('./src/main/resources');

require('http').createServer(function (request, response) {
  request.addListener('end', function () {
    //
    // Serve files!
    //
    console.log("Serving " + request.url);
    file.serve(request, response);
  });
}).listen(8080);
