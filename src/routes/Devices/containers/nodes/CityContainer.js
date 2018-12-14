import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import City from '../../components/nodes/City'
import * as workspaceActions from '../../actions/workspace'
import * as collapseActions from '../../actions/tree'

function mapStateToProps (state, ownProps) {
  return {
    errors: (state.events.errors || [])
      .filter(i => i.cityId === ownProps.node.cityId),
      // .filter(i => [i.cityId, i.customerCityId].indexOf(ownProps.node.cityId) !== -1),
    warnings: (state.events.warnings || [])
      .filter(i => i.cityId === ownProps.node.cityId)
      // .filter(i => [i.cityId, i.customerCityId].indexOf(ownProps.node.cityId) !== -1)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ ...workspaceActions, ...collapseActions }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(City)
