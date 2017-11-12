import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Workspace from '../components/Workspace'
import * as WorkspaceActions from '../actions/workspace'

function mapStateToProps (state) {
  return {
    data: state.devices.data
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(WorkspaceActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Workspace)
