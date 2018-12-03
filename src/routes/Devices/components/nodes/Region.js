import React from 'react'
import PropTypes from 'prop-types'
import { Group } from '@vx/group'
import ErrorsBadge from './ErrorsBadge'
import Plus from './Plus'
import NodeLabel from './NodeLabel'
import CollapsedNode from './CollapsedNode'

const errorColor = '#d91c6b'

class Region extends CollapsedNode {
  static propTypes = {
    node: PropTypes.object.isRequired,
    errors: PropTypes.array.isRequired,
    setPopoverIsOpen: PropTypes.func.isRequired,
    collapseNodeAndRewriteTree: PropTypes.func.isRequired
  }

  render () {
    const node = this.props.node
    const loading = this.getLoading(22, 12)
    const errors = this.props.errors
    const isError = errors.length > 0
    const plus = node.collapsed ? (
      this.state.loading ? loading :
      (
        <Plus
          color={isError ? errorColor : '#00d6b2'}
          onDoubleClick={this.handleDoubleClick}
        />
      )
    ) : void 0
    const label = (
      <NodeLabel
        x={0}
        y={-19}
        fontSize={15}
        color={isError ? errorColor : '#00afa3'}
        text={node.name}
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
          points={'-1, -10, -8, 11, 9, -2, -11, -2, 6, 11'}
          fill={isError ? errorColor : '#00d6b2'}
          stroke={isError ? errorColor : '#00d6b2'}
          strokeWidth={2.5}
          strokeOpacity={0.8}
        />
        {plus}
        {label}
        {errorsBadge}
      </Group>
    )
  }
}

export default Region
