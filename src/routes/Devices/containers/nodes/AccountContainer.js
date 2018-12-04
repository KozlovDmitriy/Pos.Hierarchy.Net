import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Account from '../../components/nodes/Account'
import * as workspaceActions from '../../actions/workspace'
import * as collapseActions from '../../actions/tree'

function mapStateToProps (state, ownProps) {
  return {
    errors: (state.events.errors || [])
      .filter(i => i.accountId === ownProps.node.accountId),
    warnings: (state.events.warnings || [])
      .filter(i => i.accountId === ownProps.node.accountId)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ ...workspaceActions, ...collapseActions }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Account)
