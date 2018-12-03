import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Country from '../../components/nodes/Country'
import * as workspaceActions from '../../actions/workspace'
import * as collapseActions from '../../actions/tree'

function mapStateToProps (state, ownProps) {
  return {
    errors: (state.errors.errors || [])
      .filter(i => i.countryId === ownProps.node.countryId)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ ...workspaceActions, ...collapseActions }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Country)
