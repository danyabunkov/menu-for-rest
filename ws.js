const WebSocket = require('ws');

const webSocketServer = new WebSocket.Server({ port: 3005 });

webSocketServer.on('connection', (websocketClient) => {
  websocketClient.on('message', (message) => {
    console.log('received: %s', message);

    const messageObject = JSON.parse(message);

    
    webSocketServer.clients.forEach((client) => {
      client.send(JSON.stringify(messageObject));
    });
  });
});
