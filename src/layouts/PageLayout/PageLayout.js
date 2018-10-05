import React from 'react'
// import { IndexLink, Link } from 'react-router'
import PropTypes from 'prop-types'
import config from 'config'
import './PageLayout.scss'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { default as browserHistory } from 'react-router/lib/browserHistory'

class PageLayout extends React.Component {
  constructor (props) {
    super(props)
    this.onHomeBtnClick = this.onHomeBtnClick.bind(this)
  }

  static propTypes = {
    children: PropTypes.node,
    headerText: PropTypes.string,
    location: PropTypes.object,
    errors: PropTypes.array,
    subscribeErrors: PropTypes.func.isRequired
  }

  componentWillMount () {
    if (this.props.errors === void 0) {
      this.props.subscribeErrors()
    }
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
      <IconButton onClick={browserHistory.goBack}>
        <ArrowBackIcon />
      </IconButton>
    ) : <noscript />
    const rightIcon = (
      <IconButton onClick={this.onHomeBtnClick}>
        <HomeIcon />
      </IconButton>
    )
    return (
      <div id='main'>
        <AppBar position='static'>
          <Toolbar>
            {leftIcon}
            <Typography variant='title' color='inherit'>
              {headerText}
            </Typography>
            {rightIcon}
          </Toolbar>
        </AppBar>

        {children}
      </div>
    )
  }
}

export default PageLayout
