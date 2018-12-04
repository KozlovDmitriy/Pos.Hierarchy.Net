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

class Address extends CollapsedNode {
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
        <Typography component='h5' variant='h6' align='center'>Адрес</Typography>
        <Typography component='h6' variant='subheading' align='center'>{node.address1}</Typography>
        <Table>
          <TableHead>
            <TableRow style={{ height: 0 }}>
              <TableCell style={{ padding: '4px 0px' }} />
              <TableCell style={{ padding: '4px 0px' }} />
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key='customersCount'>
              <TableCell><b>Количество кастомеров</b></TableCell>
              <TableCell numeric>{node.customersCount}</TableCell>
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
    const loading = this.getLoading(22, 12)
    const plus = node.collapsed ?
      this.state.loading ? loading :
      (
        <Plus
          color={this.statusColor || '#00afa3'}
          onDoubleClick={this.handleDoubleClick}
        />
      ) : void 0
    const label = (
      <NodeLabel
        x={0}
        y={-19}
        fontSize={15}
        color={this.statusColor || '#00afa3'}
        text={node.address1}
        onClick={this.onClick}
      />
    )
    return (
      <Group y={node.y} x={node.x}>
        <polygon
          ref={this.refCallback}
          points={'-9,10, -9,-2 -12,-2, 0,-11, 12,-2, 9,-2, 9,10, 3,10, 3,2, -3,2, -3,10'}
          fill={'#fff'}
          stroke={this.statusColor || '#00afa3'}
          strokeWidth={2.5}
          strokeOpacity={0.8}
        />
        {plus}
        {label}
        {this.badge}
      </Group>
    )
  }
}

export default Address
