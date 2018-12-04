import { injectReducer } from 'src/store/reducers'
import ErrorList from './containers/ErrorListContainer'

export default (store) => ({
  path: 'events',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      const eventsReducer = require('src/modules/events').default
      /*  Add the reducer to the store on key 'devices'  */
      injectReducer(store, { key: 'events', reducer: eventsReducer })

      /*  Return getComponent   */
      cb(null, ErrorList)

    /* Webpack named bundle   */
    }, 'events')
  }
})
