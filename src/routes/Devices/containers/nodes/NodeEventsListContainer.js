import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import NodeEventsList from '../../components/nodes/NodeEventsList'
import * as WorkspaceActions from '../../actions/workspace'
import * as FilterActions from '../../actions/filters'

function mapStateToProps (state, ownProps) {
  return {
    errors: ownProps.errors,
    warnings: ownProps.warnings
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ ...WorkspaceActions, ...FilterActions }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NodeEventsList)
