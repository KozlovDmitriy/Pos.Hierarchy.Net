import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import Toggle from 'material-ui/Toggle'

class Filters extends Component {
  static propTypes = {
    filterWithPpd: PropTypes.bool.isRequired,
    filters: PropTypes.object.isRequired,
    showingTypes: PropTypes.array.isRequired,
    setModelNameFilter: PropTypes.func.isRequired,
    setTerminalIdFilter: PropTypes.func.isRequired,
    setSerialNumberFilter: PropTypes.func.isRequired,
    setMerchantFilter: PropTypes.func.isRequired,
    toggleShowingType: PropTypes.func.isRequired,
    changeFilterWithPpd: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.onChangeModel = this.onChangeModel.bind(this)
    this.onChangeTerminalID = this.onChangeTerminalID.bind(this)
    this.onChangeSerNum = this.onChangeSerNum.bind(this)
    this.onChangeMerchant = this.onChangeMerchant.bind(this)
    this.onToggleLogical = this.onToggleLogical.bind(this)
    this.onTogglePhysical = this.onTogglePhysical.bind(this)
    this.onToggleMerchant = this.onToggleMerchant.bind(this)
    this.onToggleAccount = this.onToggleAccount.bind(this)
    this.onToggleCustomer = this.onToggleCustomer.bind(this)
    this.onTogglePpd = this.onTogglePpd.bind(this)
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

  onTogglePpd (event, value) {
    this.props.changeFilterWithPpd(value)
  }

  onToggleLogical () {
    this.props.toggleShowingType('logical')
  }

  onTogglePhysical () {
    this.props.toggleShowingType('physical')
  }

  onToggleMerchant () {
    this.props.toggleShowingType('merchant')
  }

  onToggleAccount () {
    this.props.toggleShowingType('account')
  }

  onToggleCustomer () {
    this.props.toggleShowingType('customer')
  }

  render () {
    const { filters, showingTypes, filterWithPpd } = this.props
    return (
      <div style={{ background: '#fcfcfc', marginRight: -15, marginLeft: -15, paddingLeft: 15, paddingRight: 15 }}>
        <div className='row' style={{ marginTop: 30, marginBottom: -25 }}>
          <div className='col col-sm-4'>
            <Toggle
              label='Фильтр по связанным физическим устройствам'
              labelPosition='right'
              labelStyle={{ fontSize: 12 }}
              defaultToggled={filterWithPpd}
              onToggle={this.onTogglePpd}
            />
          </div>
          <div className='col col-sm-2'>
            <Toggle
              label='Логические устройства'
              labelPosition='right'
              labelStyle={{ fontSize: 12 }}
              defaultToggled={showingTypes.indexOf('logical') !== -1}
              onToggle={this.onToggleLogical}
            />
          </div>
          <div className='col col-sm-2'>
            <Toggle
              label='Физические устройства'
              labelPosition='right'
              labelStyle={{ fontSize: 12 }}
              defaultToggled={showingTypes.indexOf('physical') !== -1}
              onToggle={this.onTogglePhysical}
            />
          </div>
          <div className='col col-sm-1'>
            <Toggle
              label='Merchant'
              labelPosition='right'
              labelStyle={{ fontSize: 12 }}
              defaultToggled={showingTypes.indexOf('merchant') !== -1}
              onToggle={this.onToggleMerchant}
            />
          </div>
          <div className='col col-sm-1'>
            <Toggle
              label='Account'
              labelPosition='right'
              labelStyle={{ fontSize: 12 }}
              defaultToggled={showingTypes.indexOf('account') !== -1}
              onToggle={this.onToggleAccount}
            />
          </div>
          <div className='col col-sm-2'>
            <Toggle
              label='Customer'
              labelPosition='right'
              labelStyle={{ fontSize: 12 }}
              defaultToggled={showingTypes.indexOf('customer') !== -1}
              onToggle={this.onToggleCustomer}
            />
          </div>
        </div>
        <div className='row'>
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
      </div>
    )
  }
}
export default Filters
