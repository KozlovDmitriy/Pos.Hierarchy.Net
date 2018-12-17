import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Tree from '../components/Tree'
import * as WorkspaceActions from '../actions/workspace'
import * as FilterActions from '../actions/filters'

function mapStateToProps (state, ownProps) {
  return {
    tree: state.devices.tree,
    animation: state.devices.animation,
    boardStyle: ownProps.boardStyle,
    lastCollapsedEntity: state.devices.lastCollapsedEntity
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ ...WorkspaceActions, ...FilterActions }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Tree)
