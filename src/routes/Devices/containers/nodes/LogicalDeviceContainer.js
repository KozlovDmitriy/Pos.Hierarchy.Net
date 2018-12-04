import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import LogicalDevice from '../../components/nodes/LogicalDevice'
import * as workspaceActions from '../../actions/workspace'
import * as collapseActions from '../../actions/tree'

function mapStateToProps (state, ownProps) {
  return {
    errors: (state.events.errors || [])
      .filter(i => i.logicalDeviceId === ownProps.node.deviceId),
    warnings: (state.events.warnings || [])
      .filter(i => i.logicalDeviceId === ownProps.node.deviceId)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ ...workspaceActions, ...collapseActions }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LogicalDevice)
