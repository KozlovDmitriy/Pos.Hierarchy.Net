import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Merchant from '../../components/nodes/Merchant'
import * as workspaceActions from '../../actions/workspace'
import * as collapseActions from '../../actions/tree'

function mapStateToProps (state, ownProps) {
  return {
    errors: (state.events.errors || [])
      .filter(i => i.merchantId === ownProps.node.merchantId),
    warnings: (state.events.warnings || [])
      .filter(i => i.merchantId === ownProps.node.merchantId)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ ...workspaceActions, ...collapseActions }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Merchant)
