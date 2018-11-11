import React, { Component } from 'react'
import PropTypes from 'prop-types'

class NodeLabel extends Component {
  static propTypes = {
    text: PropTypes.string,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    fontSize: PropTypes.number,
    color: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      isUnderline: false,
      isOnClickInit: false
    }
    this.textRefCallback = this.textRefCallback.bind(this)
  }

  textRefCallback (item) {
    if (item && !this.state.isOnClickInit) {
      item.addEventListener('click', this.props.onClick)
      item.addEventListener('mouseover', () => this.setState({ isUnderline: true }))
      item.addEventListener('mouseout', () => this.setState({ isUnderline: false }))
      item.onselectstart = () => false
      this.setState({ ...this.state, isOnClickInit: true })
    }
  }

  render () {
    const { text, x, y, color, fontSize } = this.props
    return (
      <g transform={`translate(${x}, ${y})`} ref={this.textRefCallback}>
        <text
          fontSize={fontSize || 13}
          className=''
          fontFamily='Arial'
          textAnchor={'middle'}
          style={{
            MozUserSelect: 'none',
            WebkitUserSelect: 'none',
            msUserSelect: 'none',
            textDecoration: this.state.isUnderline ? 'underline' : 'none'
          }}
          fill={color}
          stroke={void 0}
        >
          {text === null || text === void 0 || text === '' ? '[unknown]' : text}
        </text>
      </g>
    )
  }
}

export default NodeLabel
