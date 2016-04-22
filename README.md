# Automate

Automate tasks on your PC by sending commands from your mobile.

##Components

####Server-side Node Server:

This sets up a server for TCP communication, and also starts an HTTP server to get commands posted to it, and transfer them to client.

####Client-side Node Server:

This sets up a server on PC, and connects to the Server-Side Node Server. On receiving commands, it decides what action to take

####Android App:

This is a simple app to send commands as HTTP Post requests to the Server-Side Node Server.

####Python Scripts

These are called by the Client-side Node Server, depending on what action to take.

##Install

First, clone the project:

```bash
$ git clone https://github.com/scarescrow/Automate.git
```

####Server

1. Copy the server folder to the server machine.
2. Rename config-example.js to config.js
3. Change configuration settings in config.js to the required values. For example, change HOST from localhost to the server's IP.
4. Install NPM packages:

	```bash
	$ npm install
	```
	
####Client-side

1. Copy the client folder and python_scripts folder to the client machine.
2. Rename config-example.js to config.js
3. Change configuration settings in config.js to the required values. For example, change SERVER_IP from localhost to the server's IP.
4. Install NPM packages:

	```bash
	$ npm install
	```
	
####Android App

1. Rename android/Automate/app/src/main/java/scarecrow/beta/automate/config_example.java to config.java.
2. Change URL string from localhost to the Server's IP.
3. Generate APK.
4. Install this APK on your phone.

####Python Scripts

Install Python on your client machine.

##Usage

#####Server:

```bash
$ node server.js
```

#####Client:

```bash
$ node client.js
```

That's it. The server on the client machine will connect to the server on the server machine. Also, the HTTP server on the server machine will start. Now, open the app on your phone, and type (or speak) a command, eg. Say Hello, and click on "Go". In a moment, you'll see "Hello" appear on the terminal in the client machine.

####Note:

You could also send the HTTP Post request as a cURL command as follows:

```bash
$ curl --data "command=say hello" http://<SERVER_IP>:<SERVER_EXPRESS_PORT>/command
```

##Currently Supported Commands

####1. Download Torrents

(Needs uTorrent installed)

Send command that starts with download. For eg:

```bash
Download Game of Thrones Season 1
```

The software will search on kickass torrents the given search string, and gets the most relevant magnet link. Then, it opens uTorrent, and starts download of the extracted magnet link.

====

(More commands to come. Suggestions Welcome!)

##License

Open sourced under [MIT License](LICENSE)
