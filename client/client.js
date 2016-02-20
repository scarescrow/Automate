var net = require("net");
var pythonShell = require("python-shell");
var config = require('./config.js');

// Create a socket (client) that connects to the server
var socket = new net.Socket();
socket.connect(config.SERVER_PORT, config.SERVER_IP, function () {
    console.log("Client: Connected to server");
});

// Let's handle the data we get from the server
socket.on("data", function (data) {
    data = JSON.parse(data);
    var command = data.response;
    processCommands(command.toLowerCase());
    console.log("New command: %s", command);
});

var processCommands = function(command) {
  if(command === "say hello")
    console.log("Hello");
  if(command === "say hello via python") {
    shell = new pythonShell('../python_scripts/hello.py');
    shell.on('message', function(message) {
      console.log(message);
    });
  }
}
