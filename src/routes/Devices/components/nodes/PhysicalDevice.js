import React from 'react'
import PropTypes from 'prop-types'
import { Group } from '@vx/group'
import Plus from './Plus'
import NodeLabel from './NodeLabel'
import CollapsedNode from './CollapsedNode'

class PhysicalDevice extends CollapsedNode {
  static propTypes = {
    node: PropTypes.object.isRequired,
    errors: PropTypes.array.isRequired,
    warnings: PropTypes.array.isRequired,
    setPopoverIsOpen: PropTypes.func.isRequired,
    collapseNodeAndRewriteTree: PropTypes.func.isRequired
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
      <Group y={node.y} x={node.x} style={{ cursor: 'pointer' }}>
        {rect}
        {plus}
        {label}
        {this.badge}
      </Group>
    )
  }
}

export default PhysicalDevice
