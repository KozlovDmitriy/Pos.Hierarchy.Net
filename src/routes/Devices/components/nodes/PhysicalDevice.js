import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Group } from '@vx/group'
import ErrorsBadge from './ErrorsBadge'

const errorColor = '#d91c6b'

class PhysicalDevice extends Component {
  static propTypes = {
    node: PropTypes.object.isRequired,
    errors: PropTypes.array.isRequired,
    setPopoverIsOpen: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick = (event) => {
    var e = event.target
    var dim = e.getBoundingClientRect()
    var x = dim.left
    var y = dim.top
    this.getBoundingClientRect = () => ({
      left: x,
      right: 1 + x,
      top: y,
      bottom: 1 + y
    })
    this.props.setPopoverIsOpen(true, this, this.props.node)
  }

  render () {
    const node = this.props.node
    const errors = this.props.errors
    const isError = errors.length > 0
    const rect = (
      <rect
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
        onClick={this.onClick}
      />
    )
    const errorsBadge = isError ? (
      <ErrorsBadge errors={errors} />
    ) : void 0
    return (
      <Group y={node.y} x={node.x}>
        {rect}
        <text
          dy={-16}
          fontSize={13}
          fontFamily='Arial'
          textAnchor={'middle'}
          style={{ pointerEvents: 'none' }}
          fill={isError ? errorColor : '#009dc7'}
          stroke={void 0}
        >
          {`${node.serialNumber}`}
        </text>
        {errorsBadge}
      </Group>
    )
  }
}

export default PhysicalDevice
