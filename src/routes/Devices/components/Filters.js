import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import ShowingTypesSelectField from '../containers/ShowingTypesSelectFieldContainer'
import FilterTextField from './FilterTextField'

class Filters extends Component {
  constructor (props) {
    super(props)
    this.onChangeModel = this.onChangeModel.bind(this)
    this.onChangeTerminalID = this.onChangeTerminalID.bind(this)
    this.onChangeSerNum = this.onChangeSerNum.bind(this)
    this.onChangeMerchant = this.onChangeMerchant.bind(this)
    this.onChangeAccount = this.onChangeAccount.bind(this)
    this.onChangeCustomer = this.onChangeCustomer.bind(this)
    this.onChangeAddress = this.onChangeAddress.bind(this)
    this.onChangeCity = this.onChangeCity.bind(this)
    this.onChangeRegion = this.onChangeRegion.bind(this)
    this.onChangeCountry = this.onChangeCountry.bind(this)
    this.onTogglePpd = this.onTogglePpd.bind(this)
  }

  onChangeModel (event) {
    this.props.setmodelNameFilter(event.target.value)
  }

  onChangeTerminalID (event) {
    this.props.setterminalIdFilter(event.target.value)
  }

  onChangeSerNum (event) {
    this.props.setserialNumberFilter(event.target.value)
  }

  onChangeMerchant (event) {
    this.props.setMerchantFilter(event.target.value)
  }

  onChangeAccount (event) {
    this.props.setAccountFilter(event.target.value)
  }

  onChangeCustomer (event) {
    this.props.setCustomerFilter(event.target.value)
  }

  onChangeAddress (event) {
    this.props.setAddressFilter(event.target.value)
  }

  onChangeCity (event) {
    this.props.setCityFilter(event.target.value)
  }

  onChangeRegion (event) {
    this.props.setRegionFilter(event.target.value)
  }

  onChangeCountry (event) {
    this.props.setCountryFilter(event.target.value)
  }

  onTogglePpd (event) {
    this.props.changeFilterWithPpd(event.target.value)
  }

  render () {
    const { filters, filterWithPpd } = this.props
    return (
      <div style={{ background: '#fcfcfc', marginRight: -15, marginLeft: -15, paddingLeft: 15, paddingRight: 15 }}>
        <div className='row' style={{ marginTop: 30, marginBottom: -20 }}>
          <div className='col col-sm-2'>
            <FormControlLabel
              control={
                <Switch
                  checked={filterWithPpd}
                  onChange={this.onTogglePpd}
                />
              }
              label='Фильтр по связанным ФУ'
            />
          </div>
          <div className='col col-sm-10'>
            <FormControlLabel
              style={{ marginTop: 8 }}
              control={<ShowingTypesSelectField />}
              label='Отображаемые классы'
              labelPlacement='start'
            />
          </div>
        </div>
        <div className='row'>
          <div className='col col-xs-1'>
            <FilterTextField
              id={'modelFilter'}
              label={'Модель'}
              value={filters.modelName}
              onChange={this.onChangeModel}
            />
          </div>
          <div className='col col-xs-1'>
            <FilterTextField
              id={'terminalIdFilter'}
              label={'Terminal ID'}
              value={filters.terminalId}
              onChange={this.onChangeTerminalID}
            />
          </div>
          <div className='col col-xs-1'>
            <FilterTextField
              id={'modelFilter'}
              label={'Serial Number'}
              value={filters.serialNumber}
              onChange={this.onChangeSerNum}
            />
          </div>
          <div className='col col-xs-1'>
            <FilterTextField
              id={'modelFilter'}
              label={'Merchant'}
              value={filters.merchant}
              onChange={this.onChangeMerchant}
            />
          </div>
          <div className='col col-xs-1'>
            <FilterTextField
              id={'accountFilter'}
              label={'Account'}
              value={filters.account}
              onChange={this.onChangeAccount}
            />
          </div>
          <div className='col col-xs-1'>
            <FilterTextField
              id={'customerFilter'}
              label={'Customer'}
              value={filters.customer}
              onChange={this.onChangeCustomer}
            />
          </div>
          <div className='col col-xs-1'>
            <FilterTextField
              id={'addressFilter'}
              label={'Адрес'}
              value={filters.address}
              onChange={this.onChangeAddress}
            />
          </div>
          <div className='col col-xs-1'>
            <FilterTextField
              id={'cityFilter'}
              label={'Город'}
              value={filters.city}
              onChange={this.onChangeCity}
            />
          </div>
          <div className='col col-xs-1'>
            <FilterTextField
              id={'regionFilter'}
              label={'Регион'}
              value={filters.region}
              onChange={this.onChangeRegion}
            />
          </div>
          <div className='col col-xs-1'>
            <FilterTextField
              id={'countryFilter'}
              label={'Страна'}
              value={filters.country}
              onChange={this.onChangeCountry}
            />
          </div>
        </div>
      </div>
    )
  }
}

Filters.propTypes = {
  filterWithPpd: PropTypes.bool.isRequired,
  filters: PropTypes.object.isRequired,
  setmodelNameFilter: PropTypes.func.isRequired,
  setterminalIdFilter: PropTypes.func.isRequired,
  setserialNumberFilter: PropTypes.func.isRequired,
  setMerchantFilter: PropTypes.func.isRequired,
  setAccountFilter: PropTypes.func.isRequired,
  setCustomerFilter: PropTypes.func.isRequired,
  setAddressFilter: PropTypes.func.isRequired,
  setCityFilter: PropTypes.func.isRequired,
  setRegionFilter: PropTypes.func.isRequired,
  setCountryFilter: PropTypes.func.isRequired,
  changeFilterWithPpd: PropTypes.func.isRequired
}

export default Filters
