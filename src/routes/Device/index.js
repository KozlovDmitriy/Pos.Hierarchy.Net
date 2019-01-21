import { injectReducer } from 'src/store/reducers'
import DeviceContainer from './containers/DeviceContainer'
import config from 'config'

export default (store) => ({
  path: config.urlPrefix + '/device/:id',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      const reducer = require('./modules/device').default
      /*  Add the reducer to the store on key 'devices'  */
      injectReducer(store, { key: 'device', reducer })

      const devicesReducer = require('../Devices/modules/workspace').default
      /*  Add the reducer to the store on key 'devices'  */
      injectReducer(store, { key: 'devices', reducer: devicesReducer })

      const eventsReducer = require('src/modules/events').default
      /*  Add the reducer to the store on key 'devices'  */
      injectReducer(store, { key: 'events', reducer: eventsReducer })

      /*  Return getComponent   */
      cb(null, DeviceContainer)

    /* Webpack named bundle   */
    }, 'device')
  }
})
