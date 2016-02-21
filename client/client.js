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
  else if(command === "say hello via python") {
    shell = new pythonShell('../python_scripts/hello.py');
    shell.send('Steve');
    shell.on('message', function(message) {
      console.log(message);
    });
  }
  else if(command.split(' ')[0] === "download") {
    query = command.replace('download ', '');
    shell = new pythonShell('../python_scripts/get_magnet_link.py');
    shell.send(query);
    shell.on('message', function(magnet_link) {
      torrentShell = new pythonShell('../python_scripts/start_torrent.py');
      torrentShell.send(magnet_link);
      torrentShell.on('error', function(err) {
        console.log("Error! " + err);
      });
    });
  }
}
