import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Group } from '@vx/group'

class City extends Component {
  static propTypes = {
    node: PropTypes.object.isRequired
  }

  render () {
    const node = this.props.node
    return (
      <Group y={node.y} x={node.x}>
        <polygon
          points={'-1, -10, -8, 11, 9, -2, -11, -2, 6, 11'}
          fill={'#fff'}
          stroke={'#00afa3'}
          // fill={'#6791C5'}
          // stroke={'#6791C5'}
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
          {node.name}
        </text>
      </Group>
    )
  }
}

export default City
