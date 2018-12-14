import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  inputLabelRoot: { marginTop: -9, fontSize: 12 },
  shrink: { marginTop: 1 },
  inputMarginDense: { padding: 7, fontSize: 12 }
}

class FilterTextField extends React.Component {
  render () {
    const { classes, label, value, onChange } = this.props
    return (
      <TextField
        label={label}
        type='search'
        margin='dense'
        variant='outlined'
        value={value}
        onChange={onChange}
        InputLabelProps={{
          classes: {
            root: classes.inputLabelRoot,
            shrink: classes.shrink
          }
        }}
        InputProps={{
          classes: {
            inputMarginDense: classes.inputMarginDense
          }
        }}
      />
    )
  }
}

FilterTextField.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default withStyles(styles)(FilterTextField)
