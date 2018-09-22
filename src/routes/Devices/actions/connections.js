import ConnectionRules from '../../../utils/ConnectionRules'

const connections = new ConnectionRules()

/**
 * Проверяет является ли строка пустой или undefined
 */
const isNullOrEmpty = (s) =>
  s === void 0 || s === ''

/**
 * Возвращает массив полей объекта, которые заполнены
 */
const filterNotNullOrEmpryFields = (obj) =>
  Object.keys(obj).filter(f => !isNullOrEmpty(obj[f]))

/**
 * Проверяет, имеется ли у объекта хотя бы одно заполненое поле
 */
const isAnyFieldNotNullOrEmty = (obj) =>
  Object.keys(obj).find(i => !isNullOrEmpty(obj[i])) !== void 0

/**
 * Разделяет массив объектов на двумерный массив по полю type
 */
const separateEntitiesByTypes = (entities) =>
  entities.reduce(
    (arr, e) => {
      arr[e.type] === void 0 ?
        arr[e.type] = [ e ] :
        arr[e.type].push(e)
      return arr
    },
    []
  )

/**
 * Получает все узлы, итеющие прямое соединение переданного типа с переданным узлом
 * @param entity узел для которого ищутся соединения
 * @param entitiesByType двумерный массив всех узлов разбитый по типам узлов
 * @param connectionType тип соединения
 * @return массив узлов имеющих прямое соединение с переданным узлом
 */
const getFirstLevelEntityConnections = (entity, entitiesByType, connectionType) => {
  const entities = entitiesByType[connectionType.type] || []
  const expr = connectionType.expr
  const result = entities.filter(e => expr(entity, e))
  return result
}

/**
 * Получает все узлы с которыми необходимо отобразить соединения
 * если они соединены хотябы с одним из переданных узлов
 * @param entity узел для которого ищутся соединения
 * @param entitiesByType двумерный массив всех узлов разбитый по типам узлов
 * @param entitiesToShow типы узлов которые необходимо отображать
 * @return все узлы с которыми необходимо отобразить соединения
 */
const getAllConnectionsForEntities = (entities, entitiesByType, entitiesToShow) =>
  entities
    .map(e => getAllConnectionsForEntity(e, entitiesByType, entitiesToShow, true))
    .reduce((a, r) => [...a, ...r], [])

/**
 * Получает все узлы с которыми необходимо отобразить соединие с переданным узлом
 * @param entity узел для которого ищутся соединения
 * @param entitiesByType двумерный массив всех узлов разбитый по типам узлов
 * @param entitiesToShow типы узлов которые необходимо отображать
 * @param isRec возвращать ли соединеные узлы рекурсивно
 * @return Все узлы соединенные с переданным
 */
const getAllConnectionsForEntity = (entity, entitiesByType, entitiesToShow, isRec = false) => {
  const type = entity.type
  if (entitiesToShow.indexOf(type) === -1 && !isRec) {
    return []
  }
  const connectionTypes = connections.getAllUpConnectionRulesByType(type)
  const connected = connectionTypes.map(t => {
    if (entitiesToShow.indexOf(type) === -1 && !t.isRec) {
      return []
    }
    const firstLevel = getFirstLevelEntityConnections(entity, entitiesByType, t)
    // Если узлы данного уровня имеют тип который не нужно отображать, то ...
    return entitiesToShow.indexOf(t.type) === -1 ?
      // ... находим связанные со всеми найдеными узлами этого уровня узлы
      // и отображаем их соединения с переданным узлом
      getAllConnectionsForEntities(firstLevel, entitiesByType, entitiesToShow) :
      // иначе, отображаем связи с найдеными узлами данного уровня
      firstLevel
  }).reduce((a, r) => [...a, ...r], [])
  return connected
}

/**
 * Получает объект соединения между двумя узлами
 * @param первый узел
 * @param второй узел
 * @return объект соединия
 */
const getConnectionObject = (sourceNode, targetNode) => ({
  source: sourceNode,
  target: targetNode,
  type: `${sourceNode.type} - ${targetNode.type}`
})

/**
 * Полует список всех соединения между узлами, которые необходимо отобразить
 * @param все узлы
 * @param типы узлов которые необходимо отображать
 * @return список соединений
 */
export const getAllConnections = (all, entitiesToShow) => {
  const entitiesByType = separateEntitiesByTypes(all)
  return all.map(
    e => getAllConnectionsForEntity(e, entitiesByType, entitiesToShow)
      .map((t, i) => getConnectionObject(e, t))
  ).reduce((a, r) => [...a, ...r], [])
}

const getRoots = (entity, entitiesByType, ids, isRec = false) => {
  if (ids.indexOf(entity.id) === -1) {
    ids.push(entity.id)
    const type = entity.type
    const connectionTypes = connections.getAllDownConnectionRulesByType(type)
    connectionTypes.forEach(t => {
      if (t.isCycle || !isRec) {
        const firstLevel = getFirstLevelEntityConnections(entity, entitiesByType, t)
        firstLevel.map(e => getRoots(e, entitiesByType, ids, true))
      }
    })
  }
}

