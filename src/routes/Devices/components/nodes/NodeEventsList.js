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
import colors from './colors'

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
    setterminalIdFilter: PropTypes.func.isRequired,
    setPopoverIsOpen: PropTypes.func.isRequired,
    removeError: PropTypes.func.isRequired,
    removeWarning: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.onChangeTerminalID = this.onChangeTerminalID.bind(this)
    this.state = { value: 0 }
  }

  onChangeTerminalID (terminalId) {
    this.props.setPopoverIsOpen(false)
    this.props.setterminalIdFilter(terminalId)
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  terminalLink (terminalId) {
    return (
      <a
        key={terminalId + 'link'}
        href='javascript:void(0)'
        onClick={this.onChangeTerminalID.bind(this, terminalId)}
      >
        {terminalId}
      </a>
    )
  }

  getNotDetailEventsList (events) {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Устройство</TableCell>
            <TableCell>Количество событий</TableCell>
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
    const { classes, removeError, removeWarning } = this.props
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Устройство</TableCell>
            <TableCell>Событие</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {
            events.map(e => {
              const terminalId = e.terminalId
              return (
                <TableRow key={e.terminalId}>
                  <TableCell>
                    {this.terminalLink(terminalId)}
                  </TableCell>
                  <TableCell>{e.content}</TableCell>
                  <TableCell>
                    <Button
                      size='small'
                      variant='contained'
                      className={classes.button}
                      onClick={(event) => isErrors ? removeError(e) : removeWarning(e)}
                    >
                      {'РЕШЕНО'}
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
      </Paper>
    )
  }
}

export default withStyles(styles)(NodeEventsList)
