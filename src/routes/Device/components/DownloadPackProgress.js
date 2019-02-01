import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import LinearProgress from '@material-ui/core/LinearProgress'
import { withStyles } from '@material-ui/core/styles'
import green from '@material-ui/core/colors/green'
import grey from '@material-ui/core/colors/grey'
import Localization from 'localization'

const styles = theme => ({
  colorPrimary: {
    backgroundColor: grey[200],
  },
  barColorPrimary: {
    backgroundColor: green[400],
  }
})

class DownloadPackProgress extends Component {
  static propTypes = {
    progressInfo: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
  }

  render () {
    const { classes, progressInfo } = this.props
    const filesProgress = Math.round(progressInfo.downloadedFiles / progressInfo.filesCount * 100)
    const fileProgress = Math.round(progressInfo.downloadedBytes / progressInfo.fileSize * 100)
    return (
      <div>
        <Typography variant='subtitle1' gutterBottom style={{ marginTop: 0 }}>
          {Localization.Loading}:
        </Typography>
        <Paper style={{ padding: 10 }}>
          <Typography variant='body2' gutterBottom>
            {
              Localization.PackageLoadingMessage(
                progressInfo.downloadedFiles,
                progressInfo.filesCount,
                progressInfo.fileName
              )
            }
          </Typography>
          <LinearProgress
            classes={{ colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimary }}
            variant='determinate'
            value={filesProgress}
          />
          <Typography variant='body2' gutterBottom style={{ marginTop: 10 }}>
            {
              Localization.FileLoadingMessage(
                progressInfo.downloadedBytes,
                progressInfo.fileSize,
                fileProgress
              )
            }
          </Typography>
          <LinearProgress
            classes={{ colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimary }}
            variant='determinate'
            value={fileProgress}
          />
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(DownloadPackProgress)
