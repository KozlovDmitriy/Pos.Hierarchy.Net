import { getAllConnections } from './connections'
import {
  collapseNode,
  collapseEntities,
  collapseNotLoadedEntities
} from './collapse'

export const SET_TREE = 'SET_TREE'

export function setTree (tree) {
  return { type: SET_TREE, tree }
}

export function collapseNodeAndRewriteTree (id) {
  return (dispatch) => {
    dispatch(collapseNode(id))
    dispatch(rewriteTree())
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
