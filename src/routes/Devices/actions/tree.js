import { getAllConnections } from './connections'
import {
  collapseNode,
  collapseEntities,
  collapseNotLoadedEntities
} from './collapse'
import {
  runQuery,
  addEntities
} from './workspace'
import {
  filterData
} from './filters'

export const SET_TREE = 'SET_TREE'

export function setTree (tree) {
  return { type: SET_TREE, tree }
}

const subentities = {
  country: [{ type: 'region', field: 'countryId', valueField: 'countryId' }],
  region: [{ type: 'city', field: 'regionId', valueField: 'regionId' }],
  city: [{ type: 'address', field: 'cityId', valueField: 'cityId' }],
  address: [
    { type: 'tradePoint', field: 'addressId', valueField: 'addressId' },
    { type: 'customer', field: 'addressId', valueField: 'addressId' }
  ],
  tradePoint: [{ type: 'physical', field: 'tradePointId', valueField: 'tradePointId' }],
  customer: [
    { type: 'account', field: 'customerId', valueField: 'customerId' },
    { type: 'merchant', field: 'customerId', valueField: 'customerId' }
  ],
  account: [{ type: 'merchant', field: 'accountId', valueField: 'accountId' }],
  merchant: [{ type: 'logical', field: 'merchantId', valueField: 'merchantId' }],
  physical: [{ type: 'logical', field: 'physicalDeviceId', valueField: 'deviceId' }],
  logical: []
}

export function collapseNodeAndRewriteTree (node) {
  return (dispatch) => {
    if (node.collapsed === 'not-loaded') {
      dispatch(loadCollapsedEntityChildren(node))
    } else {
      dispatch(collapseNode(node.id))
      dispatch(rewriteTree())
    }
  }
}

const cloneArray = (arr) => arr.map(i => { return { ...i } })

function getTree (dispatch, data, filteredData, showingTypes) {
  collapseEntities(data, showingTypes)
  const filtered = cloneArray(data.filter(d => filteredData.indexOf(d.id) !== -1))
  const links = getAllConnections(filtered, showingTypes)
    .filter(i => i.source.hide !== true && i.target.hide !== true)
  const nodes = filtered.filter(i => showingTypes.indexOf(i.type) !== -1 && i.hide !== true)
  collapseNotLoadedEntities(dispatch, showingTypes, nodes, links)
  const tree = { nodes, links }
  return tree
}

export function rewriteTree () {
  return (dispatch, getState) => {
    const { data, filteredData, showingTypes } = getState().devices
    const tree = getTree(dispatch, data, filteredData, showingTypes)
  	dispatch(setTree(tree))
  }
}

// TODO: multiple filters
export function loadCollapsedEntityChildren (node, type, field, value) {
  return (dispatch, getState) => {
    const query = {
      $type: 'Techno.Tms.Models.CQRS.ReadModel.Other.FilterEntitiesForMonitorQuery, Techno.Tms.Models',
      Filter: {
        FilterConcatOperator: 'or',
        Items: subentities[node.type].map(r => ({
          EntityType: r.type,
          FilterField: r.field,
          FilterValue:  node[r.valueField]
        }))
      }
    }
    console.log('Query: ', query)
    dispatch(
      runQuery(
        query,
        (readyState, status) => {
          if (readyState === 4 && status !== 200) { }
        },
        (data) => {
          console.log('Query result: ', data)
          if (data.IsSuccess && data.Result) {
            const dbEntities = JSON.parse(data.Result)
            dispatch(addEntities(dbEntities))
            dispatch(collapseNode(node.id))
            dispatch(filterData())
          }
        }
      )
    )
  }
}
