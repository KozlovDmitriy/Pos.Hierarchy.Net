import React from 'react'
import ClickableCard from 'src/components/cards/ClickableCard'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import ReactRethinkdb, { r } from 'react-rethinkdb'
import reactMixin from 'react-mixin'
import PropTypes from 'prop-types'
// import DeviceRequestsPerMinuteChart from './DeviceRequestsPerMinuteChart'
import config from 'config'
import Localization from 'localization'

const defaultDashboardInfo = {
  errorsCount: '?',
  id:  'default',
  idleDevicesCount: '?'
}

/* const defaultDeviceRequestsPerMinute = {
  acceptedAt: 1464780804,
  id:  '035eee37-42be-47de-bd09-53bd20165e76',
  value: '?'
} */

/* try {
  ReactRethinkdb.DefaultSession.connect(config.rethinkConfig)
} catch (e) {} */

/**
 * Виджет главной страницы сайта
 */
class Dashboard extends React.Component {
  static propTypes = {
    errors: PropTypes.array
  }

  observe (props, state) {
    return {
      dashboardInfo: new ReactRethinkdb.QueryRequest({
        query: r.table('DashboardInfo')
                .get('default'), // RethinkDB query
        changes: true,             // subscribe to realtime changefeed
        initial: null              // return [] while loading
      })/*,
      deviceRequestsPerMinute: new ReactRethinkdb.QueryRequest({
        query: r.table('DeviceRequestsPerMinute')
                .orderBy({ index: r.desc('acceptedAt') })
                .limit(10), // RethinkDB query
        changes: true,             // subscribe to realtime changefeed
        initial: []              // return [] while loading
      }) */
    }
  }

  render () {
    const { router } = this.context
    const errors = this.props.errors || []
    const dashboardInfo = this.data.dashboardInfo.value() || defaultDashboardInfo
    /* const deviceRequestsPerMinute = this.data.deviceRequestsPerMinute.value()
      .sort((a, b) => b.acceptedAt - a.acceptedAt)
    const latestDeviceRequestPerMinute = deviceRequestsPerMinute[0] || defaultDeviceRequestsPerMinute
    <ClickableCard
      className='card-wide'
      onClick={() => router.push('/devicerequests')} >
      <DeviceRequestsPerMinuteChart data={deviceRequestsPerMinute} />
      <CardTitle subtitle={`${latestDeviceRequestPerMinute.value} запросов в минуту`} />
    </ClickableCard> */
    return (
      <div className='wrap page-content'>
        <ClickableCard
          className='card'
          onClick={() => router.push(config.urlPrefix + '/devices')} >
          <CardContent>
            <Typography gutterBottom variant='h5'>
              {Localization.Devices}
            </Typography>
          </CardContent>
        </ClickableCard>
        <ClickableCard className='card'
          onClick={() => router.push(config.urlPrefix + '/events')} >
          <CardContent>
            <Typography gutterBottom variant='h5'>
              {errors.length}
            </Typography>
            <Typography gutterBottom variant='subtitle1' color='textSecondary'>
              {Localization.Errors}
            </Typography>
          </CardContent>
        </ClickableCard>
        <ClickableCard className='card'
          onClick={() => router.push(config.urlPrefix + '/idledevices')}>
          <CardContent>
            <Typography gutterBottom variant='h5'>
              {dashboardInfo.idleDevicesCount}
            </Typography>
            <Typography gutterBottom variant='subtitle1' color='textSecondary'>
              {Localization.IdleDevices}
            </Typography>
          </CardContent>
        </ClickableCard>
      </div>
    )
  }
}

Dashboard.contextTypes = {
  router: PropTypes.object.isRequired
}

reactMixin(Dashboard.prototype, ReactRethinkdb.DefaultMixin)

export default Dashboard
