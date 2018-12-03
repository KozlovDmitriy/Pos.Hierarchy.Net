import ConnectionRules from '../../../utils/ConnectionRules'
import { getAllConnections } from './connections'
import {
  collapseNode,
  collapseEntities,
  collapseNotLoadedEntities
} from './collapse'
import {
  loadDevices,
  runQuery,
  addEntities,
  changeDeviceData
} from './workspace'
import {
  filterData,
  isAnyFieldNotNullOrEmty
} from './filters'

const connections = new ConnectionRules()

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
  physical: [
    { type: 'logical', field: 'physicalDeviceId', valueField: 'deviceId' },
    { type: 'physical', field: 'parentId', valueField: 'deviceId' }
  ],
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

function getTree (dispatch, data, filteredData, showingTypes, errors) {
  collapseEntities(data, showingTypes)
  const filtered = data.filter(d => filteredData.indexOf(d.id) !== -1)
  // const filtered = cloneArray(data.filter(d => filteredData.indexOf(d.id) !== -1))
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
    const { errors } = getState().errors
    const tree = getTree(dispatch, data, filteredData, showingTypes, errors)
  	dispatch(setTree(tree))
  }
}

const connectedDeviceFields = [ 'child_logical', 'child_physical', 'parent_logical', 'parent_physical' ]

export function loadFilteredEntities (filters, filterWithPpd) {
  return (dispatch, getState) => {
    if (isAnyFieldNotNullOrEmty(filters)) {
      connections.fiterRulesInitialize(filterWithPpd)
      connections.connectionsInitialize(filterWithPpd)
      const items = Object.keys(filters)
        .filter(k => filters[k] !== '')
        .map(f =>
          connections.findFilterRulesByFilter(f)
            .map(r => connections.findFilterRuleByTypeAndFilter(r, f))
            .map(r => ({
              EntityType: r.type,
              FilterField: r.field,
              FilterValue: filters[f]
            }))
        ).reduce((x, y) => [...x, ...y], [])
      const query = {
        $type: 'Techno.Tms.Models.CQRS.ReadModel.Other.FilterEntitiesForMonitorQuery, Techno.Tms.Models',
        Filter: {
          FilterConcatOperator: 'and',
          Items: items,
          WithPpdConnection: filterWithPpd,
          Count: 10
        },
        WithHierarchy: true
      }
      dispatch(
        runQuery(
          query,
          (readyState, status) => {
            if (readyState === 4 && status !== 200) { }
          },
          (data) => {
            if (data.IsSuccess && data.Result) {
              const result = JSON.parse(data.Result)
              const dbEntities = result.map(
                  r => (filterWithPpd ? Object.keys(r) : Object.keys(r).filter(f => !connectedDeviceFields.includes(f)))
                    .filter(f => r[f] !== null)
                    .map(f => r[f])
                )
                .reduce((x, y) => [...x, ...y], [])
                .filter((x, i, arr) => arr.findIndex(y => y.id === x.id) === i)
              dispatch(changeDeviceData(dbEntities))
            }
          }
        )
      )
    } else {
      dispatch(loadDevices())
    }
  }
}

export function loadCollapsedEntityChildren (node, type, field, value) {
  return (dispatch, getState) => {
    const query = {
      $type: 'Techno.Tms.Models.CQRS.ReadModel.Other.FilterEntitiesForMonitorQuery, Techno.Tms.Models',
      Filter: {
        FilterConcatOperator: 'or',
        Items: subentities[node.type].map(r => ({
          EntityType: r.type,
          FilterField: r.field,
          FilterValue: node[r.valueField]
        })),
        WithPpdConnection: true
      }
    }
    dispatch(
      runQuery(
        query,
        (readyState, status) => {
          if (readyState === 4 && status !== 200) { }
        },
        (data) => {
          if (data.IsSuccess && data.Result) {
            const result = JSON.parse(data.Result)
            const dbEntities = result.map(
                r => Object.keys(r)
                  .filter(f => r[f] !== null)
                  .map(f => r[f])
              )
              .reduce((x, y) => [...x, ...y], [])
              .filter((x, i, arr) => arr.findIndex(y => y.id === x.id) === i)
            dispatch(addEntities(dbEntities))
            dispatch(collapseNode(node.id))
            dispatch(filterData())
          }
        },
        false
      )
    )
  }
}
