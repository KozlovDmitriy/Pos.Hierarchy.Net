import React from 'react'
import PropTypes from 'prop-types'
import { Group } from '@vx/group'
import NodeLabel from './NodeLabel'
import Node from './Node'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'
import NodeEventsList from '../../containers/nodes/NodeEventsListContainer'

class LogicalDevice extends Node {
  static propTypes = {
    node: PropTypes.object.isRequired,
    errors: PropTypes.array.isRequired,
    setPopoverIsOpen: PropTypes.func.isRequired
  }

  popoverContent (node, errors, warnings) {
    return (
      <div style={{ padding: 20 }}>
        <Typography component='h5' variant='h6' align='center'>Terminal ID</Typography>
        <Typography component='h6' variant='subheading' align='center'>{node.terminalId}</Typography>
        <Table>
          <TableHead>
            <TableRow style={{ height: 0 }}>
              <TableCell style={{ padding: '4px 0px' }} />
              <TableCell style={{ padding: '4px 0px' }} />
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key='merchantId'>
              <TableCell><b>Идентификатор мерчанта</b></TableCell>
              <TableCell numeric>{node.merchantId}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        {
          this.isError || this.isWarning ? (
            <NodeEventsList errors={errors} warnings={warnings} />
          ) : void 0
        }
      </div>
    )
  }

  render () {
    const node = this.props.node
    const label = (
      <NodeLabel
        x={0}
        y={-16}
        fontSize={13}
        color={this.statusColor || '#00b8b4'}
        text={node.terminalId}
        onClick={this.onClick}
      />
    )
    return (
      <Group y={node.y} x={node.x}>
        <circle
          r={9}
          strokeWidth={2.5}
          fill={'white'}
          strokeOpacity={0.6}
          stroke={this.statusColor || '#00d8d4'}
        />
        {label}
        {this.badge}
      </Group>
    )
  }
}

export default LogicalDevice
