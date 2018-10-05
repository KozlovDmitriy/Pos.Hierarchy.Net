import React from 'react'
import Card from '@material-ui/core/Card'
import PropTypes from 'prop-types'
import CardActionArea from '@material-ui/core/CardActionArea'

/**
 * Кликабельная карточка с главной страницы
 */
class ClickableCard extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func.isRequired
  }

  render () {
    const { onClick, children, ...rest } = this.props
    return (
      <Card
        onClick={onClick}
        {...rest}>
        <CardActionArea>
          {children}
        </CardActionArea>
      </Card>
    )
  }
}

export default ClickableCard
