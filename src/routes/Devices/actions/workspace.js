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
    const nodes = filtered.map(d => {
      return {
        title: d.type === 'physical' ? d.SerialNumber :
          d.type === 'logical' ? d.TerminalId : 'incorrect node type',
        type: d.type === 'physical' ? 'empty' : 'special',
        id: d.id
  		}
  	})
  	const lds = filtered.filter(d => d.type === 'logical')
  	const pds = filtered.filter(d => d.type === 'physical')
  	const edges = lds.map((d, i) => {
  		return {
  			source: pds.find(pd => pd.id === d.PhysicalDeviceId).id,
  			target: d.id,
        type: 'emptyEdge',
        weight: 1,
        id: i
  		}
  	})
  	const tree = { nodes, edges }
  	dispatch(setTree(tree))
  }
}

export function changeDeviceData (data) {
  return (dispatch) => {
    dispatch(setDevices(data))
    dispatch(filterData())
  }
}
