import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import LinkPrimitive from '../components/LinkPrimitive'

function mapStateToProps (state, ownProps) {
  return {
    link: ownProps.link,
    errors: state.events.errors || [],
    warnings: state.events.warnings || []
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkPrimitive)
