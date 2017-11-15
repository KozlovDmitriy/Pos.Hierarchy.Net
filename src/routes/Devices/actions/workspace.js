import { filterData } from './filters'

export const SET_DEVICES = 'SET_DEVICES'
export const SET_TREE = 'SET_TREE'
export const SET_POPOVER_IS_OPEN = 'SET_POPOVER_IS_OPEN'

export function setDevices (devices) {
  return { type: SET_DEVICES, devices }
}

export function setTree (tree) {
  return { type: SET_TREE, tree }
}

export function setPopoverIsOpen (isOpen, anchor, data) {
  return isOpen ?
    { type: SET_POPOVER_IS_OPEN, isOpen, anchor, data } :
    { type: SET_POPOVER_IS_OPEN, isOpen: false, anchor: void 0, data: void 0 }
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
    const filtered = cloneArray(data.filter(d => filteredData.indexOf(d.id) !== -1))
    const ldNodes = filtered.filter(d => d.type === 'logical')
    const pdNodes = filtered.filter(d => d.type === 'physical')
    const merchantNodes = filtered.filter(d => d.type === 'merchant')
    const accountNodes = filtered.filter(d => d.type === 'account')
    const customerNodes = filtered.filter(d => d.type === 'customer')
    const addressNodes = filtered.filter(d => d.type === 'address')
    const cityNodes = filtered.filter(d => d.type === 'city')
    const regionNodes = filtered.filter(d => d.type === 'region')
    const countryNodes = filtered.filter(d => d.type === 'country')

    const pdPdLinks = isArrContains('physical', showingTypes) ?
      pdNodes.filter(
        i => i.parentId !== void 0 && pdNodes.find(j => j.deviceId === i.parentId) !== void 0
      ).map((d, i) => {
        const parent = pdNodes.find(i => i.deviceId === d.parentId)
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

    const merchantAddressLinks = isArrContains('merchant', showingTypes) ?
      isArrContains('address', showingTypes) ?
        merchantNodes
          .filter(m => m.addressId !== void 0)
          .map((m, i) => ({
            source: addressNodes.find(i => i.addressId === m.addressId),
            target: m,
            id: i
          }))
      : []
    : []

    const addressCityLinks = isArrContains('address', showingTypes) ?
      isArrContains('city', showingTypes) ?
        addressNodes
          .filter(m => m.cityId !== void 0)
          .map((m, i) => ({
            source: cityNodes.find(i => i.cityId === m.cityId),
            target: m,
            id: i
          }))
      : []
    : []

    const cityRegionLinks = isArrContains('city', showingTypes) ?
      isArrContains('region', showingTypes) ?
        cityNodes
          .filter(m => m.regionId !== void 0)
          .map((m, i) => ({
            source: regionNodes.find(i => i.regionId === m.regionId),
            target: m,
            id: i
          }))
      : []
    : []

    const regionCountryLinks = isArrContains('region', showingTypes) ?
      isArrContains('country', showingTypes) ?
        regionNodes
          .filter(m => m.countryId !== void 0)
          .map((m, i) => ({
            source: countryNodes.find(i => i.countryId === m.countryId),
            target: m,
            id: i
          }))
      : []
    : []

    const accountLinks = showingTypes.filter(i => i === 'account' || i === 'customer').length === 2 ?
      accountNodes.map((m, i) => {
        return {
          source: getCustomerByAccount(m, customerNodes),
          target: m,
          id: i
        }
      }) : []

    const nodes = filtered.filter(i => showingTypes.indexOf(i.type) !== -1)
    const links = [
      ...distinctLinks(pdLinks),
      ...pdPdLinks,
      ...ldLinks,
      ...merchantLinks,
      ...accountLinks,
      ...merchantAddressLinks,
      ...addressCityLinks,
      ...cityRegionLinks,
      ...regionCountryLinks
    ]
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
