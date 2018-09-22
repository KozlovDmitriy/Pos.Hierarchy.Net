import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Group } from '@vx/group'
import ErrorsBadge from './ErrorsBadge'
import Plus from './Plus'

const errorColor = '#d91c6b'

class PhysicalDevice extends Component {
  static propTypes = {
    node: PropTypes.object.isRequired,
    errors: PropTypes.array.isRequired,
    setPopoverIsOpen: PropTypes.func.isRequired,
    collapseNodeAndRewriteTree: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = { isUnderline: false }
    this.onClick = this.onClick.bind(this)
    this.handleDoubleClick = this.handleDoubleClick.bind(this)
  }

  onClick = (event) => {
    const dim = event.target.getBoundingClientRect()
    const x = dim.left
    const y = dim.top
    this.getBoundingClientRect = () => ({
      left: x + 20,
      right: 80 + x,
      top: y + 20,
      bottom: 21 + y
    })
    this.props.setPopoverIsOpen(true, this, this.props.node)
  }

  handleDoubleClick () {
    this.props.collapseNodeAndRewriteTree(this.props.node.id)
  }

  refCallback (item) {
    if (item) {
      item.ondblclick = this.handleDoubleClick
    }
  }

  textRefCallback (item) {
    if (item) {
      item.addEventListener('click', this.onClick)
      item.addEventListener('mouseover', () => this.setState({ isUnderline: true }))
      item.addEventListener('mouseout', () => this.setState({ isUnderline: false }))
      item.onselectstart = () => false
    }
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
        ref={this.refCallback.bind(this)}
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
    const errorsBadge = isError ? (
      <ErrorsBadge errors={errors} />
    ) : void 0
    return (
      <Group y={node.y} x={node.x}>
        {rect}
        {plus}
        <g transform='translate(0, -16)' ref={this.textRefCallback.bind(this)}>
          <text
            fontSize={13}
            href='#'
            className=''
            fontFamily='Arial'
            textAnchor={'middle'}
            style={{
              MozUserSelect: 'none',
              WebkitUserSelect: 'none',
              msUserSelect: 'none',
              textDecoration: this.state.isUnderline ? 'underline' : 'none'
            }}
            fill={isError ? errorColor : '#009dc7'}
            stroke={void 0}
          >
            {`${node.serialNumber}`}
          </text>
        </g>
        {errorsBadge}
      </Group>
    )
  }
}

export default PhysicalDevice
