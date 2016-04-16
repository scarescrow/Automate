var net = require("net");
var express = require("express");
var bodyParser = require("body-parser");
var config = require('./config');

var app;

// Create a simple server
var server = net.createServer(function (conn) {

    app = express();

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    conn.on("error", function(err) {
      console.log("Connection Closed: " + err.stack);
      exp_server.close();
    });

    conn.on('end', function() {
      console.log("Connection Closed Properly");
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

    app.post('/command', function(req, res) {
      conn.write(JSON.stringify({response: req.body.command}));
	  console.log(req.body.command);
      res.end("yes");
    });

    var exp_server = app.listen(config.PORT_APP, function() {
      console.log("Express started");
    });
});

// Listen for connections
server.listen(config.PORT_NET,
  config.ALLOWED_IPS,
  config.HOST,
  function () {
    console.log("Server: Listening");
});
