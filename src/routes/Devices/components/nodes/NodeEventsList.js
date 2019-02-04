import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import ErrorIcon from '@material-ui/icons/Error'
import WarningIcon from '@material-ui/icons/Warning'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import green from '@material-ui/core/colors/green'
import ResolveEventDialog from 'src/containers/ResolveEventDialogContainer'
import { Link } from 'react-router'
import colors from 'src/components/colors'
import config from 'config'
import Localization from 'localization'
import codes from 'src/actions/codes'

const styles = theme => ({
  button: {
    margin: 0,
    minHeight: 22,
    padding: '2px 8px',
    color: '#fff',
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    }
  }
})

const groupBy = (xs, key) =>
  xs.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})

class NodeEventsList extends React.Component {
  static propTypes = {
    detail: PropTypes.bool,
    errors: PropTypes.array.isRequired,
    warnings: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired,
    filterOnlyByTerminalId: PropTypes.func.isRequired,
    setPopoverIsOpen: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.onClickTerminalId = this.onClickTerminalId.bind(this)
    this.state = {
      value: 0,
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

  handleChange = (event, value) => {
    this.setState({ ...this.state, value })
  }

  onClickTerminalId (terminalId) {
    this.props.setPopoverIsOpen(false)
    this.props.filterOnlyByTerminalId(terminalId)
  }

  terminalLink (deviceId, terminalId) {
    return (
      <Link to={`${config.urlPrefix}/device/${deviceId}`} tooltip={Localization.Details}>{terminalId}</Link>
    )
    /* return (
      <a
        key={terminalId + 'link'}
        href='javascript:void(0)'
        onClick={this.onClickTerminalId.bind(this, terminalId)}
      >
        {terminalId}
      </a>
    ) */
  }

  getNotDetailEventsList (events) {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{Localization.Device}</TableCell>
            <TableCell>{Localization.EventsCount}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            Object.keys(events).map(d => {
              const terminalId = events[d][0].terminalId
              return (
                <TableRow key={d}>
                  <TableCell>
                    {this.terminalLink(terminalId)}
                  </TableCell>
                  <TableCell numeric>{events[d].length}</TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    )
  }

  getDetailEventsList (events, isErrors) {
    const { classes } = this.props
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{Localization.Device}</TableCell>
            <TableCell>{Localization.Description}</TableCell>
            <TableCell>{Localization.Code}</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {
            events.map(e => {
              const terminalId = e.terminalId
              return (
                <TableRow key={e.id}>
                  <TableCell>
                    {this.terminalLink(e.logicalDeviceId, terminalId)}
                  </TableCell>
                  <TableCell>{codes(e.code)}</TableCell>
                  <TableCell>{e.code}</TableCell>
                  <TableCell>
                    <Button
                      size='small'
                      variant='contained'
                      className={classes.button}
                      onClick={(event) => this.onResolveClick(e)}
                    >
                      {Localization.Resolve}
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    )
  }

  render () {
    const { errors, warnings, detail } = this.props
    const isHasErrors = errors.length > 0
    const isHasWarnings = warnings.length > 0
    const isError = (isHasErrors && isHasWarnings) ?
      this.state.value === 0 :
      isHasErrors
    const isWarning = (isHasErrors && isHasWarnings) ?
      this.state.value === 1 :
      isHasWarnings
    const events = isError ? errors :
      isWarning ? warnings :
      void 0
    const eventsByDevice = groupBy(events, 'logicalDeviceId')
    const errorLabel = isHasErrors ? (
      <Typography component='span' color='error'>
        <ErrorIcon />
        <span> {errors.length}</span>
      </Typography>
    ) : void 0
    const warningLabel = isHasWarnings ? (
      <Typography component='span' style={{ color: colors.warning }}>
        <WarningIcon />
        <span> {warnings.length}</span>
      </Typography>
    ) : void 0
    const eventList = detail ?
      this.getDetailEventsList(events, isError) :
      this.getNotDetailEventsList(eventsByDevice)
    return (
      <Paper square>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          fullWidth
        >
          { isHasErrors ? <Tab label={errorLabel} /> : void 0 }
          { isHasWarnings ? <Tab label={warningLabel} /> : void 0 }
        </Tabs>
        {eventList}
        <ResolveEventDialog
          event={this.state.event}
          open={this.state.openResolveDialog}
          onClose={this.onCloseResolveDialog}
        />
      </Paper>
    )
  }
}

export default withStyles(styles)(NodeEventsList)
