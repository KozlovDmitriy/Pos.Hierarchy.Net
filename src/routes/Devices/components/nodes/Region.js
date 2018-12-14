import React from 'react'
import PropTypes from 'prop-types'
import { Group } from '@vx/group'
import Plus from './Plus'
import NodeLabel from './NodeLabel'
import CollapsedNode from './CollapsedNode'

class Region extends CollapsedNode {
  static propTypes = {
    node: PropTypes.object.isRequired,
    errors: PropTypes.array.isRequired,
    warnings: PropTypes.array.isRequired,
    setPopoverIsOpen: PropTypes.func.isRequired,
    collapseNodeAndRewriteTree: PropTypes.func.isRequired
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
      <Group y={node.y} x={node.x} style={{ cursor: 'pointer' }}>
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
