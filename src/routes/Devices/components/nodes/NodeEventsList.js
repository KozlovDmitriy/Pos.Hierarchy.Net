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
import colors from './colors'

const groupBy = (xs, key) =>
  xs.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})

class NodeEventsList extends React.Component {
  static propTypes = {
    errors: PropTypes.array.isRequired,
    warnings: PropTypes.array.isRequired,
    setterminalIdFilter: PropTypes.func.isRequired,
    setPopoverIsOpen: PropTypes.func.isRequired
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

  render () {
    const { errors, warnings } = this.props
    const isError = errors.length > 0
    const isWarning = warnings.length > 0
    const events = (isError && isWarning) ? (this.state.value === 0 ? errors : warnings) :
      isError ? errors :
      isWarning ? warnings :
      void 0
    const eventsByDevice = groupBy(events, 'logicalDeviceId')
    const errorLabel = isError ? (
      <Typography component='span' color='error'>
        <ErrorIcon />
        <span> {errors.length}</span>
      </Typography>
    ) : void 0
    const warningLabel = isWarning ? (
      <Typography component='span' style={{ color: colors.warning }}>
        <WarningIcon />
        <span> {warnings.length}</span>
      </Typography>
    ) : void 0
    return (
      <Paper square>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          fullWidth
        >
          { isError ? <Tab label={errorLabel} /> : void 0 }
          { isWarning ? <Tab label={warningLabel} /> : void 0 }
        </Tabs>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Устройство</TableCell>
              <TableCell>Количество событий</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              Object.keys(eventsByDevice).map(d => {
                const terminalId = eventsByDevice[d][0].terminalId
                return (
                  <TableRow key={d}>
                    <TableCell>
                      <a href='#' onClick={this.onChangeTerminalID.bind(this, terminalId)}>
                        {terminalId}
                      </a>
                    </TableCell>
                    <TableCell numeric>{eventsByDevice[d].length}</TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

export default NodeEventsList
