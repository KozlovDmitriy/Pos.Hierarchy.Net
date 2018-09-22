import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Group } from '@vx/group'
import Plus from './Plus'

class City extends Component {
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
        color='#00afa3'
        onDoubleClick={this.handleDoubleClick}
      />
    ) : void 0
    return (
      <Group y={node.y} x={node.x}>
        <polygon
          ref={this.refCallback.bind(this)}
          points={'-1,-10, -4,-2, -11,-2, -6,3, -8,11, -1,6, 6,11, 4,3, 9,-2, 3,-2'}
          // points={'-1,-10, -8,11, 9,-2, -11,-2, 6,11'}
          fill={'#fff'}
          stroke={'#00afa3'}
          // fill={'#6791C5'}
          // stroke={'#6791C5'}
          strokeWidth={2.5}
          strokeOpacity={0.8}
        />
        {plus}
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
