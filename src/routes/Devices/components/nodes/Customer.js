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
          points={'-4,-8 4,-8 9,0 4,8 -4,8 -9,0'}
          fill={'#CCCCFF'}
          stroke={'#5053FF'}
          strokeWidth={2}
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

export default Customer
