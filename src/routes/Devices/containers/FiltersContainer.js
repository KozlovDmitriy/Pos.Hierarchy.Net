import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Filters from '../components/Filters'
import * as FilterActions from '../actions/filters'

function mapStateToProps (state) {
  return {
    filterWithPpd: state.devices.filterWithPpd,
    filters: state.devices.filters,
    models: state.devices.models,
    countries: state.devices.countries
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(FilterActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters)
