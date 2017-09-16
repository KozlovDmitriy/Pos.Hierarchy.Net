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
    const lds = filtered.filter(d => d.type === 'logical')
    const pds = filtered.filter(d => d.type === 'physical')
    const nodes = pds.map(d => {
      return {
        name: d.type === 'physical' ? d.SerialNumber :
          d.type === 'logical' ? d.TerminalId :
          'incorrect node type',
        type: 'physical',
        id: d.id,
        children : lds
          .filter(j => j.PhysicalDeviceId === d.id)
          .map((j, i) => {
        		return {
              name: j.TerminalId,
              type: 'logical',
              id: j.id
        		}
          })
  		}
  	})
  	dispatch(setTree({ name: 'Устройства', children: nodes }))
  }
}

export function changeDeviceData (data) {
  return (dispatch) => {
    dispatch(setDevices(data))
    dispatch(filterData())
  }
}
