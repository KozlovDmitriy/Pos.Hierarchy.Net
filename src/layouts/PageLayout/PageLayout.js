import React from 'react'
// import { IndexLink, Link } from 'react-router'
import PropTypes from 'prop-types'
import config from 'config'
import './PageLayout.scss'
import IconButton from 'material-ui/IconButton'
import HomeIcon from 'material-ui/svg-icons/action/home'
import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back'
import AppBar from 'material-ui/AppBar'
import { default as browserHistory } from 'react-router/lib/browserHistory'

class PageLayout extends React.Component {
  constructor (props) {
    super(props)
    this.onHomeBtnClick = this.onHomeBtnClick.bind(this)
  }

  static propTypes = {
    children: PropTypes.node,
    headerText: PropTypes.string,
    location: PropTypes.object
  }

  contextTypes: {
    router: React.PropTypes.object.isRequired
  }

  onHomeBtnClick (e) {
    const url = `${config.webappurl}`
    const win = window.open(url, '_blank')
    win.focus()
  }

  render () {
    const { headerText, location, children } = this.props
    const leftIcon = location.pathname !== '/' ? (
      <IconButton onTouchTap={browserHistory.goBack}>
        <ArrowBackIcon />
      </IconButton>
    ) : <noscript />
    const rightIcon = (
      <IconButton onTouchTap={this.onHomeBtnClick}>
        <HomeIcon />
      </IconButton>
    )
    return (
      <div id='main'>
        <AppBar
          title={headerText}
          iconElementLeft={leftIcon}
          iconElementRight={rightIcon}
        />
        {children}
      </div>
    )
  }
}

export default PageLayout
