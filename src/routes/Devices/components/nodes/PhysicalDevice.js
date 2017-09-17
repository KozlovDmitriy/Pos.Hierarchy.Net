import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Group } from '@vx/group'

class PhysicalDevice extends Component {
  static propTypes = {
    node: PropTypes.object.isRequired
  }

  render () {
    const node = this.props.node
    return (
      <Group y={node.y} x={node.x}>
        <rect
          width={16}
          height={16}
          y={-8}
          x={-8}
          fill='white'
          stroke='#03c0dc'
          strokeWidth={2}
        />
        <text
          dy={-16}
          fontSize={13}
          fontFamily='Arial'
          textAnchor={'middle'}
          style={{ pointerEvents: 'none' }}
          fill={'#03a09c'}
          stroke={void 0}
        >
          {node.title}
        </text>
      </Group>
    )
  }
}

export default PhysicalDevice
