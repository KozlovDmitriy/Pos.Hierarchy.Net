import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import NodePopover from '../components/NodePopover'
import * as WorkspaceActions from '../actions/workspace'

function mapStateToProps (state) {
  const data = state.devices.nodePopover.data
  return {
    isOpen: state.devices.nodePopover.isOpen,
    anchor: state.devices.nodePopover.anchor,
    node: data ? data.node : void 0,
    errors: data ? data.errors : [],
    warnings: data ? data.warnings : []
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(WorkspaceActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NodePopover)
