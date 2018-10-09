import ConnectionRules from '../../../utils/ConnectionRules'
import {
  getFirstLevelEntityConnectionsWithHidden,
  separateEntitiesByTypes
} from './connections'

export const COLLAPSE_NODE = 'COLLAPSE_NODE'

const connections = new ConnectionRules()

export function collapseNode (id) {
  return { type: COLLAPSE_NODE, id }
}

const childCounts = {
  'country': [{ type: 'region', count: 'regionsCount' }],
  'region': [{ type: 'city', count: 'citiesCount' }],
  'city': [{ type: 'address', count: 'addressesCount' }],
  'address': [
    { type: 'tradePoint', count: 'tradePointsCount' },
    { type: 'customer', count: 'customersCount' }
  ],
  'tradePoint': [],
  'customer': [
    { type: 'merchant', count: 'merchantsCount' },
    { type: 'account', count: 'accountsCount' }
  ],
  'account': [{ type: 'merchant', count: 'merchantsCount' }],
  'merchant': [
    { type: 'tradePoint', count: 'tradePointsCount' },
    { type: 'logical', count: 'logicalDevicesCount' }
  ],
  'physical': [
    { type: 'logical', count: 'logicalDevicesCount' },
    { type: 'physical', count: 'childsCount' }
  ],
  'logical': []
}

export function collapseNotLoadedEntities (nodes, links) {
  const nodesForMark = nodes.filter(n => {
    const rules = childCounts[n.type]
    const need = rules
      .map(r => n[r.count])
      .reduce((x, y) => x + y, 0)
    const has = rules
      .map(r => getChildCount(n, r.type, links))
      .reduce((x, y) => x + y, 0)
    return need > has
  })
  nodesForMark.forEach(n => { n.collapsed = 'not-loaded' })
}

export function collapseEntities (data, entitiesToShow) {
  const entitiesByType = separateEntitiesByTypes(data)
  data.forEach(e => { e.hide = false })
  data.forEach(e => {
    if (e.collapsed) {
      collapseEntity(e, entitiesByType, entitiesToShow, [])
    }
  })
}

function getChildCount (node, childType, links) {
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
      if (t.isCycle || !isRec) {
        const firstLevel = getFirstLevelEntityConnectionsWithHidden(entity, entitiesByType, t, entitiesToShow)
        firstLevel.forEach(e => {
          if (e.id !== ids[0]) {
            e.hide = true
            collapseEntity(e, entitiesByType, entitiesToShow, ids, true)
          }
        })
      }
    })
  }
}
