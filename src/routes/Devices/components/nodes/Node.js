import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ErrorsBadge from './ErrorsBadge'
import WarningsBadge from './WarningsBadge'
import colors from './colors'

class Node extends Component {
  static propTypes = {
    node: PropTypes.object.isRequired,
    errors: PropTypes.array.isRequired,
    warnings: PropTypes.array.isRequired,
    setPopoverIsOpen: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.onClick = this.onClick.bind(this)
    this.isError = (props.errors || []).length > 0
    this.isWarning = (props.warnings || []).length > 0
    this.statusColor =
      this.isError ? colors.error :
      this.isWarning ? colors.warning :
      void 0
    this.badge = this.isError ? <ErrorsBadge errors={props.errors} /> :
      this.isWarning ? <WarningsBadge warnings={props.warnings} /> :
      void 0
  }

  onClick (event) {
    const { node, errors, warnings } = this.props
    const dim = event.target.getBoundingClientRect()
    const x = dim.left
    const y = dim.top
    this.getBoundingClientRect = () => ({
      left: x + 20,
      right: 80 + x,
      top: y + 20,
      bottom: 21 + y
    })
    this.props.setPopoverIsOpen(true, this, this.popoverContent(node, errors, warnings))
  }
}

export default Node
