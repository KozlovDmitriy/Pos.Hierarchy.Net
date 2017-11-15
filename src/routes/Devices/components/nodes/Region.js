import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Group } from '@vx/group'

class Region extends Component {
  static propTypes = {
    node: PropTypes.object.isRequired
  }

  render () {
    const node = this.props.node
    return (
      <Group y={node.y} x={node.x}>
        <polygon
          points={'-1, -10, -8, 11, 9, -2, -11, -2, 6, 11'}
          fill={'#00d6b2'}
          stroke={'#00d6b2'}
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

export default Region
