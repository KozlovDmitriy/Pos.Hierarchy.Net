import { filterData } from './filters'

export const SET_DEVICES = 'SET_DEVICES'
export const SET_TREE = 'SET_TREE'

export function setDevices (devices) {
  return { type: SET_DEVICES, devices }
}

export function setTree (tree) {
  return { type: SET_TREE, tree }
}

const cloneArray = (arr) => arr.map(i => { return { ...i } })
const isArrContains = (node, arr) => arr.find(i => i === node) !== void 0

const getPdByLd = (node, data) =>
  data.find(i => i.deviceId === node.PhysicalDeviceId)

const getMerchantByLd = (node, data) =>
  data.find(i => i.numberX === node.MerchantNumberX)

const getAccountByMerchant = (node, data) =>
  data.find(i => i.numberX === node.accountNumberX)

const getCustomerByAccount = (node, data) =>
  data.find(i => i.numberX === node.customerNumberX)

const distinctLinks = (arr) => {
  const getId = (link) => `${link.source.id},${link.target.id}`
  const ids = arr.map(i => getId(i))
  return arr.filter((i, index) => ids.indexOf(getId(i)) === index)
}

export function rewriteTree () {
  return (dispatch, getState) => {
    const { data, filteredData, showingTypes } = getState().devices
    const filtered = data.filter(d => filteredData.indexOf(d.id) !== -1)
    const ldNodes = cloneArray(filtered.filter(d => d.type === 'logical'))
      .map(i => ({ ...i, name: i.TerminalId }))
    const pdNodes = cloneArray(filtered.filter(d => d.type === 'physical'))
      .map(i => ({ ...i, name: i.SerialNumber }))
    const merchantNodes = cloneArray(filtered.filter(d => d.type === 'merchant'))
    const accountNodes = cloneArray(filtered.filter(d => d.type === 'account'))
    const customerNodes = cloneArray(filtered.filter(d => d.type === 'customer'))

    const pdPdLinks = isArrContains('physical', showingTypes) ?
      pdNodes.filter(
        i => i.parentId !== void 0 && pdNodes.find(j => j.deviceId === i.parentId) !== void 0
      ).map((d, i) => {
        const parent = pdNodes.find(i => i.deviceId === d.parentId)
        if (parent.parentId === void 0) {
          parent.main = true
        }
        return {
          source: parent,
          target: d,
          type: 'ppd',
          id: i
        }
      }) : []

    const pdLinks = isArrContains('physical', showingTypes) ?
      isArrContains('logical', showingTypes) ?
        ldNodes.map((d, i) => {
          return {
            source: getPdByLd(d, pdNodes),
            target: d,
            id: i
          }
        }) :
      isArrContains('merchant', showingTypes) ?
        ldNodes.map((d, i) => {
          const pd = getPdByLd(d, pdNodes)
          return {
            source: getMerchantByLd(d, merchantNodes),
            target: pd,
            id: i
          }
        }) :
      isArrContains('account', showingTypes) ?
        ldNodes.map((d, i) => {
          const pd = getPdByLd(d, pdNodes)
          return {
            source: getAccountByMerchant(
              getMerchantByLd(d, merchantNodes),
              accountNodes
            ),
            target: pd,
            id: i
          }
        }) :
      isArrContains('customer', showingTypes) ?
        ldNodes.map((d, i) => {
          const pd = getPdByLd(d, pdNodes)
          return {
            source: getCustomerByAccount(
              getAccountByMerchant(
                getMerchantByLd(d, merchantNodes),
                accountNodes
              ),
              customerNodes
            ),
            target: pd,
            id: i
          }
        }) :
      [] :
    []

    const ldLinks = isArrContains('logical', showingTypes) ?
      isArrContains('merchant', showingTypes) ?
        ldNodes.map((d, i) => {
          return {
            source: getMerchantByLd(d, merchantNodes),
            target: d,
            id: i
          }
        }) :
      isArrContains('account', showingTypes) ?
        ldNodes.map((d, i) => {
          return {
            source: getAccountByMerchant(
              getMerchantByLd(d, merchantNodes),
              accountNodes
            ),
            target: d,
            id: i
          }
        }) :
      isArrContains('customer', showingTypes) ?
        ldNodes.map((d, i) => {
          return {
            source: getCustomerByAccount(
              getAccountByMerchant(
                getMerchantByLd(d, merchantNodes),
                accountNodes
              ),
              customerNodes
            ),
            target: d,
            id: i
          }
        }) :
      [] :
    []

    const merchantLinks = isArrContains('merchant', showingTypes) ?
      isArrContains('account', showingTypes) ?
        merchantNodes.map((m, i) => {
          return {
            source: getAccountByMerchant(m, accountNodes),
            target: m,
            id: i
          }
        }) :
      isArrContains('customer', showingTypes) ?
        merchantNodes.map((m, i) => {
          return {
            source: getCustomerByAccount(
              getAccountByMerchant(m, accountNodes), customerNodes
            ),
            target: m,
            id: i
          }
        }) :
      [] :
    []

    const accountLinks = showingTypes.filter(i => i === 'account' || i === 'customer').length === 2 ?
      accountNodes.map((m, i) => {
        return {
          source: getCustomerByAccount(m, customerNodes),
          target: m,
          id: i
        }
      }) : []

    const nodes = [
      ...pdNodes, ...ldNodes, ...merchantNodes, ...accountNodes, ...customerNodes
    ].filter(i => showingTypes.indexOf(i.type) !== -1)
    const links = [ ...distinctLinks(pdLinks), ...pdPdLinks, ...ldLinks, ...merchantLinks, ...accountLinks ]
    const tree = { nodes, links }
  	dispatch(setTree(tree))
  }
}

export function changeDeviceData (data) {
  return (dispatch) => {
    dispatch(setDevices(data))
    dispatch(filterData())
  }
}
