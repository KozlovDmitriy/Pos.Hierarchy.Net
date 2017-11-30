import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Customer from '../../components/nodes/Customer'
import * as WorkspaceActions from '../../actions/workspace'

function mapStateToProps (state) {
  return { }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(WorkspaceActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Customer)
