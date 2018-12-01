import ConnectionRules from '../../../utils/ConnectionRules'
import {
  getFirstLevelEntityConnectionsWithHidden,
  separateEntitiesByTypes
} from './connections'

export const COLLAPSE_NODE = 'COLLAPSE_NODE'
export const SET_NODES_NOT_LOADED = 'SET_NODES_NOT_LOADED'
export const SET_NODES_LOADED = 'SET_NODES_LOADED'

const connections = new ConnectionRules()

export function collapseNode (id) {
  return { type: COLLAPSE_NODE, id }
}

export function setNodesNotLoaded (ids) {
  return { type: SET_NODES_NOT_LOADED, ids }
}

export function setNodesLoaded (ids) {
  return { type: SET_NODES_LOADED, ids }
}

const childCounts = {
  'country': [{ type: 'region', count: 'regionsCount' }],
  'region': [{ type: 'city', count: 'citiesCount' }],
  'city': [{ type: 'address', count: 'addressesCount' }],
  'address': [
    { type: 'tradePoint', count: 'tradePointsCount' },
    { type: 'customer', count: 'customersCount' }
  ],
  'tradePoint': [
    { type: 'physical', count: 'devicesCount' },
    // { type: 'merchant', count: 'merchantsCount' }
  ],
  'customer': [
    { type: 'merchant', count: 'merchantsCount' },
    { type: 'account', count: 'accountsCount' }
  ],
  'account': [{ type: 'merchant', count: 'merchantsCount' }],
  'merchant': [
    // { type: 'tradePoint', count: 'tradePointsCount' },
    { type: 'logical', count: 'logicalDevicesCount' }
  ],
  'physical': [
    { type: 'logical', count: 'logicalDevicesCount' },
    { type: 'physical', count: 'childsCount' }
  ],
  'logical': []
}

export function collapseNotLoadedEntities (dispatch, entitiesToShow, nodes, links) {
  const nodesForMark = []
  const nodesForUnmark = []
  nodes.filter(n => {
    const rules = childCounts[n.type]
      .filter(i => entitiesToShow.includes(i.type))
    const need = rules
      .map(r => n[r.count])
      .reduce((x, y) => x + y, 0)
    const has = getChildCount(rules, n, entitiesToShow, links)
    if (need > has && !n.collapsed) {
      n.collapsed = 'not-loaded'
      nodesForMark.push(n.id)
    } else if (need === has && n.collapsed === 'not-loaded') {
      n.collapsed = false
      nodesForUnmark.push(n.id)
    }
  })
  dispatch(setNodesNotLoaded(nodesForMark))
  dispatch(setNodesLoaded(nodesForUnmark))
}

export function collapseEntities (data, entitiesToShow) {
  const entitiesByType = separateEntitiesByTypes(data)
  data.forEach(e => { e.hide = false })
  data.forEach(e => {
    if (e.collapsed && e.collapsed !== 'not-loaded') {
      collapseEntity(e, entitiesByType, entitiesToShow, [])
    }
  })
}

function getChildCount (rules, node, entitiesToShow, links) {
  const has = rules
    .map(r => getChildCountByChildType(node, r.type, entitiesToShow, links))
    .reduce((x, y) => x + y, 0) - (!isNaN(parseInt(node.parentId)) ? 1 : 0)
  return has
}

function getChildCountByChildType (node, childType, entitiesToShow, links) {
  return links.filter(l =>
      (l.source.id === node.id && l.target.type === childType) ||
      (l.target.id === node.id && l.source.type === childType)
    ).length
}

const collapseEntity = (entity, entitiesByType, entitiesToShow, ids, isRec = false) => {
  if (ids.indexOf(entity.id) === -1) {
    ids.push(entity.id)
    const type = entity.type
    const connectionTypes = connections.getAllConnectionRulesForCollapse(type)
    connectionTypes.forEach(t => {
      //if (t.isCycle || !isRec) {
        const firstLevel = getFirstLevelEntityConnectionsWithHidden(entity, entitiesByType, t, entitiesToShow)
        firstLevel.forEach(e => {
          if (e.id !== ids[0]) {
            e.hide = true
            collapseEntity(e, entitiesByType, entitiesToShow, ids, true)
          }
        })
      //}
    })
  }
}
