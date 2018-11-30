import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import FilterTextField from './FilterTextField'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import { withStyles } from '@material-ui/core/styles'
import { AppBarContextConsumer } from 'contexts/AppBarContext'
import AppBarFilters from '../containers/AppBarFiltersContainer'

const styles = theme => ({
  formControl: {
    marginTop: 9,
    width: '100%',
    padding: 0
  },
  select: {
    padding: 0
  },
  outlinedInput: {
    padding: 7
  },
  selectEmpty: {
    padding: 7,
  },
  // inputLabelRoot: { marginTop: -10 },
  inputMarginDense: { padding: 7 },
  inputLabelShrink: { marginTop: '0px !important' },
  inputLabelRoot: { marginTop: -13 }
})

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
    this.onGetWidgetContext = this.onGetWidgetContext.bind(this)
  }

  state = { labelWidth: 0, countryLabelWidth: 0 }

  componentDidMount () {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
      countryLabelWidth: ReactDOM.findDOMNode(this.CountryInputLabelRef).offsetWidth,
    })
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
    this.props.changeFilterWithPpd(event.target.checked)
  }

  appBarWidget = <AppBarFilters />

  onGetWidgetContext (contextData) {
    const { setWidget } = contextData
    setWidget(this.appBarWidget)
  }

  render () {
    const { filters, models, countries, classes } = this.props
    const selectedModel = models.find(m =>
      m.physicalDeviceTypeId === filters.physicalDeviceTypeId ||
      m.logicalDeviceTypeId === filters.logicalDeviceTypeId
    )
    const selectedModelName = selectedModel ? selectedModel.modelName : ''
    const selectedCountry = countries.find(c => c.id === filters.countryId)
    const selectedCountryName = selectedCountry ? selectedCountry.name : ''
    return (
      <div style={{ background: '#fcfcfc', marginRight: 0, marginLeft: 0, paddingLeft: 15, paddingRight: 15 }}>
        <AppBarContextConsumer>{this.onGetWidgetContext}</AppBarContextConsumer>
        <div className='row'>
          <div className='col col-xs-1'>
            <FormControl variant='outlined' id={'modelFilter'} classes={{ root: classes.formControl }}>
              <InputLabel
                ref={ref => { this.InputLabelRef = ref }}
                htmlFor='outlined-model-simple'
                classes={{ root: classes.inputLabelRoot, shrink: classes.inputLabelShrink }}
              >
                {'Модель'}
              </InputLabel>
              <Select
                classes={{
                  root: classes.select,
                  select: selectedModelName === '' ? classes.selectEmpty : classes.outlinedInput
                }}
                value={selectedModelName}
                onChange={this.onChangeModel}
                input={
                  <OutlinedInput
                    id='outlined-model-simple'
                    name='Модель'
                    labelWidth={this.state.labelWidth}
                  />
                }
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                { models.map((m, i) => <MenuItem value={m.modelName} key={i}>{m.modelName}</MenuItem>) }
              </Select>
            </FormControl>
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
            <FormControl variant='outlined' id={'countryFilter'} classes={{ root: classes.formControl }}>
              <InputLabel
                ref={ref => { this.CountryInputLabelRef = ref }}
                htmlFor='outlined-country-simple'
                classes={{ root: classes.inputLabelRoot, shrink: classes.inputLabelShrink }}
              >
                {'Страна'}
              </InputLabel>
              <Select
                classes={{
                  root: classes.select,
                  select: selectedCountryName === '' ? classes.selectEmpty : classes.outlinedInput
                }}
                value={selectedCountryName}
                onChange={this.onChangeCountry}
                input={
                  <OutlinedInput
                    id='outlined-country-simple'
                    name='Страна'
                    labelWidth={this.state.countryLabelWidth}
                  />
                }
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                { countries.map((c, i) => <MenuItem value={c.name} key={i}>{c.name}</MenuItem>) }
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
    )
  }
}

Filters.propTypes = {
  classes: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  models: PropTypes.array.isRequired,
  countries: PropTypes.array.isRequired,
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

export default withStyles(styles)(Filters)
