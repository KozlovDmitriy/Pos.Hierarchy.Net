import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Group } from '@vx/group'

class PhysicalDevice extends Component {
  static propTypes = {
    node: PropTypes.object.isRequired,
    setPopoverIsOpen: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick = () => {
    this.props.setPopoverIsOpen(true, this, this.props.node)
  }

  render () {
    const node = this.props.node
      this.getBoundingClientRect = () => ({
        left: 660 + node.x,
        right: 661 + node.x,
        top: 80 + node.y,
        bottom: 81 + node.y
      })
    var rect = (
      <rect
        width={16}
        height={16}
        y={-8}
        x={-8}
        fill={node.main ? '#03c0dc' : 'white'}
        stroke='#03c0dc'
        strokeWidth={2}
        onClick={this.onClick}
      />
    )
    return (
      <Group y={node.y} x={node.x}>
        {rect}
        <text
          dy={-16}
          fontSize={13}
          fontFamily='Arial'
          textAnchor={'middle'}
          style={{ pointerEvents: 'none' }}
          fill={'#03a09c'}
          stroke={void 0}
        >
          {node.name}
        </text>
      </Group>
    )
  }
}

export default PhysicalDevice
