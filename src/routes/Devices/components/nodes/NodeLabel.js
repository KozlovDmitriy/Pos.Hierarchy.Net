import React, { Component } from 'react'
import PropTypes from 'prop-types'

const MEASUREMENT_ELEMENT_ID = '__react_svg_text_measurement_id'

function getStringWidth (str) {
  try {
    // Calculate length of each word to be used to determine number of words per line
    let textEl = document.getElementById(MEASUREMENT_ELEMENT_ID)
    if (!textEl) {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      svg.style.width = 0
      svg.style.height = 0
      svg.style.position = 'absolute'
      svg.style.top = '-100%'
      svg.style.left = '-100%'
      textEl = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      textEl.setAttribute('id', MEASUREMENT_ELEMENT_ID)
      svg.appendChild(textEl)
      document.body.appendChild(svg)
    }
    Object.assign(textEl.style, {})
    textEl.textContent = str
    return textEl.getComputedTextLength()
  } catch (e) {
    return null
  }
}

function ellipsisSvgText (text, width) {
  if (getStringWidth(text) < width) {
    return text
  }
  let outString = text.slice(0, -1)
  while (getStringWidth(outString + '...') > width) {
    outString = outString.slice(0, -1)
  }
  return outString + '...'
}

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
    const viewText = text === null || text === void 0 || text === '' ?
      '[unknown]' :
      ellipsisSvgText(text, 100)
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
          title={viewText}
        >
          {viewText}
        </text>
      </g>
    )
  }
}

export default NodeLabel
