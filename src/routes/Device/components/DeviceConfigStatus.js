import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import DownloadPackProgress from './DownloadPackProgress'
import codes from 'src/actions/codes'
import reactMixin from 'react-mixin'
import ReactRethinkdb, { r } from 'react-rethinkdb'
import Localization from 'localization'
import colors from 'src/components/colors'
import Timer from 'src/components/Timer'

class DeviceConfigStatus extends Component {
  static propTypes = {
    deviceId: PropTypes.number.isRequired,
    className: PropTypes.string.isRequired,
    version: PropTypes.string
  }

  observe (props, state) {
    return {
      event: new ReactRethinkdb.QueryRequest({
        query: r.table('Events')
          .orderBy({ index: r.desc('acceptedAt') })
          .filter((row) => r.and(
            row.getField('logicalDeviceId').eq(props.deviceId),
            row.getField('subtype').eq('config-task')
          ))
          .limit(1),             // RethinkDB query
        changes: true,            // subscribe to realtime changefeed
        initial: []               // return [] while loading
      })
    }
  }

  render () {
    const { className, version } = this.props
    const event = this.data.event.value()[0]
    const timer = event && event.type === 'info' ?
      <Typography variant='caption' align='right' style={{ position: 'relative', height: 0, right: 5, top: 5 }}>
        <Timer start={new Date(event.acceptedAt * 1000)} />
      </Typography> :
      void 0
    const textColor = event === void 0 ? void 0 :
      ['error', 'warning', 'success'].includes(event.type) ? '#fff' :
      void 0
    const versionWidget = version ?
      <Typography
        variant='caption'
        align='left'
        style={{ color: textColor, position: 'relative', height: 0, left: 0, top: 8 }}
      >
        {Localization.CurrentVersion}: <b>{version}</b>
      </Typography> :
      void 0
    const backgroundColor = event === void 0 ? void 0 :
      event.type === 'error' ? colors.error :
      event.type === 'warning' ? colors.warning :
      event.type === 'success' ? colors.success :
      void 0
    const statusText = event ?
      event.code === 0 ? `${Localization.Status}: ${Localization.ConfigurationSuccessfullyUpdated}` :
      `${Localization.Status}: ${codes(event.code)}` :
      Localization.ThereAreNoConfigUpdateTasks
    const status = (
      <Typography component='h6' variant='subtitle1' align='center' style={{ color: textColor }}>
        {statusText}
      </Typography>
    )
    const downloadProgress = event && event.content ?
      <DownloadPackProgress progressInfo={event.content.value} /> :
      void 0
    return (
      <Paper style={{ padding: 10, flexGrow: 1, backgroundColor }} className={className} >
        {versionWidget}
        {timer}
        <Typography component='h5' variant='h6' align='center' style={{ color: textColor }}>
          {Localization.Configuration}
        </Typography>
        {status}
        {downloadProgress}
      </Paper>
    )
  }
}

reactMixin(DeviceConfigStatus.prototype, ReactRethinkdb.DefaultMixin)

export default DeviceConfigStatus
