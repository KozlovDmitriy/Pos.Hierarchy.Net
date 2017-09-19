import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import NodePopover from '../components/NodePopover'
import * as WorkspaceActions from '../actions/workspace'

function mapStateToProps (state) {
  return {
    isOpen: state.devices.nodePopover.isOpen,
    anchor: state.devices.nodePopover.anchor,
    data: state.devices.nodePopover.data
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(WorkspaceActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NodePopover)
