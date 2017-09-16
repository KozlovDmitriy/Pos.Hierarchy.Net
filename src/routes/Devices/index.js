import { injectReducer } from '../../store/reducers'
import Workspace from './containers/WorkspaceContainer'

export default (store) => ({
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */

      const reducer = require('./modules/workspace').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'devices', reducer })

      /*  Return getComponent   */
      cb(null, Workspace)

    /* Webpack named bundle   */
    }, 'devices')
  }
})
