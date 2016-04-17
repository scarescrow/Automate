var net = require("net");
var express = require("express");
var bodyParser = require("body-parser");
var config = require('./config');

var app;

// Create a simple server
var server = net.createServer(function (conn) {

   

    conn.on("error", function(err) {
      console.log("Connection Closed: " + err.stack);
      exp_server.close();
	  server.close();
	  server.listen(config.PORT_NET,
		  config.ALLOWED_IPS,
		  config.HOST,
		  function () {
			console.log("Server: Listening");
		});
		app = express();
		conn.destroy();
    });

    conn.on('end', function() {
      console.log("Connection Closed Properly");
	  conn.destroy();
      exp_server.close();
    });

    // Handle data from client
    conn.on("data", function(data) {
        data = JSON.parse(data);
        conn.write(JSON.stringify({response: "Received Message: " + data.response}))
    });

    // Let's response with a hello message
    conn.write(
        JSON.stringify(
            { response: "Hey there client!" }
        )
    );
	
	conn.pipe(conn);
	
	app = express();

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
	
	var exp_server = app.listen(config.PORT_APP, function() {
      console.log("Express started");
    });

    app.post('/command', function(req, res) {
      conn.write(JSON.stringify({response: req.body.command}));
	  console.log(req.body.command);
      res.end("yes");
    });

});

// Listen for connections
server.listen(config.PORT_NET,
  config.ALLOWED_IPS,
  config.HOST,
  function () {
    console.log("Server: Listening");
});
