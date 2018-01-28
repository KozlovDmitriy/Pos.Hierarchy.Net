import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Workspace from '../components/Workspace'
import * as WorkspaceActions from '../actions/workspace'
import * as EventActions from 'src/actions/events'

function mapStateToProps (state) {
  return {
    data: state.devices.data
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ ...WorkspaceActions, ...EventActions }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Workspace)
