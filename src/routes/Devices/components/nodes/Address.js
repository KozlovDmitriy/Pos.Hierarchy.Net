import React from 'react'
import PropTypes from 'prop-types'
import { Group } from '@vx/group'
import Plus from './Plus'
import NodeLabel from './NodeLabel'
import CollapsedNode from './CollapsedNode'

class Address extends CollapsedNode {
  static propTypes = {
    node: PropTypes.object.isRequired,
    setPopoverIsOpen: PropTypes.func.isRequired,
    collapseNodeAndRewriteTree: PropTypes.func.isRequired
  }

  render () {
    const node = this.props.node
    const loading = this.getLoading(22, 12)
    const plus = node.collapsed ?
      this.state.loading ? loading :
      (
        <Plus
          color='#00afa3'
          onDoubleClick={this.handleDoubleClick}
        />
      ) : void 0
    const label = (
      <NodeLabel
        x={0}
        y={-19}
        fontSize={15}
        color={'#00afa3'}
        text={node.address1}
        onClick={this.onClick}
      />
    )
    return (
      <Group y={node.y} x={node.x}>
        <polygon
          ref={this.refCallback.bind(this)}
          points={'-9,10, -9,-2 -12,-2, 0,-11, 12,-2, 9,-2, 9,10, 3,10, 3,2, -3,2, -3,10'}
          fill={'#fff'}
          stroke={'#00afa3'}
          strokeWidth={2.5}
          strokeOpacity={0.8}
        />
        {plus}
        {label}
      </Group>
    )
  }
}

export default Address
