import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Group } from '@vx/group'

class Merchant extends Component {
  static propTypes = {
    node: PropTypes.object.isRequired
  }

  render () {
    const node = this.props.node
    //fill={'#BBFFBB'}
    //stroke={'#70CC53'}
    return (
      <Group y={node.y} x={node.x}>
        <polygon
          points={'0,-12 -12,12 12,12'}
          fill={'#CCCCFF'}
          stroke={'#5053FF'}
          strokeWidth={2}
          strokeOpacity={0.8}
        />
        <text
          dy={-18}
          fontSize={14}
          fontFamily='Arial'
          textAnchor={'middle'}
          style={{ pointerEvents: 'none' }}
          fill={'#5053FF'}
          stroke={void 0}
        >
          {node.title}
        </text>
      </Group>
    )
  }
}

export default Merchant