const getLineConnectionsForEntity = (entity, entitiesByType, ids, isRec = false) => {
  if (ids.indexOf(entity.id) === -1) {
    ids.push(entity.id)
    const type = entity.type
    const connectionVariants = connections.getAllUpConnectionRulesByType(type)
    connectionVariants.forEach(t => {
      if (t.isCycle || !isRec) {
        const firstLevel = getFirstLevelEntityConnections(entity, entitiesByType, t)
        firstLevel.map(e => getLineConnectionsForEntity(e, entitiesByType, ids, true))
      }
    })
  }
}

const markEntity = (id, marks, isOk, force) => {
  const mark = marks[id]
  marks[id] = force ? isOk :
    mark === void 0 ? isOk :
    mark && isOk
}

const markEntitiesAndConnections = (d, marks, entitiesByType, isOk, force = false) => {
  const headIds = []
  getLineConnectionsForEntity(d, entitiesByType, headIds)
  const rootIds = []
  getRoots(d, entitiesByType, rootIds)
  const ids = [...headIds, ...rootIds].filter((e, i, arr) => arr.indexOf(e) === i)
  ids.forEach(e => markEntity(e, marks, isOk, force))
  // const falseIds = Object.keys(marks).filter(i => ids.indexOf(parseInt(i, 10)) === -1)
  // falseIds.forEach(e => markEntity(e, marks, false, force))
}

const getSiblings = (d, type, entities, foundEntities) => {
  if (foundEntities.indexOf(d) === -1) {
    foundEntities.push(d)
  }
  connections.getSiblingConnectionTypes(type)
    .map(r => entities.filter(e => r.expr(d, e)))
    .reduce((x, y) => [...x, ...y], [])
    .filter(e => foundEntities.indexOf(e) === -1)
    .forEach(e => getSiblings(e, type, entities, foundEntities))
}

const markEntityWithSiblings = (d, ftype, entitiesByType, marks, isOk) => {
  markEntity(d.id, marks, isOk)
  if (ftype.showSiblings) {
    const type = d.type
    const entities = entitiesByType[type] || []
    const siblings = [ d ]
    getSiblings(d, type, entities, siblings)
    if (siblings.find(e => marks[e.id]) !== void 0) {
      siblings.forEach(e => markEntity(e.id, marks, true, true))
    }
  }
}

const getNewMarks = (data) => {
  const marks = {}
  data.forEach(d => { marks[d.id] = void 0 })
  return marks
}

const marksByConections = (marks, data, entitiesByType) =>
  Object.keys(marks)
    .filter(id => marks[id])
    .forEach(id => {
      const d = data.find(e => e.id === parseInt(id, 10))
      markEntitiesAndConnections(d, marks, entitiesByType, true)
    })

const markByFilters = (data, entitiesByType, filters, marks, typeForFilter) => {
  entitiesByType[typeForFilter].forEach(e => { marks[e.id] = true })
  filterNotNullOrEmpryFields(filters)
    .map(f => {
      const filterMarks = getNewMarks(data)
      const filterValue = filters[f]
      const rules = connections.findFilterRulesByFilter(f)
      rules.forEach(r => {
        const rule = connections.findFilterRuleByTypeAndFilter(r, f)
        entitiesByType[r].forEach(e => {
          const isOk = rule.try(rule.get(e), filterValue)
          markEntityWithSiblings(e, rule, entitiesByType, filterMarks, isOk)
        })
      })
      marksByConections(filterMarks, data, entitiesByType)
      const result = {}
      entitiesByType[typeForFilter].forEach(e => (result[e.id] = filterMarks[e.id]))
      return result
    }).forEach(x => Object.keys(x).forEach(id => (marks[id] = marks[id] && x[id])))
}

const collapseEntity = (entity, entitiesByType, ids, isRec = false, hide = false) => {
  entity.hide = hide
  if (ids.indexOf(entity.id) === -1) {
    ids.push(entity.id)
    const type = entity.type
    const connectionTypes = connections.getAllDownConnectionRulesByType(type)
    connectionTypes.forEach(t => {
      if (t.isCycle || !isRec) {
        const firstLevel = getFirstLevelEntityConnections(entity, entitiesByType, t)
        firstLevel.forEach(e => {
          if (e.id !== ids[0]) {
            collapseEntity(e, entitiesByType, ids, true, entity.collapsed || hide)
          }
        })
      }
    })
  }
}

export function collapseEntities (data) {
  const entitiesByType = separateEntitiesByTypes(data)
  data.forEach(e => { e.hide = false })
  data.forEach(e => {
    if (e.collapsed) {
      collapseEntity(e, entitiesByType, [])
    }
  })
}

export function getFilteredData (filters, data, filterWithPpd) {
  if (isAnyFieldNotNullOrEmty(filters)) {
    connections.fiterRulesInitialize(filterWithPpd)
    connections.connectionsInitialize(filterWithPpd)
    const marks = getNewMarks(data)
    const entitiesByType = separateEntitiesByTypes(data)
    markByFilters(data, entitiesByType, filters, marks, 'physical')
    marksByConections(marks, data, entitiesByType)
    const filtered = Object.keys(marks)
      .filter(id => marks[id] === true/* >= filtersCount */)
      .map(id => parseInt(id, 10))
    connections.connectionsInitialize(true)
    return filtered
  } else {
    return data.map(i => i.id)
  }
}
