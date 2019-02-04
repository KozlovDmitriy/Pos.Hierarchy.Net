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
import DeviceLink from 'src/components/LogicalDeviceLink'
import reactMixin from 'react-mixin'
import ReactRethinkdb, { r } from 'react-rethinkdb'
import Localization from 'localization'
import ActionDelete from '@material-ui/icons/Delete'
import StatusCode from 'src/components/StatusCode'
import IconButton from '@material-ui/core/IconButton'
import colors from 'src/components/colors'
import ResolveEventDialog from 'src/containers/ResolveEventDialogContainer'
import { LOST_TERMINAL } from 'src/actions/codes'
import Timer from 'src/components/Timer'
import DeviceSoftwareStatus from './DeviceSoftwareStatus'
import DeviceConfigStatus from './DeviceConfigStatus'
import CircularProgressbar from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import blue from '@material-ui/core/colors/blue'
import grey from '@material-ui/core/colors/grey'

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
  },
  colorPrimary: {
    backgroundColor: grey[200],
  },
  barColorPrimary: {
    backgroundColor: blue[400],
  }
})

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
    // ReactRethinkdb.DefaultSession.connect(config.rethinkConfig)
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
      lastStatusEvent: new ReactRethinkdb.QueryRequest({
        query: r.table('Events')
          .orderBy({ index: r.desc('acceptedAt') })
          .filter((row) => r.and(
            row.getField('type').eq('info'),
            row.getField('subtype').eq('device-status'),
            row.getField('logicalDeviceId').eq(props.deviceId),
            row.getField('code').ne(LOST_TERMINAL)
          ))
          .limit(1),             // RethinkDB query
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
    const lastStatusEvent = this.data.lastStatusEvent.value()[0]
    const lastQueryDate = lastEvent ?
      <Timer start={new Date(lastEvent.acceptedAt * 1000)} /> :
      Localization.DeviceNotInitialized
    const lastEventContent = lastStatusEvent && lastStatusEvent.content ?
      lastStatusEvent.content.value :
      {}
    const { filledRamMemory, emptyRamMemory } = lastEventContent
    const allRam = filledRamMemory && emptyRamMemory ? filledRamMemory + emptyRamMemory : void 0
    const ramFilled = allRam ?
      Math.round(filledRamMemory / allRam * 100) :
      void 0
    const eventsGrid = events.length > 0 ? (
      <Paper className={classes.root}>
        <div style={{ padding: '0px 20px 0 20px' }}>
          <Typography component='h6' variant='subtitle1' >
            {Localization.Events}
          </Typography>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell tooltip={Localization.AcceptedAt}>{Localization.AcceptedAt}</TableCell>
              <TableCell tooltip={Localization.NumberOfEventUpdates}>{Localization.NumberOfEventUpdates}</TableCell>
              <TableCell tooltip={Localization.Type}>{Localization.Type}</TableCell>
              <TableCell tooltip={Localization.MessageEmitter}>{Localization.MessageEmitter}</TableCell>
              <TableCell tooltip={Localization.Description}>{Localization.Description}</TableCell>
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
                      {row.count}
                    </TableCell>
                    <TableCell className={className}>
                      {row.type === 'error' ? Localization.Error : Localization.Warning}
                    </TableCell>
                    <TableCell className={className}>{Localization.Terminal}</TableCell>
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
      <i>{Localization.Unknown}</i>
    const customer = data.CustomerNumberX && data.CustomerName ? `${data.CustomerName} (${data.CustomerNumberX})` :
      data.CustomerName ? data.CustomerName :
      <i>{Localization.Unknown}</i>
    const account = data.AccountNumberX && data.AccountName ? `${data.AccountName} (${data.AccountNumberX})` :
      data.AccountName ? data.AccountName :
      <i>{Localization.Unknown}</i>
    return (
      <div>
        <Paper className={classes.root} elevation={1}>
          <Typography component='h5' variant='h6' align='center'>{Localization.Device}</Typography>
          <Typography component='h6' variant='subtitle1' align='center'>
            {data.SimpleModelName}
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>{Localization.TerminalId}</b></TableCell>
                <TableCell><b>{Localization.Merchant}</b></TableCell>
                <TableCell><b>{Localization.Customer}</b></TableCell>
                <TableCell><b>{Localization.Account}</b></TableCell>
                <TableCell><b>{Localization.SerialNumber}</b></TableCell>
                <TableCell><b>{Localization.Complex}</b></TableCell>
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
          <div style={{ display: 'flex', alignItems: 'stretch', padding: '6px 20px 0 20px' }}>
            <div style={{ flexGrow: 1 }}>
              <Typography component='h6' variant='subtitle1' >
                {Localization.StatusOfWork}
              </Typography>
              <p>
                {Localization.TimeSinceLastRequest}: <code>{lastQueryDate}</code>
              </p>
            </div>
            {
              ramFilled ? (
                <div style={{ flexGrow: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'stretch' }}>
                    <div style={{ flexGrow: void 0, padding: '5px 10px' }}>
                      <div style={{ display: 'inline-block', width: 50 }}>
                        <CircularProgressbar
                          text={`${ramFilled}%`}
                          percentage={ramFilled}
                          strokeWidth={12}
                          initialAnimation
                          styles={{ text: { fontSize: '26px', fontWeight: 600 } }}
                        />
                      </div>
                    </div>
                    <div style={{ flexGrow: 1 }}>
                      <Typography component='h6' variant='subtitle1' >
                        {'RAM'}
                      </Typography>
                      <p>
                        {Localization.FilledMemory}:&nbsp;{Math.floor(filledRamMemory / (1024 * 1024))} MB
                      </p>
                    </div>
                  </div>
                </div>
              ) : void 0
            }
          </div>
        </Paper>
        <div style={{ display: 'flex', alignItems: 'stretch' }}>
          <DeviceSoftwareStatus
            version={lastEventContent ? lastEventContent.softwareVersion : void 0}
            deviceId={data.Id}
            className={classes.root}
          />
          <DeviceConfigStatus
            version={lastEventContent ? lastEventContent.configVersion : void 0}
            deviceId={data.Id}
            className={classes.root}
          />
        </div>
        {eventsGrid}
      </div>
    )
  }
}

reactMixin(Device.prototype, ReactRethinkdb.DefaultMixin)

export default withStyles(styles)(Device)
