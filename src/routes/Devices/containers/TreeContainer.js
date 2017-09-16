import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Tree from '../components/Tree'
import * as WorkspaceActions from '../actions/workspace'

function mapStateToProps (state) {
  return {
    tree: state.devices.tree
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(WorkspaceActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Tree)
