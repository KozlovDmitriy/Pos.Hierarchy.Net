import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import TradePoint from '../../components/nodes/TradePoint'
import * as workspaceActions from '../../actions/workspace'
import * as collapseActions from '../../actions/tree'

function mapStateToProps (state, ownProps) {
  return {
    errors: (state.errors.errors || [])
      .filter(i => i.tradePointId === ownProps.node.tradePointId)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ ...workspaceActions, ...collapseActions }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TradePoint)
