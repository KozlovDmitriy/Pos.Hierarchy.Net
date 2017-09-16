import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'

class Filters extends Component {
  static propTypes = {
    filters: PropTypes.object.isRequired,
    setModelNameFilter: PropTypes.func.isRequired,
    setTerminalIdFilter: PropTypes.func.isRequired,
    setSerialNumberFilter: PropTypes.func.isRequired,
    setMerchantFilter: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.onChangeModel = this.onChangeModel.bind(this)
    this.onChangeTerminalID = this.onChangeTerminalID.bind(this)
    this.onChangeSerNum = this.onChangeSerNum.bind(this)
    this.onChangeMerchant = this.onChangeMerchant.bind(this)
  }

  onChangeModel (event, newValue) {
    this.props.setModelNameFilter(newValue)
  }

  onChangeTerminalID (event, newValue) {
    this.props.setTerminalIdFilter(newValue)
  }

  onChangeSerNum (event, newValue) {
    this.props.setSerialNumberFilter(newValue)
  }

  onChangeMerchant (event, newValue) {
    this.props.setMerchantFilter(newValue)
  }

  render () {
    const { filters } = this.props
    return (
      <div className='row' style={{background: '#fcfcfc'}}>
        <div className='col col-xs-3'>
          <TextField
            id={'modelFilter'}
            floatingLabelText={'Модель'}
            fullWidth
            value={filters.modelName}
            onChange={this.onChangeModel}
          />
        </div>
        <div className='col col-xs-3'>
          <TextField
            id={'terminalIdFilter'}
            floatingLabelText={'Terminal ID'}
            fullWidth
            value={filters.terminalId}
            onChange={this.onChangeTerminalID}
          />
        </div>
        <div className='col col-xs-3'>
          <TextField
            id={'modelFilter'}
            floatingLabelText={'Serial Number'}
            fullWidth
            value={filters.serialNumber}
            onChange={this.onChangeSerNum}
          />
        </div>
        <div className='col col-xs-3'>
          <TextField
            id={'modelFilter'}
            floatingLabelText={'Merchant'}
            fullWidth
            value={filters.merchant}
            onChange={this.onChangeMerchant}
          />
        </div>
      </div>
    )
  }
}
export default Filters
