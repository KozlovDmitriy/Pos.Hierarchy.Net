import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Plus extends Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    onDoubleClick: PropTypes.func
  }

  refCallback (item) {
    if (item) {
      item.ondblclick = this.props.onDoubleClick
    }
  }

  render () {
    return (
      <polygon
        ref={this.refCallback.bind(this)}
        transform='translate(22,12)'
        points={'-6,-2, -2,-2, -2,-6, 2,-6, 2,-2, 6,-2, 6,2, 2,2, 2,6, -2,6, -2,2, -6,2'}
        fill={'#fff'}
        // {'#7777FF'}
        stroke={this.props.color}
        strokeWidth={2}
      />
    )
  }
}

export default Plus
