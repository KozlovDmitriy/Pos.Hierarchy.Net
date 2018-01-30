'use strict'

// Settings configured here will be merged into the final config object.
export default {
  webapiurl: 'http://10.0.21.61/newposwebapi',
  webappurl: 'http://10.0.21.61/newposdevelop',
  realtimedashboardurl: 'http://localhost:3000',
  rethinkConfig: {
    host: 'localhost',         // hostname of the websocket server
    port: 9000,                // port number of the websocket server
    path: '/rethinkdb-proxy',  // HTTP path to websocket route
    secure: false,             // set true to use secure TLS websockets
    db: 'tmsdatabase',         // default database, passed to rethinkdb.connect
    autoReconnectDelayMs: 2000, // when disconnected, millis to wait before reconnect
    wsProtocols: ['binary'], // sub-protocols for websocket, required for websockify
    simulatedLatencyMs: 100
  }
}
