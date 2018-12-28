import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Group } from '@vx/group'
import colors from 'src/components/colors'

class ErrorsBadge extends Component {
  static propTypes = {
    errors: PropTypes.array.isRequired,
    transform: PropTypes.string,
    color: PropTypes.string
  }

  render () {
    const { errors, transform } = this.props
    const color = this.props.color || colors.error
    const isError = errors.length > 0
    const errorsBadge = isError ? (
      <Group transform={transform === void 0 ? 'translate(-11, 9)' : transform}>
        <circle
          r='9'
          fill={color}
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
          style={{
            MozUserSelect: 'none',
            WebkitUserSelect: 'none',
            msUserSelect: 'none',
            pointerEvents: 'none'
          }}
          fill={'#fff'}
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
