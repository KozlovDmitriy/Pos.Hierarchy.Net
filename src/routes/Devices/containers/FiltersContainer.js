import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Filters from '../components/Filters'
import * as FilterActions from '../actions/filters'

function mapStateToProps (state) {
  return {
    filters: state.devices.filters
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(FilterActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters)
