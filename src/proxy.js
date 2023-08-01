const WebSocket = require('ws');
const net = require('net');

// Replace these values with your MQTT broker's TCP host and port
const mqttHost = 'your-ip';
const mqttPort = 1883; // MQTT default port is 1883
const mqttUsername = 'username';
const mqttPassword = 'password';
// Create a WebSocket server that listens on port 8080
const wss = new WebSocket.Server({ port: 8080 });


wss.on('connection', (ws) => {
  console.log('WebSocket client connected');
  const mqttOptions = {
    host: mqttHost,
    port: mqttPort,
    username: mqttUsername,
    password: mqttPassword,
  };
  // Establish a TCP connection to the MQTT broker
  const mqttSocket = net.connect(mqttOptions, () => {
    console.log('TCP connection established with MQTT broker');
  });
   
  // Relay messages from WebSocket to MQTT broker
  ws.on('message', (message) => {
    console.log(`Received message from WebSocket client: ${message}`);
    mqttSocket.write(message);
    //console.log(message);
  });

  // Relay messages from MQTT broker to WebSocket
  mqttSocket.on('data', (data) => {
    console.log(`Received message from MQTT broker: ${data}`);
    ws.send(data);
    console.log(data);
  });

  // Close the TCP connection when WebSocket client disconnects
  ws.on('close', () => {
    console.log('WebSocket client disconnected');
    mqttSocket.end();
  });
});
