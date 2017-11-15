import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Group } from '@vx/group'

class Address extends Component {
  static propTypes = {
    node: PropTypes.object.isRequired
  }

  render () {
    const node = this.props.node
    return (
      <Group y={node.y} x={node.x}>
        <polygon
          points={'-9,10, -9,-2 -12,-2, 0,-11, 12,-2, 9,-2, 9,10, 3,10, 3,2, -3,2, -3,10'}
          fill={'#fff'}
          stroke={'#00afa3'}
          strokeWidth={2.5}
          strokeOpacity={0.8}
        />
        <text
          dy={-19}
          fontSize={15}
          fontFamily='Arial'
          textAnchor={'middle'}
          style={{ pointerEvents: 'none' }}
          fill={'#00afa3'}
          stroke={void 0}
        >
          {node.address1}
        </text>
      </Group>
    )
  }
}

export default Address
