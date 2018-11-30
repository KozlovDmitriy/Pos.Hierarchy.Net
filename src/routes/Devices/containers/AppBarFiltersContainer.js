import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AppBarFilters from '../components/AppBarFilters'
import * as FilterActions from '../actions/filters'

function mapStateToProps (state) {
  return {
    filterWithPpd: state.devices.filterWithPpd
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(FilterActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AppBarFilters)
