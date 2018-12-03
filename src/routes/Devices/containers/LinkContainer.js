import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import LinkPrimitive from '../components/LinkPrimitive'

function mapStateToProps (state, ownProps) {
  return {
    link: ownProps.link,
    errors: state.errors.errors || []
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkPrimitive)
