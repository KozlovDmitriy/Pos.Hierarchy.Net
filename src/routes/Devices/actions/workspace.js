import { filterData } from './filters'

export const SET_DEVICES = 'SET_DEVICES'
export const SET_TREE = 'SET_TREE'

export function setDevices (devices) {
  return { type: SET_DEVICES, devices }
}

export function setTree (tree) {
  return { type: SET_TREE, tree }
}

export function rewriteTree () {
  return (dispatch, getState) => {
    const { data, filteredData } = getState().devices
    const filtered = data.filter(d => filteredData.indexOf(d.id) !== -1)
    const ldNodes = filtered
      .filter(d => d.type === 'logical')
      .map(d => {
        return {
          title: d.TerminalId,
          type: d.type,
          pdId: d.PhysicalDeviceId,
          id: d.id
        }
      })
    const pdNodes = filtered
      .filter(d => d.type === 'physical')
      .map(d => {
        return {
          title: d.SerialNumber,
          type: d.type,
          id: d.id
        }
      })
    const links = ldNodes.map((d, i) => {
      return {
        source: pdNodes.find(pd => pd.id === d.pdId),
        target: d,
        id: i
      }
    })
    const tree = { nodes: [ ...pdNodes, ...ldNodes ], links }
  	dispatch(setTree(tree))
  }
}

export function changeDeviceData (data) {
  return (dispatch) => {
    dispatch(setDevices(data))
    dispatch(filterData())
  }
}
