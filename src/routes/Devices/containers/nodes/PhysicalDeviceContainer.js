import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PhysicalDevice from '../../components/nodes/PhysicalDevice'
import * as WorkspaceActions from '../../actions/workspace'

function mapStateToProps (state, ownProps) {
  return {
    errors: state.errors.errors.filter(i => ('' + i.deviceId) === ('' + ownProps.node.deviceId))
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(WorkspaceActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PhysicalDevice)
