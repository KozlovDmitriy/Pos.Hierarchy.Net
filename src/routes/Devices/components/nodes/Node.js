import { Component } from 'react'
import PropTypes from 'prop-types'

class Node extends Component {
  static propTypes = {
    node: PropTypes.object.isRequired,
    setPopoverIsOpen: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.onClick = this.onClick.bind(this)
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
}

export default Node
