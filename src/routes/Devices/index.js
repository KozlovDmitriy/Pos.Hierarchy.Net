import { injectReducer } from '../../store/reducers'
import Workspace from './containers/WorkspaceContainer'

export default (store) => ({
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      const reducer = require('./modules/workspace').default
      /*  Add the reducer to the store on key 'devices'  */
      injectReducer(store, { key: 'devices', reducer })

      const errorsReducer = require('src/modules/errors').default
      /*  Add the reducer to the store on key 'devices'  */
      injectReducer(store, { key: 'errors', reducer: errorsReducer })

      /*  Return getComponent   */
      cb(null, Workspace)

    /* Webpack named bundle   */
    }, 'devices')
  }
})
