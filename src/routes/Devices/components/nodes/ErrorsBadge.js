import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Group } from '@vx/group'

const errorColor = '#d91c6b'

class ErrorsBadge extends Component {
  static propTypes = {
    errors: PropTypes.array.isRequired,
    transform: PropTypes.string
  }

  render () {
    const errors = this.props.errors
    const transform = this.props.transform
    const isError = errors.length > 0
    const errorsBadge = isError ? (
      <Group transform={transform === void 0 ? 'translate(-11, 9)' : transform}>
        <circle
          r='9'
          fill={errorColor}
          stroke={'#fff'}
          strokeWidth={1}
          style={{ textAlign: 'center' }}
        />
        <text
          y={3.5}
          fontSize={11}
          fontFamily='Arial'
          textAnchor={'middle'}
          alignmentBaseline={'middle'}
          style={{ pointerEvents: 'none' }}
          stroke={'#fff'}
          strokeWidth={0.5}
        >
          <tspan textAnchor={'middle'}>{`${errors.length > 99 ? '...' : errors.length}`}</tspan>
        </text>
      </Group>
    ) : void 0
    return (errorsBadge)
  }
}

export default ErrorsBadge
