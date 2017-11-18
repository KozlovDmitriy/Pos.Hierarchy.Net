import { rewriteTree } from './workspace'
import { getFilteredData } from './connections'

export const SET_FILTERS = 'SET_FILTERS'
export const SET_MODEL_NAME_FILTER = 'SET_MODEL_NAME_FILTER'
export const SET_FILTERED_DATA = 'SET_FILTERED_DATA'
export const SET_TERMINAL_ID_FILTER = 'SET_TERMINAL_ID_FILTER'
export const SET_SERIAL_NUMBER_FILTER = 'SET_SERIAL_NUMBER_FILTER'
export const SET_MERCHANT_FILTER = 'SET_MERCHANT_FILTER'
export const SET_SHOWING_TYPES = 'SET_SHOWING_TYPES'
export const SET_FILTER_WITH_PPD = 'SET_FILTER_WITH_PPD'

export function setFilterWithPpd (flag) {
  return { type: SET_FILTER_WITH_PPD, flag }
}

export function setFilters (filters) {
  return { type: SET_FILTERS, filters }
}

export function setFilteredData (ids) {
  return { type: SET_FILTERED_DATA, ids }
}

export function setShowingTypes (types) {
  return { type: SET_SHOWING_TYPES, types }
}

export function toggleShowingType (type) {
  return (dispatch, getState) => {
    const { showingTypes } = getState().devices
    if (showingTypes.indexOf(type) === -1) {
      dispatch(setShowingTypes(
        [...showingTypes, type]
      ))
    } else {
      dispatch(setShowingTypes(
        showingTypes.filter(i => i !== type)
      ))
    }
    dispatch(filterData())
  }
}

const getPpdParentDevices = (node, data) => {
  if (node.parentId === void 0) {
    return []
  }
  var parent = data.find(i => node.parentId === i.deviceId)
  if (parent === void 0) {
    return []
  } else {
    return [parent, ...getPpdParentDevices(parent, data)]
  }
}

const getPpdChildDevices = (node, data) => {
  var child = data.find(i => i.parentId === node.deviceId)
  if (child === void 0) {
    return []
  } else {
    return [child, ...getPpdChildDevices(child, data)]
  }
}

export function filterData () {
  return (dispatch, getState) => {
    const { filters, data, filterWithPpd } = getState().devices
    const ids = getFilteredData(filters, data, filterWithPpd)
    dispatch(setFilteredData(ids))
    dispatch(rewriteTree())
  }
}

export function changeFilterWithPpd (flag) {
  return (dispatch) => {
    dispatch(setFilterWithPpd(flag))
    dispatch(filterData())
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
