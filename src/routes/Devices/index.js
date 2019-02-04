import { injectReducer } from 'src/store/reducers'
import Workspace from './containers/WorkspaceContainer'
import config from 'config'

export default (store) => ({
  path: config.urlPrefix + '/devices',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      const reducer = require('./modules/workspace').default
      /*  Add the reducer to the store on key 'devices'  */
      injectReducer(store, { key: 'devices', reducer })

      const eventsReducer = require('src/modules/events').default
      /*  Add the reducer to the store on key 'devices'  */
      injectReducer(store, { key: 'events', reducer: eventsReducer })

      /*  Return getComponent   */
      cb(null, Workspace)

    /* Webpack named bundle   */
    }, 'devices')
  }
})
