import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Customer from '../../components/nodes/Customer'
import * as workspaceActions from '../../actions/workspace'
import * as collapseActions from '../../actions/tree'

function mapStateToProps (state, ownProps) {
  return {
    errors: (state.events.errors || [])
      .filter(i => i.customerId === ownProps.node.customerId),
    warnings: (state.events.warnings || [])
      .filter(i => i.customerId === ownProps.node.customerId)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ ...workspaceActions, ...collapseActions }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Customer)
