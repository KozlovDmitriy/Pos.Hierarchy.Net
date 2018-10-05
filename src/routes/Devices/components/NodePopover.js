import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Popover from '@material-ui/core/Popover'

class NodePopover extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    anchor: PropTypes.object,
    data: PropTypes.object,
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
        style={{padding: 20}}
        anchorOrigin={{ horizontal:'center', vertical:'top' }}
        targetOrigin={{ horizontal:'center', vertical:'bottom' }}
        onRequestClose={this.handleRequestClose}
      >
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Popover>
    )
  }
}

export default NodePopover
