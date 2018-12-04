import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Popover from '@material-ui/core/Popover'

class NodePopover extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    anchor: PropTypes.object,
    data: PropTypes.node,
    setPopoverIsOpen: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.handleRequestClose = this.handleRequestClose.bind(this)
  }

  handleRequestClose = () =>
    this.props.setPopoverIsOpen(false)

  render () {
    const { isOpen, anchor, data } = this.props
    return (
      <Popover
        open={isOpen}
        anchorEl={anchor}
        style={{ padding: 20 }}
        anchorOrigin={{ horizontal: -40, vertical:'top' }}
        onClose={this.handleRequestClose}
      >
        {data}
      </Popover>
    )
  }
}

export default NodePopover
