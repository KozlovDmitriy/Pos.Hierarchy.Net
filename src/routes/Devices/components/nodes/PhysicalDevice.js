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

class PhysicalDevice extends CollapsedNode {
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
        <Typography component='h5' variant='h6' align='center'>Устройство</Typography>
        <Typography component='h6' variant='subheading' align='center'>{node.serialNumber}</Typography>
        <Table>
          <TableHead>
            <TableRow style={{ height: 0 }}>
              <TableCell style={{ padding: '4px 0px' }} />
              <TableCell style={{ padding: '4px 0px' }} />
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key='model'>
              <TableCell><b>Модель</b></TableCell>
              <TableCell numeric>{node.modelName}</TableCell>
            </TableRow>
            <TableRow key='devicesCount'>
              <TableCell><b>Количество Terminal ID</b></TableCell>
              <TableCell numeric>{node.devicesCount}</TableCell>
            </TableRow>
            <TableRow key='childsCount'>
              <TableCell><b>Количество дочерних устройств</b></TableCell>
              <TableCell numeric>{node.childsCount}</TableCell>
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
          color={this.statusColor || '#00bde7'}
          onDoubleClick={this.handleDoubleClick}
        />
      ) : void 0
    const rect = (
      <rect
        ref={this.refCallback}
        width={16}
        height={16}
        y={-8}
        x={-8}
        fill={
          node.parentId === null || node.parentId === void 0 ?
          (this.statusColor || '#00bde7') :
          'white'
        }
        stroke={this.statusColor || '#00bde7'}
        strokeWidth={2}
      />
    )
    const label = (
      <NodeLabel
        x={0}
        y={-16}
        color={this.statusColor || '#009dc7'}
        text={node.serialNumber}
        onClick={this.onClick}
      />
    )
    return (
      <Group y={node.y} x={node.x}>
        {rect}
        {plus}
        {label}
        {this.badge}
      </Group>
    )
  }
}

export default PhysicalDevice
