import { rewriteTree } from './workspace'

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

const getPdByLd = (ld, data) =>
  data.find(d => d.deviceId === ld.PhysicalDeviceId)

const getLdsByMerchant = (merchant, data) =>
  data.filter(d => d.MerchantNumberX === merchant.numberX)

const getLdsByPd = (pd, data) =>
  data.filter(d => d.PhysicalDeviceId === pd.deviceId)

const getMerchantByLd = (ld, data) =>
  data.find(d => d.numberX === ld.MerchantNumberX)

const getMerchantsByAccount = (account, data) =>
  data.filter(n => n.type === 'merchant' && n.accountNumberX === account.numberX)

const getPdsByMerchant = (merchant, data) =>
  getLdsByMerchant(merchant, data).map(d => getPdByLd(d, data))

const arrReduce = (arr) =>
  arr.reduce((x, y) => [ ...x, ...y ], [])

const getPdsByAccount = (account, data) =>
  arrReduce(
    getMerchantsByAccount(account, data)
      .map(m => getPdsByMerchant(m, data))
  )

const getLdsByAccount = (account, data) =>
  arrReduce(
    getMerchantsByAccount(account, data)
      .map(m => getLdsByMerchant(m, data))
  )

const getAccountsByCustomer = (customer, data) =>
  data.filter(i => i.type === 'account' && i.customerNumberX === customer.numberX)

const getPdsByCustomer = (customer, data) =>
  arrReduce(
    getAccountsByCustomer(customer, data)
      .map(i => getPdsByAccount(i, data))
  )

const getLdsByCustomer = (account, data) =>
  arrReduce(
    getAccountsByCustomer(account, data)
      .map(i => getLdsByAccount(i, data))
  )

const getMerchantsByCustomer = (customer, data) =>
  arrReduce(
    getAccountsByCustomer(customer, data)
      .map(i => getMerchantsByAccount(i, data))
  )

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

const getPpdConnectedDevices = (node, data) =>
  [ ...getPpdParentDevices(node, data), node, ...getPpdChildDevices(node, data) ]

const getPdByLdWithPpd = (node, data, filterWithPpd) =>
  filterWithPpd ?
    getPpdConnectedDevices(getPdByLd(node, data), data) :
    [ getPdByLd(node, data) ]

const filterDataByModelName = (data, node, modelName, filterWithPpd) =>
  modelName === void 0 || modelName === '' ? true : (
    node.type === 'physical' ? (filterWithPpd ? getPpdConnectedDevices(node, data) : [ node ]) :
    node.type === 'logical' ? getPdByLdWithPpd(node, data, filterWithPpd) :
    node.type === 'merchant' ? getPdsByMerchant(node, data) :
    node.type === 'account' ? getPdsByAccount(node, data) :
    node.type === 'customer' ? getPdsByCustomer(node, data) :
    []
  ).find(i => i.ModelName.toLowerCase().includes(modelName)) !== void 0

const filterDataByTerminalId = (data, node, terminalId) =>
  terminalId === void 0 || terminalId === '' ? true : (
    node.type === 'logical' ? [ node ] :
    node.type === 'physical' ? getLdsByPd(node, data) :
    node.type === 'merchant' ? getLdsByMerchant(node, data) :
    node.type === 'account' ? getLdsByAccount(node, data) :
    node.type === 'customer' ? getLdsByCustomer(node, data) :
    []
  ).find(i => i.TerminalId.toLowerCase().includes(terminalId)) !== void 0

const filterDataBySerialNumber = (data, node, serialNumber, filterWithPpd) =>
  serialNumber === void 0 || serialNumber === '' ? true : (
    node.type === 'physical' ? (filterWithPpd ? getPpdConnectedDevices(node, data) : [ node ]) :
    node.type === 'logical' ? getPdByLdWithPpd(node, data, filterWithPpd) :
    node.type === 'merchant' ? getPdsByMerchant(node, data) :
    node.type === 'account' ? getPdsByAccount(node, data) :
    node.type === 'customer' ? getPdsByCustomer(node, data) :
    []
  ).find(d => d.SerialNumber.toLowerCase().includes(serialNumber))

const filterDataByMerchant = (data, node, merchant, filterWithPpd) =>
  merchant === void 0 || merchant === '' ? true : (
    node.type === 'merchant' ? [ node ] :
    node.type === 'logical' ? [ getMerchantByLd(node, data) ] :
    node.type === 'physical' ? getLdsByPd(node, data).map(d => getMerchantByLd(d, data)) :
    node.type === 'account' ? getMerchantsByAccount(node, data) :
    node.type === 'customer' ? getMerchantsByCustomer(node, data) :
    []
  ).find(i => i.name.toLowerCase().includes(merchant)) !== void 0

export function filterData () {
  return (dispatch, getState) => {
    const { filters, data, filterWithPpd } = getState().devices
    const ids = data.filter(
        d => ['logical', 'physical', 'merchant', 'account', 'customer'].indexOf(d.type) !== -1
      ).filter(
        d => filterDataByModelName(data, d, filters.modelName.toLowerCase(), filterWithPpd) &&
          filterDataByTerminalId(data, d, filters.terminalId.toLowerCase(), filterWithPpd) &&
          filterDataBySerialNumber(data, d, filters.serialNumber.toLowerCase(), filterWithPpd) &&
          filterDataByMerchant(data, d, filters.merchant.toLowerCase(), filterWithPpd)
      ).map(d => d.id)
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
