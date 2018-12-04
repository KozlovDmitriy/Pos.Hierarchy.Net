import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PhysicalDevice from '../../components/nodes/PhysicalDevice'
import * as workspaceActions from '../../actions/workspace'
import * as collapseActions from '../../actions/tree'

function mapStateToProps (state, ownProps) {
  return {
    errors: (state.events.errors || [])
      .filter(i => i.physicalDeviceId === ownProps.node.deviceId),
    warnings: (state.events.warnings || [])
      .filter(i => i.physicalDeviceId === ownProps.node.deviceId)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ ...workspaceActions, ...collapseActions }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PhysicalDevice)
