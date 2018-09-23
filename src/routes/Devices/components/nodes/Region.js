import React from 'react'
import PropTypes from 'prop-types'
import { Group } from '@vx/group'
import Plus from './Plus'
import NodeLabel from './NodeLabel'
import CollapsedNode from './CollapsedNode'

class Region extends CollapsedNode {
  static propTypes = {
    node: PropTypes.object.isRequired,
    setPopoverIsOpen: PropTypes.func.isRequired,
    collapseNodeAndRewriteTree: PropTypes.func.isRequired
  }

  render () {
    const node = this.props.node
    const plus = node.collapsed ? (
      <Plus
        color='#00d6b2'
        onDoubleClick={this.handleDoubleClick}
      />
    ) : void 0
    const label = (
      <NodeLabel
        x={0}
        y={-19}
        fontSize={15}
        color={'#00afa3'}
        text={node.name}
        onClick={this.onClick}
      />
    )
    return (
      <Group y={node.y} x={node.x}>
        <polygon
          ref={this.refCallback.bind(this)}
          points={'-1, -10, -8, 11, 9, -2, -11, -2, 6, 11'}
          fill={'#00d6b2'}
          stroke={'#00d6b2'}
          strokeWidth={2.5}
          strokeOpacity={0.8}
        />
        {plus}
        {label}
      </Group>
    )
  }
}

export default Region
