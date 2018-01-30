import React from 'react'
import ClickableCard from 'src/components/cards/ClickableCard'
import { CardTitle } from 'material-ui/Card'
import ReactRethinkdb, { r } from 'react-rethinkdb'
import reactMixin from 'react-mixin'
import PropTypes from 'prop-types'
import DeviceRequestsPerMinuteChart from './DeviceRequestsPerMinuteChart'
import config from 'config'

const defaultDashboardInfo = {
  errorsCount: '?',
  id:  'default',
  idleDevicesCount: '?'
}

const defaultDeviceRequestsPerMinute = {
  acceptedAt: 1464780804,
  id:  '035eee37-42be-47de-bd09-53bd20165e76',
  value: '?'
}

try {
  ReactRethinkdb.DefaultSession.connect(config.rethinkConfig)
} catch (e) {}

/**
 * Виджет главной страницы сайта
 */
class Dashboard extends React.Component {
  observe (props, state) {
    return {
      dashboardInfo: new ReactRethinkdb.QueryRequest({
        query: r.table('DashboardInfo')
                .get('default'), // RethinkDB query
        changes: true,             // subscribe to realtime changefeed
        initial: null              // return [] while loading
      }),
      deviceRequestsPerMinute: new ReactRethinkdb.QueryRequest({
        query: r.table('DeviceRequestsPerMinute')
                .orderBy({ index: r.desc('acceptedAt') })
                .limit(10), // RethinkDB query
        changes: true,             // subscribe to realtime changefeed
        initial: []              // return [] while loading
      })
    }
  }

  render () {
    const { router } = this.context
    const dashboardInfo = this.data.dashboardInfo.value() || defaultDashboardInfo
    const deviceRequestsPerMinute = this.data.deviceRequestsPerMinute.value()
      .sort((a, b) => b.acceptedAt - a.acceptedAt)
    const latestDeviceRequestPerMinute = deviceRequestsPerMinute[0] || defaultDeviceRequestsPerMinute
    return (
      <div className='wrap page-content'>
        <ClickableCard
          className='card-wide'
          onClick={() => router.push('/devices')} >
          <CardTitle subtitle={`Устройства`} />
        </ClickableCard>
        <ClickableCard
          className='card-wide'
          onClick={() => router.push('/devicerequests')} >
          <DeviceRequestsPerMinuteChart data={deviceRequestsPerMinute} />
          <CardTitle subtitle={`${latestDeviceRequestPerMinute.value} запросов в минуту`} />
        </ClickableCard>
        <ClickableCard className='card'
          onClick={() => router.push('/deviceerrorrequests')} >
          <CardTitle title={dashboardInfo.errorsCount} subtitle='Ошибок' />
        </ClickableCard>
        <ClickableCard className='card'
          onClick={() => router.push('/idledevices')}>
          <CardTitle title={dashboardInfo.idleDevicesCount} subtitle='Простаивающих устройств' />
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
