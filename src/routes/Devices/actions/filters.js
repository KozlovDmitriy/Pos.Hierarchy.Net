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
      dispatch(setShowingTypes([...showingTypes, type]))
    } else {
      dispatch(setShowingTypes(
        showingTypes.filter(i => i !== type)
      ))
    }
    dispatch(filterData())
  }
}

export function filterData () {
  return (dispatch, getState) => {
    const { filters, data, showingTypes, filterWithPpd } = getState().devices
    const ids = getFilteredData(filters, data, showingTypes, filterWithPpd)
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

export function setmodelNameFilter (value) {
  return (dispatch, getState) => {
    const { filters } = getState().devices
    dispatch(setFilters({ ...filters, modelName: value }))
    dispatch(filterData())
  }
}

export function setterminalIdFilter (value) {
  return (dispatch, getState) => {
    const { filters } = getState().devices
    dispatch(setFilters({ ...filters, terminalId: value }))
    dispatch(filterData())
  }
}

export function setserialNumberFilter (value) {
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

export function setAccountFilter (value) {
  return (dispatch, getState) => {
    const { filters } = getState().devices
    dispatch(setFilters({ ...filters, account: value }))
    dispatch(filterData())
  }
}

export function setCustomerFilter (value) {
  return (dispatch, getState) => {
    const { filters } = getState().devices
    dispatch(setFilters({ ...filters, customer: value }))
    dispatch(filterData())
  }
}

export function setAddressFilter (value) {
  return (dispatch, getState) => {
    const { filters } = getState().devices
    dispatch(setFilters({ ...filters, address: value }))
    dispatch(filterData())
  }
}

export function setCityFilter (value) {
  return (dispatch, getState) => {
    const { filters } = getState().devices
    dispatch(setFilters({ ...filters, city: value }))
    dispatch(filterData())
  }
}

export function setRegionFilter (value) {
  return (dispatch, getState) => {
    const { filters } = getState().devices
    dispatch(setFilters({ ...filters, region: value }))
    dispatch(filterData())
  }
}

export function setCountryFilter (value) {
  return (dispatch, getState) => {
    const { filters } = getState().devices
    dispatch(setFilters({ ...filters, country: value }))
    dispatch(filterData())
  }
}
