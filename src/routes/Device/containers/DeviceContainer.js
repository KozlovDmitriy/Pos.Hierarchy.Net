import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Device from '../components/Device'
import * as DeviceActions from '../actions/device'
import * as EventActions from 'src/actions/events'

function mapStateToProps (state, ownProps) {
  return {
    deviceId: state.device.deviceId,
    data: state.device.data
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ ...DeviceActions, ...EventActions }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Device)
