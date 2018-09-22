import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Group } from '@vx/group'
import Plus from './Plus'

class Account extends Component {
  static propTypes = {
    node: PropTypes.object.isRequired,
    collapseNodeAndRewriteTree: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.handleDoubleClick = this.handleDoubleClick.bind(this)
  }

  handleDoubleClick () {
    this.props.collapseNodeAndRewriteTree(this.props.node.id)
  }

  refCallback (item) {
    if (item) {
      item.ondblclick = this.handleDoubleClick
    }
  }

  render () {
    const node = this.props.node
    const plus = node.collapsed ? (
      <Plus
        color='#008ba0'
        onDoubleClick={this.handleDoubleClick}
      />
    ) : void 0
    return (
      <Group y={node.y} x={node.x}>
        <polygon
          ref={this.refCallback.bind(this)}
          points={'0,-15 15,0 0,15 -15,0'}
          fill={'#fff'}
          // {'#9999FF'}
          stroke={'#008ba0'}
          // fill={'#EEE0F0'}
          // stroke={'#D340E3'}
          strokeWidth={3.5}
          strokeOpacity={0.8}
        />
        {plus}
        <text
          dy={-21}
          fontSize={15}
          fontFamily='Arial'
          textAnchor={'middle'}
          style={{ pointerEvents: 'none' }}
          fill={'#008ba0'} // fill={'#D340E3'}
          stroke={void 0}
        >
          {node.name}
        </text>
      </Group>
    )
  }
}

export default Account
