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

export function collapseNotLoadedEntities (nodes, links) {
  nodes.filter(n => n.addressesCount > getChildCount(n, 'address', links))
    .forEach(n => { n.collapsed = true })
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
    (l.source.id === node.id && l.source.type === childType) ||
    (l.target.id === node.id && l.target.type === childType)
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
