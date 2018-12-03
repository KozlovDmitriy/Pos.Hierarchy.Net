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
import { AppBarContextProvider } from 'contexts/AppBarContext'
import { withStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  widget: {
    maxHeight: 34,
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.35),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.45),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    }
  }
})

class PageLayout extends React.Component {
  constructor (props) {
    super(props)
    this.onHomeBtnClick = this.onHomeBtnClick.bind(this)
    this.state = {
      widget: <div />
    }
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
      // TODO: this.props.subscribeErrors()
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

  setWidget (widget) {
    if (widget != this.state.widget) {
      this.setState({ ...this.state, widget })
    }
  }

  render () {
    const { headerText, location, children, classes } = this.props
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
      <AppBarContextProvider value={{
        widget: this.state.widget,
        setWidget: this.setWidget.bind(this)
      }}>
        <div id='main'>
          <AppBar position='static'>
            <Toolbar>
              {leftIcon}
              <Typography variant='h6' color='inherit'>
                {headerText}
              </Typography>
              {rightIcon}
              <div className={classes.grow} />
              <div className={classes.widget}>{this.state.widget}</div>
            </Toolbar>
          </AppBar>

          {children}
        </div>
      </AppBarContextProvider>
    )
  }
}

export default withStyles(styles)(PageLayout)
