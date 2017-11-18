import { filterData } from './filters'
import { getAllConnections } from './connections'

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

export function rewriteTree () {
  return (dispatch, getState) => {
    const { data, filteredData, showingTypes } = getState().devices
    const filtered = cloneArray(data.filter(d => filteredData.indexOf(d.id) !== -1))
    const links = getAllConnections(filtered, showingTypes)
    const typesForSort = [
      'logical', 'physical',
      'merchant', 'account', 'customer',
      'address', 'city', 'region', 'country'
    ]
    const nodes = filtered.filter(i => showingTypes.indexOf(i.type) !== -1)
      .sort((x, y) => typesForSort.indexOf(x.type) > typesForSort.indexOf(y.type) ? 1 : -1)
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
