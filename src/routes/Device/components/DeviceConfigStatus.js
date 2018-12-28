import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import DownloadPackProgress from './DownloadPackProgress'
import codes from 'src/actions/codes'
import reactMixin from 'react-mixin'
import ReactRethinkdb, { r } from 'react-rethinkdb'
import colors from 'src/components/colors'

class DeviceConfigStatus extends Component {
  static propTypes = {
    deviceId: PropTypes.number.isRequired,
    className: PropTypes.object.isRequired
  }

  observe (props, state) {
    return {
      event: new ReactRethinkdb.QueryRequest({
        query: r.table('Events')
          .orderBy({ index: r.asc('acceptedAt') })
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
    const { className } = this.props
    const event = this.data.event.value()[0]
    const textColor = event === void 0 ? void 0 :
      event.type !== 'info' ? '#fff' :
      void 0
    const backgroundColor = event === void 0 ? void 0 :
      event.type === 'error' ? colors.error :
      event.type === 'warning' ? colors.warning :
      void 0
    const statusText = event ?
      `Статус: ${codes[event.code]}` :
      'Задания на обновление конфигурации отсутствуют'
    const status = (
      <Typography component='h6' variant='subtitle1' align='center' style={{ color: textColor }}>
        {statusText}
      </Typography>
    )
    const downloadProgress = event && event.content ?
      <DownloadPackProgress progressInfo={event.content} /> :
      void 0
    return (
      <Paper style={{ padding: 10, flexGrow: 1 }} className={className} >
        <Typography component='h5' variant='h6' align='center'>Конфигурация</Typography>
        {status}
        {downloadProgress}
      </Paper>
    )
  }
}

reactMixin(DeviceConfigStatus.prototype, ReactRethinkdb.DefaultMixin)

export default DeviceConfigStatus
