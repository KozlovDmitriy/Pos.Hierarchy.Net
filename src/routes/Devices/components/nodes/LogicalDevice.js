import React from 'react'
import PropTypes from 'prop-types'
import { Group } from '@vx/group'
import ErrorsBadge from './ErrorsBadge'
import NodeLabel from './NodeLabel'
import Node from './Node'

const errorColor = '#d91c6b'

class LogicalDevice extends Node {
  static propTypes = {
    node: PropTypes.object.isRequired,
    errors: PropTypes.array.isRequired,
    setPopoverIsOpen: PropTypes.func.isRequired
  }

  render () {
    const node = this.props.node
    const errors = this.props.errors
    const isError = errors.length > 0
    const label = (
      <NodeLabel
        x={0}
        y={-16}
        fontSize={13}
        color={isError ? errorColor : '#00b8b4'}
        text={node.terminalId}
        onClick={this.onClick}
      />
    )
    const errorsBadge = isError ? (
      <ErrorsBadge errors={errors} />
    ) : void 0
    return (
      <Group y={node.y} x={node.x}>
        <circle
          r={9}
          strokeWidth={2.5}
          fill={'white'}
          strokeOpacity={0.6}
          stroke={isError ? errorColor : '#00d8d4'}
        />
        {label}
        {errorsBadge}
      </Group>
    )
  }
}

export default LogicalDevice
