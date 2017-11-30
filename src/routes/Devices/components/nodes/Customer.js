import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Group } from '@vx/group'

class Customer extends Component {
  static propTypes = {
    node: PropTypes.object.isRequired,
    collapseNodeAndRewriteTree: PropTypes.func.isRequired
  }

  handleDoubleClick () {
    this.props.collapseNodeAndRewriteTree(this.props.node.id)
  }

  refCallback (item) {
    if (item) {
      item.ondblclick = this.handleDoubleClick.bind(this)
    }
  }

  render () {
    const node = this.props.node
    const plus = node.collapsed ? (
      <polygon
        ref={this.refCallback.bind(this)}
        transform='translate(22,12)'
        points={'-6,-2, -2,-2, -2,-6, 2,-6, 2,-2, 6,-2, 6,2, 2,2, 2,6, -2,6, -2,2, -6,2'}
        fill={'#fff'}
        // {'#7777FF'}
        stroke={'#008ba0'}
        strokeWidth={2}
      />
    ) : void 0 /* (
      <polygon
        transform='translate(22,10)'
        points={'-6,-2, 6,-2, 6,2, -6,2'}
        fill={'#fff'}
        // {'#7777FF'}
        stroke={'#888'}
        strokeWidth={2}
      />
    ) */
    return (
      <Group y={node.y} x={node.x}>
        <polygon
          ref={this.refCallback.bind(this)}
          points={'-7,-14 7,-14 16,0 7,14 -7,14 -16,0'}
          fill={'#fff'}
          // {'#7777FF'}
          stroke={'#008ba0'}
          strokeWidth={3.5}
          strokeOpacity={0.8}
        />
        {plus}
        <text
          dy={-22}
          fontSize={16}
          fontFamily='Arial'
          textAnchor={'middle'}
          style={{ pointerEvents: 'none' }}
          fill={'#008ba0'}
          stroke={void 0}
        >
          {node.name}
        </text>
      </Group>
    )
  }
}

export default Customer
