import { injectReducer } from 'src/store/reducers'
import Dashboard from './containers/DashboardContainer'

export default (store) => ({
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      const eventsReducer = require('src/modules/events').default
      /*  Add the reducer to the store on key 'devices'  */
      injectReducer(store, { key: 'events', reducer: eventsReducer })

      /*  Return getComponent   */
      cb(null, Dashboard)

    /* Webpack named bundle   */
    }, 'dashboard')
  }
})
