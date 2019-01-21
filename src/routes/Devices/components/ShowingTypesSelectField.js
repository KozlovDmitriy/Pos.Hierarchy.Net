import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import NodeTypes from 'src/utils/NodeTypes'

const styles = theme => ({
  formControl: {
    // margin: theme.spacing.unit,
    minWidth: 70,
    maxWidth: 'auto',
    marginLeft: 10,
    marginTop: -3
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  }
})

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

class ShowingTypesSelectField extends React.Component {
  handleChange = event => {
    this.props.updateShowingTypes(event.target.value)
  };

  render () {
    const { classes, theme, showingTypes } = this.props
    return (
      <FormControl className={classes.formControl}>
        <Select
          multiple
          value={showingTypes}
          onChange={this.handleChange}
          input={<Input id='select-multiple-chip' />}
          renderValue={selected => (
            <span>
              {selected.length + ' / ' + Object.keys(NodeTypes).length}
            </span>
          )}
          MenuProps={MenuProps}
        >
          {Object.keys(NodeTypes).map(key => (
            <MenuItem
              key={key}
              value={key}
              style={{
                fontWeight:
                  showingTypes.indexOf(key) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
              }}
            >
              {NodeTypes[key]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  }
}

ShowingTypesSelectField.propTypes = {
  showingTypes: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  updateShowingTypes: PropTypes.func.isRequired
}

export default withStyles(styles, { withTheme: true })(ShowingTypesSelectField)
