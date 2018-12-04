import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Dashboard from '../components/Dashboard'
import * as EventActions from 'src/actions/events'

function mapStateToProps (state) {
  return {
    errors: state.events.errors
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(EventActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
