import React from 'react'
import PropTypes from 'prop-types'
import { Group } from '@vx/group'
import Plus from './Plus'
import NodeLabel from './NodeLabel'
import CollapsedNode from './CollapsedNode'

class City extends CollapsedNode {
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
          color={this.statusColor || '#00afa3'}
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
          points={'-1,-10, -4,-2, -11,-2, -6,3, -8,11, -1,6, 6,11, 4,3, 9,-2, 3,-2'}
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

export default City
