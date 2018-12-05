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

  state = {
    isPopoverOpen: false
  }

  constructor (props) {
    super(props)
    this.onClick = this.onClick.bind(this)
    this.init(props)
  }

  init (props) {
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

  componentWillReceiveProps (nextProps) {
    this.init(nextProps)
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
    this.props.setPopoverIsOpen(true, this, { node, errors, warnings })
  }
}

export default Node
