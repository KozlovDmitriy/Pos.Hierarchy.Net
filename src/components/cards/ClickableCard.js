import React from 'react'
import { Card } from 'material-ui/Card'
import PropTypes from 'prop-types'

/**
 * Кликабельная карточка с главной страницы
 */
class ClickableCard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      highlighted: false
    }
  }

  static propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func.isRequired
  }

  render () {
    const { onClick, children, ...rest } = this.props
    return (
      <Card
        onTouchTap={onClick}
        initiallyExpanded
        onMouseEnter={() => this.setState({ highlighted: true })}
        onMouseLeave={() => this.setState({ highlighted: false })}
        containerStyle={this.state.highlighted ? { backgroundColor: 'rgba(0, 0, 0, 0.1)' } : null}
        {...rest}>
        {children}
      </Card>
    )
  }
}

export default ClickableCard;
