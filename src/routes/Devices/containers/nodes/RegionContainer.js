import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Region from '../../components/nodes/Region'
import * as workspaceActions from '../../actions/workspace'
import * as collapseActions from '../../actions/tree'

function mapStateToProps (state, ownProps) {
  return {
    errors: (state.events.errors || [])
      .filter(i => i.regionId === ownProps.node.regionId),
      // .filter(i => [i.regionId, i.customerRegionId].indexOf(ownProps.node.regionId) !== -1),
    warnings: (state.events.warnings || [])
      .filter(i => i.regionId === ownProps.node.regionId)
      // .filter(i => [i.regionId, i.customerRegionId].indexOf(ownProps.node.regionId) !== -1)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ ...workspaceActions, ...collapseActions }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Region)
