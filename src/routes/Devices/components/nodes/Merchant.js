import React from 'react'
import PropTypes from 'prop-types'
import { Group } from '@vx/group'
import Plus from './Plus'
import NodeLabel from './NodeLabel'
import CollapsedNode from './CollapsedNode'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'
import NodeEventsList from '../../containers/nodes/NodeEventsListContainer'

class Merchant extends CollapsedNode {
  static propTypes = {
    node: PropTypes.object.isRequired,
    errors: PropTypes.array.isRequired,
    warnings: PropTypes.array.isRequired,
    setPopoverIsOpen: PropTypes.func.isRequired,
    collapseNodeAndRewriteTree: PropTypes.func.isRequired
  }

  popoverContent (node, errors, warnings) {
    return (
      <div style={{ padding: 20 }}>
        <Typography component='h5' variant='h6' align='center'>Мерчант</Typography>
        <Typography component='h6' variant='subheading' align='center'>{node.name}</Typography>
        <Table>
          <TableHead>
            <TableRow style={{ height: 0 }}>
              <TableCell style={{ padding: '4px 0px' }} />
              <TableCell style={{ padding: '4px 0px' }} />
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key='id'>
              <TableCell><b>Идентификатор мерчанта</b></TableCell>
              <TableCell numeric>{node.merchantId}</TableCell>
            </TableRow>
            <TableRow key='logicalDevicesCount'>
              <TableCell><b>Количество Terminal ID</b></TableCell>
              <TableCell numeric>{node.logicalDevicesCount}</TableCell>
            </TableRow>
            <TableRow key='tradePointsCount'>
              <TableCell><b>Количество торговых точек</b></TableCell>
              <TableCell numeric>{node.tradePointsCount}</TableCell>
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
    const name = node.name === null && node.merchantId !== null && node.merchantId !== '' ?
      node.merchantId :
      node.name
    const loading = this.getLoading(22, 12)
    const plus = node.collapsed ?
      this.state.loading ? loading :
      (
        <Plus
          color={this.statusColor || '#008ba0'}
          onDoubleClick={this.handleDoubleClick}
        />
      ) : void 0
    const label = (
      <NodeLabel
        x={0}
        y={-18}
        fontSize={14}
        color={this.statusColor || '#008ba0'}
        text={name}
        onClick={this.onClick}
      />
    )
    return (
      <Group y={node.y} x={node.x}>
        <polygon
          ref={this.refCallback}
          points={'0,-10 -11,11 11,11'}
          fill={'#fff'}
          stroke={this.statusColor || '#008ba0'}
          strokeWidth={3.5}
          strokeOpacity={0.8}
        />
        {plus}
        {label}
        {this.badge}
      </Group>
    )
  }
}

export default Merchant
