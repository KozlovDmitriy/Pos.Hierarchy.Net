import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'
import DeviceLink from 'src/components/DeviceLink'
import reactMixin from 'react-mixin'
import ReactRethinkdb, { r } from 'react-rethinkdb'
import config from 'config'
import ActionDelete from '@material-ui/icons/Delete'
import StatusCode from 'src/components/StatusCode'
import IconButton from '@material-ui/core/IconButton'
import colors from 'src/components/colors'
import ResolveEventDialog from 'src/containers/ResolveEventDialogContainer'
import { LOST_TERMINAL } from 'src/actions/codes'
import Timer from 'src/components/Timer'
import DeviceSoftwareStatus from './DeviceSoftwareStatus'
import DeviceConfigStatus from './DeviceConfigStatus'

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  icon: {
    padding: 5,
    marginRight: 24,
    color: theme.palette.common.white
  },
  errorRow: {
    backgroundColor: colors.error,
    color: theme.palette.common.white,
  },
  warningRow: {
    backgroundColor: colors.warning,
    color: theme.palette.common.white,
  }
})

try {
  ReactRethinkdb.DefaultSession.connect(config.rethinkConfig)
} catch (e) {}

class Device extends React.Component {
  static propTypes = {
    params: PropTypes.object,
    deviceId: PropTypes.number,
    data: PropTypes.object,
    setDeviceId: PropTypes.func,
    classes: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      openResolveDialog: false,
      event: null
    }
    this.onResolveClick = this.onResolveClick.bind(this)
    this.onCloseResolveDialog = this.onCloseResolveDialog.bind(this)
  }

  onCloseResolveDialog (event) {
    this.setState({ ...this.state, event: null, openResolveDialog: false })
  }

  onResolveClick (event) {
    this.setState({ ...this.state, event, openResolveDialog: true })
  }

  observe (props, state) {
    return {
      events: new ReactRethinkdb.QueryRequest({
        query: r.table('Events')
          .orderBy({ index: r.desc('acceptedAt') })
          .filter((row) =>
            r.and(
              r.expr(['error', 'warning']).contains(row.getField('type')),
              r.or(
                r.not(row.hasFields('resolved')),
                row.getField('resolved').ne(true),
              ),
              row.getField('logicalDeviceId').eq(props.deviceId)
            )
          )
          .limit(10),             // RethinkDB query
        changes: true,            // subscribe to realtime changefeed
        initial: []               // return [] while loading
      }),
      lastEvent: new ReactRethinkdb.QueryRequest({
        query: r.table('Events')
          .orderBy({ index: r.desc('acceptedAt') })
          .filter((row) => r.and(
            row.getField('logicalDeviceId').eq(props.deviceId),
            row.getField('code').ne(LOST_TERMINAL)
          ))
          .limit(1),             // RethinkDB query
        changes: true,            // subscribe to realtime changefeed
        initial: []               // return [] while loading
      })
    }
  }

  componentDidMount () {
    const { id } = this.props.params
    const intId = parseInt(id)
    if (this.props.deviceId !== intId) {
      this.props.setDeviceId(intId)
    }
  }

  render () {
    const { classes, data } = this.props
    if (data === null || this.props.deviceId !== parseInt(this.props.params.id)) {
      return (<div />)
    }
    const events = (this.data.events.value() || [])
      .sort((x, y) => x.acceptedAt <= y.acceptedAt ? 1 : -1)
    const lastEvent = this.data.lastEvent.value()[0]
    const lastQueryDate = lastEvent ?
      <Timer start={new Date(lastEvent.acceptedAt * 1000)} /> :
      'Устройство еще не прошло первичную инициализуцию в системе'
    const eventsGrid = events.length > 0 ? (
      <Paper className={classes.root}>
        <div style={{ padding: '0px 20px 0 20px' }}>
          <Typography component='h6' variant='subtitle1' >
            {'События'}
          </Typography>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell tooltip='Принято'>Принято</TableCell>
              <TableCell tooltip='Тип'>Тип</TableCell>
              <TableCell tooltip='Эмиттер сообщения'>Источник</TableCell>
              <TableCell tooltip='Описание'>Описание</TableCell>
              <TableCell style={{ width: '130px' }} />
            </TableRow>
          </TableHead>
          <TableBody>
            {
              events.map((row, index) => {
                const className = row.type === 'error' ?
                  classes.errorRow :
                  classes.warningRow
                return (
                  <TableRow key={index}>
                    <TableCell className={className}>
                      {new Date(row['acceptedAt'] * 1000).toLocaleString()}
                    </TableCell>
                    <TableCell className={className}>
                      {row.type === 'error' ? 'Ошибка' : 'Предупреждение'}
                    </TableCell>
                    <TableCell className={className}>Терминал</TableCell>
                    <TableCell className={className}>
                      <StatusCode code={row.code} />
                    </TableCell>
                    <TableCell style={{ width: '130px' }} className={className}>
                      <IconButton
                        className={classes.icon}
                        onClick={e => this.onResolveClick(row)}
                      >
                        <ActionDelete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              })
          }
          </TableBody>
        </Table>
        <ResolveEventDialog
          event={this.state.event}
          open={this.state.openResolveDialog}
          onClose={this.onCloseResolveDialog}
        />
      </Paper>
    ) : void 0
    const merchant = data.MerchantNumberX && data.MerchantName ? `${data.MerchantName} (${data.MerchantNumberX})` :
      data.MerchantName ? data.MerchantName :
      '[unknown]'
    const customer = data.CustomerNumberX && data.CustomerName ? `${data.CustomerName} (${data.CustomerNumberX})` :
      data.CustomerName ? data.CustomerName :
      '[unknown]'
    const account = data.AccountNumberX && data.AccountName ? `${data.AccountName} (${data.AccountNumberX})` :
      data.AccountName ? data.AccountName :
      '[unknown]'
    return (
      <div>
        <Paper className={classes.root} elevation={1}>
          <Typography component='h5' variant='h6' align='center'>Устройство</Typography>
          <Typography component='h6' variant='subtitle1' align='center'>
            {data.SimpleModelName}
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Terminal ID</b></TableCell>
                <TableCell><b>Мерчант</b></TableCell>
                <TableCell><b>Кастомер</b></TableCell>
                <TableCell><b>Счет клиента</b></TableCell>
                <TableCell><b>Серийный номер</b></TableCell>
                <TableCell><b>Комплекс</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <DeviceLink deviceId={data.Id} name={data.TerminalId} />
                </TableCell>
                <TableCell>{merchant}</TableCell>
                <TableCell>{customer}</TableCell>
                <TableCell>{account}</TableCell>
                <TableCell>{data.SerialNumber}</TableCell>
                <TableCell>{data.ModelName}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div style={{ padding: '6px 20px 0 20px' }}>
            <Typography component='h6' variant='subtitle1' >
              {'Статус работы'}
            </Typography>
            <p>
            Время с последнего запроса: <code>{lastQueryDate}</code>
            </p>
          </div>
        </Paper>
        <div style={{ display: 'flex', alignItems: 'stretch' }}>
          <DeviceSoftwareStatus deviceId={data.Id} className={classes.root} />
          <DeviceConfigStatus deviceId={data.Id} className={classes.root} />
        </div>
        {eventsGrid}
      </div>
    )
  }
}

reactMixin(Device.prototype, ReactRethinkdb.DefaultMixin)

export default withStyles(styles)(Device)
