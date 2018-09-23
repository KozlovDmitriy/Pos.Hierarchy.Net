import React from 'react'
import PropTypes from 'prop-types'
import { Group } from '@vx/group'
import ErrorsBadge from './ErrorsBadge'
import Plus from './Plus'
import NodeLabel from './NodeLabel'
import CollapsedNode from './CollapsedNode'

const errorColor = '#d91c6b'

class PhysicalDevice extends CollapsedNode {
  static propTypes = {
    node: PropTypes.object.isRequired,
    errors: PropTypes.array.isRequired,
    setPopoverIsOpen: PropTypes.func.isRequired,
    collapseNodeAndRewriteTree: PropTypes.func.isRequired
  }

  render () {
    const node = this.props.node
    const plus = node.collapsed ? (
      <Plus
        color='#00bde7'
        onDoubleClick={this.handleDoubleClick}
      />
    ) : void 0
    const errors = this.props.errors
    const isError = errors.length > 0
    const rect = (
      <rect
        ref={this.refCallback}
        width={16}
        height={16}
        y={-8}
        x={-8}
        fill={
          isError ? errorColor :
          node.parentId === null || node.parentId === void 0 ?
          '#00bde7' :
          'white'
        }
        stroke={isError ? errorColor : '#00bde7'}
        strokeWidth={2}
      />
    )
    const label = (
      <NodeLabel
        x={0}
        y={-16}
        color={isError ? errorColor : '#009dc7'}
        text={node.serialNumber}
        onClick={this.onClick}
      />
    )
    const errorsBadge = isError ? (
      <ErrorsBadge errors={errors} />
    ) : void 0
    return (
      <Group y={node.y} x={node.x}>
        {rect}
        {plus}
        {label}
        {errorsBadge}
      </Group>
    )
  }
}

export default PhysicalDevice
