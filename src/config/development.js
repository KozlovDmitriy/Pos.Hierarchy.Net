'use strict'

import baseConfig from './base'

let config = {
  appEnv: 'dev',  // feel free to remove the appEnv property here
  //webapiurl: 'http://10.0.21.61/newposwebapi/'
  webapiurl: 'http://localhost:5005/'
}

export default Object.freeze(Object.assign({}, baseConfig, config))
