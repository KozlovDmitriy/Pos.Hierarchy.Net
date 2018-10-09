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

export function collapseNodeAndRewriteTree (node) {
  return (dispatch) => {
    if (node.collapsed === 'not-loaded') {
      if (node.type === 'city') {
        dispatch(loadCollapsedEntityChildren(node))
      }
    } else {
      dispatch(collapseNode(node.id))
      dispatch(rewriteTree())
    }
  }
}

const cloneArray = (arr) => arr.map(i => { return { ...i } })

function getTree (data, filteredData, showingTypes) {
  collapseEntities(data, showingTypes)
  const filtered = cloneArray(data.filter(d => filteredData.indexOf(d.id) !== -1))
  const links = getAllConnections(filtered, showingTypes)
    .filter(i => i.source.hide !== true && i.target.hide !== true)
  const nodes = filtered.filter(i => showingTypes.indexOf(i.type) !== -1 && i.hide !== true)
  collapseNotLoadedEntities(nodes, links)
  const tree = { nodes, links }
  return tree
}

export function rewriteTree () {
  return (dispatch, getState) => {
    const { data, filteredData, showingTypes } = getState().devices
    const tree = getTree(data, filteredData, showingTypes)
  	dispatch(setTree(tree))
  }
}

export function loadCollapsedEntityChildren (node) {
  return (dispatch, getState) => {
    const query = {
      $type: 'Techno.Tms.Models.CQRS.ReadModel.Other.FilterEntitiesForMonitorQuery, Techno.Tms.Models'
    }
    if (node.type === 'city') {
      query.EntityType = 'address'
      query.FilterField = 'cityId'
      query.FilterValue = node.cityId
    }
    dispatch(
      runQuery(
        query,
        (readyState, status) => {
          if (readyState === 4 && status !== 200) { }
        },
        (data) => {
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
