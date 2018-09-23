import React from 'react'
import PropTypes from 'prop-types'
import { Group } from '@vx/group'
import NodeLabel from './NodeLabel'
import Node from './Node'

class LogicalDevice extends Node {
  static propTypes = {
    node: PropTypes.object.isRequired,
    setPopoverIsOpen: PropTypes.func.isRequired
  }

  render () {
    const node = this.props.node
    const label = (
      <NodeLabel
        x={0}
        y={-16}
        fontSize={13}
        color={'#00b8b4'}
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
          stroke={'#00d8d4'}
        />
        {label}
      </Group>
    )
  }
}

export default LogicalDevice
