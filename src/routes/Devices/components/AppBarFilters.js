import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AppBarContextConsumer } from 'contexts/AppBarContext'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import ShowingTypesSelectField from '../containers/ShowingTypesSelectFieldContainer'

class AppBarFilters extends Component {
  static propTypes = {
    filterWithPpd: PropTypes.bool.isRequired,
    changeFilterWithPpd: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.onTogglePpd = this.onTogglePpd.bind(this)
  }

  onTogglePpd (event) {
    this.props.changeFilterWithPpd(event.target.checked)
  }

  render () {
    const { filterWithPpd } = this.props
    return (
      <div className='row' style={{ minWidth: 555, paddingLeft: 20, paddingRight: 20 }}>
        <div
          className='col col-sm-6'
          style={{
            borderRight: 'solid 1px #3f51b5',
            paddingLeft:5,
            paddingRight:5,
            maxHeight: 34
          }}
        >
          <FormControlLabel
            style={{ margin: 0, marginTop: -7, padding: 0 }}
            control={
              <Switch
                checked={filterWithPpd}
                onChange={this.onTogglePpd}
              />
            }
            label='Фильтр по связанным ФУ'
          />
        </div>
        <div className='col col-sm-6' style={{ maxHeight: 34, paddingLeft:10, paddingRight:5 }}>
          <FormControlLabel
            style={{ margin: 0, marginTop: 3, padding: 0 }}
            control={<ShowingTypesSelectField />}
            label='Отображаемые классы'
            labelPlacement='start'
          />
        </div>
      </div>
    )
  }
}

export default AppBarFilters
