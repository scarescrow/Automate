var net = require("net");
var express = require("express");
var bodyParser = require("body-parser");
var config = require('./config');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create a simple server
var server = net.createServer(function (conn) {

    conn.on("error", function(err) {
      console.log("Connection Closed: " + err);
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

app.listen(config.PORT_APP, function() {
  console.log("Express started");
});
