// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/PageLayout/PageLayoutContainer'
import DevicesRoute from './Devices'
import DeviceRoute from './Device'
import DashboardRoute from './Dashboard'
import ErrorsRoute from './ErrorList'
import config from 'config'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path        : config.urlPrefix === '' ? '/' : config.urlPrefix,
  component   : CoreLayout,
  indexRoute  : DashboardRoute(store),
  childRoutes : [
    DevicesRoute(store),
    ErrorsRoute(store),
    DeviceRoute(store)
  ]
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
