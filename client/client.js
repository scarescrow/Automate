var net = require("net");
var config = require('./config.js');

// Create a socket (client) that connects to the server
var socket = new net.Socket();
socket.connect(config.SERVER_PORT, config.SERVER_IP, function () {
    console.log("Client: Connected to server");
});

// Let's handle the data we get from the server
socket.on("data", function (data) {
    data = JSON.parse(data);
    console.log("Response from server: %s", data.response);
});

socket.write(JSON.stringify({response: "What's up?"}));
