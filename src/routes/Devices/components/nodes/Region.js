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

class Region extends CollapsedNode {
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
        <Typography component='h5' variant='h6' align='center'>Регион</Typography>
        <Typography component='h6' variant='subheading' align='center'>{node.name}</Typography>
        <Table>
          <TableHead>
            <TableRow style={{ height: 0 }}>
              <TableCell style={{ padding: '4px 0px' }} />
              <TableCell style={{ padding: '4px 0px' }} />
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key='code'>
              <TableCell><b>Код региона</b></TableCell>
              <TableCell numeric>{node.regionId}</TableCell>
            </TableRow>
            <TableRow key='citiesCount'>
              <TableCell><b>Количество городов</b></TableCell>
              <TableCell numeric>{node.citiesCount}</TableCell>
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
    const { node } = this.props
    const loading = this.getLoading(22, 12)
    const plus = node.collapsed ? (
      this.state.loading ? loading :
      (
        <Plus
          color={this.statusColor || '#00d6b2'}
          onDoubleClick={this.handleDoubleClick}
        />
      )
    ) : void 0
    const label = (
      <NodeLabel
        x={0}
        y={-19}
        fontSize={15}
        color={this.statusColor || '#00afa3'}
        text={node.name}
        onClick={this.onClick}
      />
    )
    return (
      <Group y={node.y} x={node.x}>
        <polygon
          ref={this.refCallback}
          points={'-1, -10, -8, 11, 9, -2, -11, -2, 6, 11'}
          fill={this.statusColor || '#00d6b2'}
          stroke={this.statusColor || '#00d6b2'}
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

export default Region
