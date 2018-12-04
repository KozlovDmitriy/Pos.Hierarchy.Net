import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ErrorList from '../components/ErrorList'

function mapStateToProps (state) {
  return {
    data: state.events.errors
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorList)
