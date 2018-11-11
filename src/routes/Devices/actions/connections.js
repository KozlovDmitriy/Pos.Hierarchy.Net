import ConnectionRules from '../../../utils/ConnectionRules'

const connections = new ConnectionRules()

/**
 * Разделяет массив объектов на двумерный массив по полю type
 */
export const separateEntitiesByTypes = (entities) => {
  const arr = {}
  connections.getAllTypes().forEach(k => { arr[k] = [] })
  return entities.reduce(
    (arr, e) => {
      arr[e.type] === void 0 ?
        arr[e.type] = [ e ] :
        arr[e.type].push(e)
      return arr
    },
    arr
  )
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
 * Получает все узлы, итеющие прямое соединение переданного типа с переданным узлом (скрытые узлы опускаются)
 * @param entity узел для которого ищутся соединения
 * @param entitiesByType двумерный массив всех узлов разбитый по типам узлов
 * @param connectionType тип соединения
 * @param entitiesToShow типы узлов которые необходимо отображать
 * @return массив узлов имеющих прямое соединение с переданным узлом
 */
export const getFirstLevelEntityConnections = (entity, entitiesByType, connectionType, entitiesToShow) => {
  const connectedEntities = getFirstLevelEntityConnectionsWithHidden(
    entity,
    entitiesByType,
    connectionType,
    entitiesToShow
  )
  // но среди найденных могут оказаться скрытые узлы
  const hiddenEntities = connectedEntities.filter(e => e.hide)
  // ищем узлы связанные со скрытыми
  const result = getAllConnectionsForEntities(hiddenEntities, entitiesByType, entitiesToShow)
  // добавляем в результат нескрытые узлы
  connectedEntities.filter(e => !e.hide).forEach(e => result.push(e))
  return result
}

/**
 * Получает все узлы, итеющие прямое соединение переданного типа с переданным узлом
 * @param entity узел для которого ищутся соединения
 * @param entitiesByType двумерный массив всех узлов разбитый по типам узлов
 * @param connectionType тип соединения
 * @param entitiesToShow типы узлов которые необходимо отображать
 * @return массив узлов имеющих прямое соединение с переданным узлом
 */
export const getFirstLevelEntityConnectionsWithHidden = (entity, entitiesByType, connectionType, entitiesToShow) => {
  const entities = entitiesByType[connectionType.type] || []
  const expr = connectionType.expr
  const connectedEntities = entities.filter(e => expr(entity, e))
  return connectedEntities
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
    const firstLevel = getFirstLevelEntityConnections(entity, entitiesByType, t, entitiesToShow)
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
