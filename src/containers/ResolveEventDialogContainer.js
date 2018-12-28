import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ResolveEventDialog from '../components/ResolveEventDialog'
import * as EventActions from 'src/actions/events'

function mapStateToProps (state, ownProps) {
  return {
    event: ownProps.event,
    open: ownProps.open,
    onClose: ownProps.onClose
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(EventActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ResolveEventDialog)
