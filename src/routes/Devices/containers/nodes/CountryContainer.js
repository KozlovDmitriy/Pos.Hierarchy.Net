import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Country from '../../components/nodes/Country'
import * as workspaceActions from '../../actions/workspace'
import * as collapseActions from '../../actions/tree'

function mapStateToProps (state, ownProps) {
  return {
    errors: (state.events.errors || [])
      .filter(i => i.countryId === ownProps.node.countryId),
      // .filter(i => [i.countryId, i.customerCountryId].indexOf(ownProps.node.countryId) !== -1),
    warnings: (state.events.warnings || [])
      .filter(i => i.countryId === ownProps.node.countryId)
      // .filter(i => [i.countryId, i.customerCountryId].indexOf(ownProps.node.countryId) !== -1)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ ...workspaceActions, ...collapseActions }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Country)
