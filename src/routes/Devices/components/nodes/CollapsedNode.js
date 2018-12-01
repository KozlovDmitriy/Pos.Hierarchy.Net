import React from 'react'
import PropTypes from 'prop-types'
import Node from './Node'

class CollapsedNode extends Node {
  static propTypes = {
    node: PropTypes.object.isRequired,
    setPopoverIsOpen: PropTypes.func.isRequired,
    collapseNodeAndRewriteTree: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {
      isOnDoubleClickInit: false
    }
    this.handleDoubleClick = this.handleDoubleClick.bind(this)
    this.refCallback = this.refCallback.bind(this)
  }

  handleDoubleClick () {
    this.setState({ ...this.state, loading: true })
    this.props.collapseNodeAndRewriteTree(this.props.node)
  }

  getLoading (tx, ty) {
    return (
      <g transform={`translate(${tx},${ty})`}>
        <g transform='translate(0 0)'>
          <circle cx='0' cy='0' r='2' fill='#14c6a4' transform='scale(0.197092 0.197092)'>
            <animateTransform
              attributeName='transform'
              type='scale'
              begin='-0.3333333333333333s'
              calcMode='spline'
              keySplines='0.3 0 0.7 1;0.3 0 0.7 1'
              values='0;1;0'
              keyTimes='0;0.5;1'
              dur='1s'
              repeatCount='indefinite' />
          </circle>
        </g>
        <g transform='translate(5 0)'>
          <circle cx='0' cy='0' r='2' fill='#14c6a4' transform='scale(0.654226 0.654226)'>
            <animateTransform
              attributeName='transform'
              type='scale'
              begin='-0.16666666666666666s'
              calcMode='spline'
              keySplines='0.3 0 0.7 1;0.3 0 0.7 1'
              values='0;1;0'
              keyTimes='0;0.5;1'
              dur='1s'
              repeatCount='indefinite' />
          </circle>
        </g>
        <g transform='translate(10 0)'>
          <circle cx='0' cy='0' r='2' fill='#14c6a4' transform='scale(0.990512 0.990512)'>
            <animateTransform
              attributeName='transform'
              type='scale'
              begin='0s'
              calcMode='spline'
              keySplines='0.3 0 0.7 1;0.3 0 0.7 1'
              values='0;1;0'
              keyTimes='0;0.5;1'
              dur='1s'
              repeatCount='indefinite' />
          </circle>
        </g>
      </g>
    )
  }

  refCallback (item) {
    if (item && !this.state.isOnDoubleClickInit) {
      item.ondblclick = this.handleDoubleClick
      this.setState({ ...this.state, isOnDoubleClickInit: true })
    }
  }
}

export default CollapsedNode
