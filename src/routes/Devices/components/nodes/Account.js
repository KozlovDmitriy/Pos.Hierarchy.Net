import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Group } from '@vx/group'

class Account extends Component {
  static propTypes = {
    node: PropTypes.object.isRequired
  }

  render () {
    const node = this.props.node
    return (
      <Group y={node.y} x={node.x}>
        <polygon
          points={'0,-10 10,0 0,10 -10,0'}
          fill={'#EEE0F0'}
          stroke={'#D340E3'}
          strokeWidth={2.5}
          strokeOpacity={0.8}
        />
        <text
          dy={-16}
          fontSize={13}
          fontFamily='Arial'
          textAnchor={'middle'}
          style={{ pointerEvents: 'none' }}
          fill={'#222'}
          stroke={void 0}
        >
          {node.title}
        </text>
      </Group>
    )
  }
}

export default Account
