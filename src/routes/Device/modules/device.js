import {
  SET_DEVICE_DATA
} from '../actions/device'

const initialState = {
  deviceId: null,
  data: null
}

export default function device (state = initialState, action) {
  switch (action.type) {
    case SET_DEVICE_DATA:
      return {
        ...state,
        deviceId: action.deviceId,
        data: action.data
      }
    default: return state
  }
}
