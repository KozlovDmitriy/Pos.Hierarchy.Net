import React from 'react'
import PropTypes from 'prop-types'
import { Group } from '@vx/group'
import Plus from './Plus'
import NodeLabel from './NodeLabel'
import CollapsedNode from './CollapsedNode'

class Customer extends CollapsedNode {
  static propTypes = {
    node: PropTypes.object.isRequired,
    errors: PropTypes.array.isRequired,
    warnings: PropTypes.array.isRequired,
    setPopoverIsOpen: PropTypes.func.isRequired,
    collapseNodeAndRewriteTree: PropTypes.func.isRequired
  }

  render () {
    const node = this.props.node
    const name = node.name === null && node.customerId !== null && node.customerId !== '' ?
      node.customerId :
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
        y={-22}
        fontSize={16}
        color={this.statusColor || '#008ba0'}
        text={name}
        onClick={this.onClick}
      />
    )
    return (
      <Group y={node.y} x={node.x} style={{ cursor: 'pointer' }}>
        <polygon
          ref={this.refCallback}
          points={'-7,-14 7,-14 16,0 7,14 -7,14 -16,0'}
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

export default Customer
