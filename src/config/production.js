'use strict'

import baseConfig from './base'

let config = {
  appEnv: 'dist',  // feel free to remove the appEnv property here
  webapiurl: 'http://10.0.21.61/newposwebapi/',
  webappurl: 'http://10.0.21.61/newposdevelop',
  realtimedashboardurl: 'http://10.0.21.61:3000',
  rethinkConfig: {
    // host: 'localhost',
    host: '10.0.21.61',         // hostname of the websocket server
    port: 9000,                // port number of the websocket server
    path: '/rethinkdb-proxy',  // HTTP path to websocket route
    secure: false,             // set true to use secure TLS websockets
    db: 'tmsdatabase',         // default database, passed to rethinkdb.connect
    autoReconnectDelayMs: 2000, // when disconnected, millis to wait before reconnect
    wsProtocols: ['binary'], // sub-protocols for websocket, required for websockify
    simulatedLatencyMs: 100
  }
}

export default Object.freeze(Object.assign({}, baseConfig, config, window.DASHBOARD_CONFIG))
