import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ShowingTypesSelectField from '../components/ShowingTypesSelectField'
import * as FilterActions from '../actions/filters'

function mapStateToProps (state) {
  return {
    showingTypes: state.devices.showingTypes
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(FilterActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowingTypesSelectField)
