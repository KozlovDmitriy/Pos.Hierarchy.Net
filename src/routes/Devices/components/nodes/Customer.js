import React from 'react'
import PropTypes from 'prop-types'
import { Group } from '@vx/group'
import Plus from './Plus'
import NodeLabel from './NodeLabel'
import CollapsedNode from './CollapsedNode'

class Customer extends CollapsedNode {
  static propTypes = {
    node: PropTypes.object.isRequired,
    setPopoverIsOpen: PropTypes.func.isRequired,
    collapseNodeAndRewriteTree: PropTypes.func.isRequired
  }

  render () {
    const node = this.props.node
    const name = node.name === null && node.customerId !== null && node.customerId !== '' ?
      node.customerId :
      node.name
    const plus = node.collapsed ? (
      <Plus
        color='#008ba0'
        onDoubleClick={this.handleDoubleClick}
      />
    ) : void 0
    const label = (
      <NodeLabel
        x={0}
        y={-22}
        fontSize={16}
        color={'#008ba0'}
        text={name}
        onClick={this.onClick}
      />
    )
    return (
      <Group y={node.y} x={node.x}>
        <polygon
          ref={this.refCallback}
          points={'-7,-14 7,-14 16,0 7,14 -7,14 -16,0'}
          fill={'#fff'}
          // {'#7777FF'}
          stroke={'#008ba0'}
          strokeWidth={3.5}
          strokeOpacity={0.8}
        />
        {plus}
        {label}
      </Group>
    )
  }
}

export default Customer
