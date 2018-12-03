import React from 'react'
import PropTypes from 'prop-types'
import { Group } from '@vx/group'
import ErrorsBadge from './ErrorsBadge'
import Plus from './Plus'
import NodeLabel from './NodeLabel'
import CollapsedNode from './CollapsedNode'

const errorColor = '#d91c6b'

class Merchant extends CollapsedNode {
  static propTypes = {
    node: PropTypes.object.isRequired,
    errors: PropTypes.array.isRequired,
    setPopoverIsOpen: PropTypes.func.isRequired,
    collapseNodeAndRewriteTree: PropTypes.func.isRequired
  }

  render () {
    const node = this.props.node
    const name = node.name === null && node.merchantId !== null && node.merchantId !== '' ?
      node.merchantId :
      node.name
    const loading = this.getLoading(22, 12)
    const errors = this.props.errors
    const isError = errors.length > 0
    const plus = node.collapsed ?
      this.state.loading ? loading :
      (
        <Plus
          color={isError ? errorColor : '#008ba0'}
          onDoubleClick={this.handleDoubleClick}
        />
      ) : void 0
    const label = (
      <NodeLabel
        x={0}
        y={-18}
        fontSize={14}
        color={isError ? errorColor : '#008ba0'}
        text={name}
        onClick={this.onClick}
      />
    )
    const errorsBadge = isError ? (
      <ErrorsBadge errors={errors} />
    ) : void 0
    return (
      <Group y={node.y} x={node.x}>
        <polygon
          ref={this.refCallback}
          points={'0,-10 -11,11 11,11'}
          fill={'#fff'}
          // {'#CCCCFF'}
          stroke={isError ? errorColor : '#008ba0'}
          strokeWidth={3.5}
          strokeOpacity={0.8}
        />
        {plus}
        {label}
        {errorsBadge}
      </Group>
    )
  }
}

export default Merchant
