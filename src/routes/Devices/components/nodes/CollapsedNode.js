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
    this.props.collapseNodeAndRewriteTree(this.props.node.id)
  }

  refCallback (item) {
    if (item && !this.state.isOnDoubleClickInit) {
      item.ondblclick = this.handleDoubleClick
      this.setState({ ...this.state, isOnDoubleClickInit: true })
    }
  }
}

export default CollapsedNode
