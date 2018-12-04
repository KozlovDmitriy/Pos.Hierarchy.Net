import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Address from '../../components/nodes/Address'
import * as workspaceActions from '../../actions/workspace'
import * as collapseActions from '../../actions/tree'

function mapStateToProps (state, ownProps) {
  return {
    errors: (state.events.errors || [])
      .filter(i => [i.addressId, i.customerAddressId].indexOf(ownProps.node.addressId) !== -1),
    warnings: (state.events.warnings || [])
      .filter(i => [i.addressId, i.customerAddressId].indexOf(ownProps.node.addressId) !== -1)
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ ...workspaceActions, ...collapseActions }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Address)
