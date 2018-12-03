import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Region from '../../components/nodes/Region'
import * as workspaceActions from '../../actions/workspace'
import * as collapseActions from '../../actions/tree'

function mapStateToProps (state, ownProps) {
  return {
    errors: (state.errors.errors || [])
      .filter(i => i.regionId === ownProps.node.regionId)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ ...workspaceActions, ...collapseActions }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Region)
