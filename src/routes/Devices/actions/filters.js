import { rewriteTree } from './workspace'

export const SET_FILTERS = 'SET_FILTERS'
export const SET_MODEL_NAME_FILTER = 'SET_MODEL_NAME_FILTER'
export const SET_FILTERED_DATA = 'SET_FILTERED_DATA'
export const SET_TERMINAL_ID_FILTER = 'SET_TERMINAL_ID_FILTER'
export const SET_SERIAL_NUMBER_FILTER = 'SET_SERIAL_NUMBER_FILTER'
export const SET_MERCHANT_FILTER = 'SET_MERCHANT_FILTER'

export function setFilters (filters) {
  return { type: SET_FILTERS, filters }
}

export function setFilteredData (ids) {
  return { type: SET_FILTERED_DATA, ids }
}

const filterDataByModelName = (data, device, modelName) =>
  (device.type === 'physical' ? device : data.find(d => d.id === device.PhysicalDeviceId))
    .ModelName.toLowerCase().includes(modelName)

const filterDataByTerminalId = (data, device, terminalId) =>
  (device.type === 'logical' ? [ device ] : data.filter(d => d.PhysicalDeviceId === device.id))
    .find(i => i.TerminalId.toLowerCase().includes(terminalId)) !== void 0

const filterDataBySerialNumber = (data, device, serialNumber) =>
  (device.type === 'physical' ? device : data.find(d => d.id === device.PhysicalDeviceId))
    .SerialNumber.toLowerCase().includes(serialNumber)

const filterDataByMerchant = (data, device, merchant) =>
  (device.type === 'logical' ? [device] : data.filter(d => d.PhysicalDeviceId === device.id))
    .find(i => i.MerchantNumberX.toLowerCase().includes(merchant)) !== void 0

export function filterData () {
  return (dispatch, getState) => {
    const { filters, data } = getState().devices
    const ids = data.filter(
        d => ['logical', 'physical'].indexOf(d.type) !== -1
      ).filter(
        d => filterDataByModelName(data, d, filters.modelName.toLowerCase()) &&
          filterDataByTerminalId(data, d, filters.terminalId.toLowerCase()) &&
          filterDataBySerialNumber(data, d, filters.serialNumber.toLowerCase()) &&
          filterDataByMerchant(data, d, filters.merchant.toLowerCase())
      ).map(d => d.id)
    dispatch(setFilteredData(ids))
    dispatch(rewriteTree())
  }
}

export function setModelNameFilter (value) {
  return (dispatch, getState) => {
    const { filters } = getState().devices
    dispatch(setFilters({ ...filters, modelName: value }))
    dispatch(filterData())
  }
}

export function setTerminalIdFilter (value) {
  return (dispatch, getState) => {
    const { filters } = getState().devices
    dispatch(setFilters({ ...filters, terminalId: value }))
    dispatch(filterData())
  }
}

export function setSerialNumberFilter (value) {
  return (dispatch, getState) => {
    const { filters } = getState().devices
    dispatch(setFilters({ ...filters, serialNumber: value }))
    dispatch(filterData())
  }
}

export function setMerchantFilter (value) {
  return (dispatch, getState) => {
    const { filters } = getState().devices
    dispatch(setFilters({ ...filters, merchant: value }))
    dispatch(filterData())
  }
}
