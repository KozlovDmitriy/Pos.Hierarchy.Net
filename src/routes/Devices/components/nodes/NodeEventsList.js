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
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
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

function Transition (props) {
  return <Slide direction='up' {...props} />
}

class NodeEventsList extends React.Component {
  static propTypes = {
    detail: PropTypes.bool,
    errors: PropTypes.array.isRequired,
    warnings: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired,
    setterminalIdFilter: PropTypes.func.isRequired,
    setPopoverIsOpen: PropTypes.func.isRequired,
    removeError: PropTypes.func.isRequired,
    removeWarning: PropTypes.func.isRequired,
    removeEvent: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.onClickTerminalId = this.onClickTerminalId.bind(this)
    this.agree = this.agree.bind(this)
    this.state = { value: 0, open: false }
  }

  handleClickOpen = () => {
    this.setState({ ...this.state, open: true })
  };

  handleClose = () => {
    this.setState({ ...this.state, open: false })
  };

  handleChange = (event, value) => {
    this.setState({ ...this.state, value })
  }

  onClickTerminalId (terminalId) {
    this.props.setPopoverIsOpen(false)
    this.props.setterminalIdFilter(terminalId)
  }

  terminalLink (terminalId) {
    return (
      <a
        key={terminalId + 'link'}
        href='javascript:void(0)'
        onClick={this.onClickTerminalId.bind(this, terminalId)}
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

  onResolveClick (event, isError) {
    this.setState({ ...this.state, event, isError, open: true })
  }

  getDetailEventsList (events, isErrors) {
    const { classes, removeEvent } = this.props
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
                <TableRow key={e.id}>
                  <TableCell>
                    {this.terminalLink(terminalId)}
                  </TableCell>
                  <TableCell>{e.content}</TableCell>
                  <TableCell>
                    <Button
                      size='small'
                      variant='contained'
                      className={classes.button}
                      onClick={(event) => removeEvent(e) /* this.onResolveClick(e, isErrors) */}
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

  agree () {
    const { event, isError } = this.state
    const { removeError, removeWarning } = this.props
    this.handleClose()
    if (isError) {
      removeError(event)
    } else {
      removeWarning(event)
    }
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
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby='alert-dialog-slide-title'
          aria-describedby='alert-dialog-slide-description'
        >
          <DialogTitle id='alert-dialog-slide-title'>
            {'Подтверждение разрешения события'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-slide-description'>
              Вы уверены, что хотите выполнить разрешение события?
              Информация о событии будет удалена и более не доступна
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='primary'>
              Отменить
            </Button>
            <Button onClick={this.agree} color='secondary'>
              Подтвердить
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    )
  }
}

export default withStyles(styles)(NodeEventsList)
