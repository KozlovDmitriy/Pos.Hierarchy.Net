import { runQuery } from 'src/actions/tmswebapi'

export const SET_DEVICE_DATA = 'SET_DEVICE_DATA'

export function setDeviceData (id, data) {
  return { type: SET_DEVICE_DATA, deviceId: id, data }
}

export function setDeviceId (id) {
  return (dispatch, getState) => {
    const query = {
      $type: 'Techno.Tms.Models.CQRS.ReadModel.Devices.Logical.GetLogicalDeviceDetailsDataQuery, Techno.Tms.Models',
      DeviceId: id
    }
    dispatch(
      runQuery(
        query,
        (readyState, status) => {
          if (readyState === 4 && status !== 200) {
            console.error('Device data loading failed')
          }
        },
        (data) => {
          if (data.IsSuccess && data.Result) {
            const deviceData = data.Result
            dispatch(setDeviceData(id, deviceData))
          } else {
            console.error('Device data loading failed')
          }
        }
      )
    )
  }
}
