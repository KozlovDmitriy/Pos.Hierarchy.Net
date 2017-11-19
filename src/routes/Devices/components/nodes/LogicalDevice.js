import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Group } from '@vx/group'

class LogicalDevice extends Component {
  static propTypes = {
    node: PropTypes.object.isRequired
  }

  render () {
    const node = this.props.node
    return (
      <Group y={node.y} x={node.x}>
        <circle
          r={9}
          strokeWidth={2.5}
          fill={'white'}
          strokeOpacity={0.6}
          stroke={'#00d8d4'}
          onClick={() => {
            alert(`clicked: ${JSON.stringify(node.title)}`)
          }}
        />
        <text
          dy={-16}
          fontSize={13}
          fontFamily='Arial'
          textAnchor={'middle'}
          style={{ pointerEvents: 'none' }}
          fill={'#00b8b4'}
          stroke={void 0}
        >
          {node.terminalId}
        </text>
      </Group>
    )
  }
}

export default LogicalDevice
