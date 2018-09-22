import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Merchant from '../../components/nodes/Merchant'
import * as WorkspaceActions from '../../actions/workspace'

function mapStateToProps (state, ownProps) {
  return {
    errors: []
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(WorkspaceActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Merchant)
