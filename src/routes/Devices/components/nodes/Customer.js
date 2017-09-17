import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Group } from '@vx/group'

class Customer extends Component {
  static propTypes = {
    node: PropTypes.object.isRequired
  }

  render () {
    const node = this.props.node
    return (
      <Group y={node.y} x={node.x}>
        <polygon
          points={'-10,-20 10,-20 22,0 10,20 -10,20 -22,0'}
          fill={'#CCCCFF'}
          stroke={'#5053FF'}
          strokeWidth={2}
          strokeOpacity={0.8}
        />
        <text
          dy={-26}
          fontSize={16}
          fontFamily='Arial'
          textAnchor={'middle'}
          style={{ pointerEvents: 'none' }}
          fill={'#5053FF'}
          stroke={void 0}
        >
          {node.name}
        </text>
      </Group>
    )
  }
}

export default Customer
