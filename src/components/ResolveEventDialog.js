import React from 'react'
import PropTypes from 'prop-types'
import Slide from '@material-ui/core/Slide'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({ })

function Transition (props) {
  return <Slide direction='up' {...props} />
}

class ResolveEventDialog extends React.Component {
  static propTypes = {
    event: PropTypes.object,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    removeEvent: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.agree = this.agree.bind(this)
    this.state = { open: false }
  }

  agree () {
    const { event, removeEvent, onClose } = this.props
    removeEvent(event)
    onClose()
  }

  render () {
    const { open, onClose } = this.props
    return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle id='alert-dialog-slide-title'>
          {'Подтверждение разрешения события'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            Вы уверены, что хотите выполнить разрешение события?
            Информация о событии будет удалена и более не доступна
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color='primary'>
            Отменить
          </Button>
          <Button onClick={this.agree} color='secondary'>
            Подтвердить
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withStyles(styles)(ResolveEventDialog)
