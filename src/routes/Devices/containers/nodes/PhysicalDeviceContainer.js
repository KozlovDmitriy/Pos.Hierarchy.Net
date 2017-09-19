import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PhysicalDevice from '../../components/nodes/PhysicalDevice'
import * as WorkspaceActions from '../../actions/workspace'

function mapStateToProps (state) {
  return { }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(WorkspaceActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PhysicalDevice)
