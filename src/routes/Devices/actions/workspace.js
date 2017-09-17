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
          merchantNumberX: d.MerchantNumberX,
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
    const merchantNodes = filtered
      .filter(d => d.type === 'merchant')
      .map(d => {
        return {
          title: d.name,
          numberX: d.numberX,
          accountNumberX: d.accountNumberX,
          type: d.type,
          id: d.id
        }
      })
    const accountNodes = filtered
      .filter(d => d.type === 'account')
      .map(d => {
        return {
          title: d.name,
          numberX: d.numberX,
          customerNumberX: d.customerNumberX,
          type: d.type,
          id: d.id
        }
      })
    const customerNodes = filtered
      .filter(d => d.type === 'customer')
      .map(d => {
        return {
          title: d.name,
          numberX: d.numberX,
          type: d.type,
          id: d.id
        }
      })
    const ldPdLinks = ldNodes.map((d, i) => {
      return {
        source: pdNodes.find(pd => pd.id === d.pdId),
        target: d,
        id: i
      }
    })
    const merchantLinks = ldNodes.map((d, i) => {
      return {
        source: merchantNodes.find(m => m.numberX === d.merchantNumberX),
        target: d,
        id: i
      }
    })
    const accountLinks = merchantNodes.map((m, i) => {
      return {
        source: accountNodes.find(a => a.numberX === m.accountNumberX),
        target: m,
        id: i
      }
    })
    const customerLinks = accountNodes.map((m, i) => {
      return {
        source: customerNodes.find(a => a.numberX === m.customerNumberX),
        target: m,
        id: i
      }
    })
    const tree = {
      nodes: [ ...pdNodes, ...ldNodes, ...merchantNodes, ...accountNodes, ...customerNodes ],
      links: [ ...ldPdLinks, ...merchantLinks, ...accountLinks, ...customerLinks ]
    }
  	dispatch(setTree(tree))
  }
}

export function changeDeviceData (data) {
  return (dispatch) => {
    dispatch(setDevices(data))
    dispatch(filterData())
  }
}
