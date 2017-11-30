const getLogicalByPhysical =
  (n, m) => n.deviceId === m.physicalDeviceId

const getPhysicalByLogical =
  (n, m) => m.deviceId === n.physicalDeviceId

const getMerchantByLogical =
  (n, m) => n.merchantNumberX === m.numberX

const getLogicalByMerchant =
  (n, m) => n.numberX === m.merchantNumberX

const getAccountByMecrhant =
  (n, m) => n.accountNumberX === m.numberX

const getMerchantByAccount =
  (n, m) => n.numberX === m.accountNumberX

const getCustomerByAccount =
  (n, m) => n.customerNumberX === m.numberX

const getAccountByCustomer =
  (n, m) => n.numberX === m.customerNumberX

const getAddressByEntity =
  (n, m) => n.addressId === m.addressId

const getEntityByAddress = getAddressByEntity

const getCityByAddress =
  (n, m) => n.cityId === m.cityId

const getAddressByCity = getCityByAddress

const getRegionByCity =
  (n, m) => n.regionId === m.regionId

const getCityByRegion = getRegionByCity

const getCountryByRegion =
  (n, m) => n.countryId === m.countryId

const getRegionByCountry = getCountryByRegion

const getPhysicalByPhysical =
  (n, m) => n.parentId === m.deviceId

const getPhysicalByPhysicalDown =
  (n, m) => n.deviceId === m.parentId

const filterBySubstring = (v, f) =>
  v.toLowerCase().includes(f.toLowerCase())

const connections = {
  physical: [
    { type: 'logical', expr: getLogicalByPhysical, isRec: false, isCycle: true, up: true },
    { type: 'logical', expr: getLogicalByPhysical, isRec: false, isCycle: true, up: false },
    { type: 'address', expr: getAddressByEntity, isRec: true, isCycle: true, up: true },
    { type: 'physical', expr: getPhysicalByPhysical, isRec: true, isCycle: true, up: true },
    { type: 'physical', expr: getPhysicalByPhysicalDown, isRec: true, isCycle: true, up: false },
    { type: 'physical', expr: getPhysicalByPhysical, isRec: true, isCycle: true, up: false }
  ],
  logical: [
    { type: 'merchant', expr: getMerchantByLogical, isRec: true, isCycle: true, up: true },
    { type: 'physical', expr: getPhysicalByLogical, isRec: true, isCycle: true, up: false }
  ],
  merchant: [
    { type: 'account', expr: getAccountByMecrhant, isRec: true, isCycle: true, up: true },
    { type: 'address', expr: getAddressByEntity, isRec: false, isCycle: true, up: true },
    { type: 'logical', expr: getLogicalByMerchant, isRec: true, isCycle: true, up: false }
  ],
  account: [
    { type: 'customer', expr: getCustomerByAccount, isRec: true, isCycle: true, up: true },
    { type: 'address', expr: getAddressByEntity, isRec: false, isCycle: true, up: true },
    { type: 'merchant', expr: getMerchantByAccount, isRec: true, isCycle: true, up: false }
  ],
  customer: [
    { type: 'address', expr: getAddressByEntity, isRec: false, isCycle: true, up: true },
    { type: 'account', expr: getAccountByCustomer, isRec: true, isCycle: true, up: false }
  ],
  address: [
    { type: 'city', expr: getCityByAddress, isRec: true, isCycle: true, up: true },
    { type: 'customer', expr: getEntityByAddress, isRec: true, isCycle: true, up: false },
    { type: 'account', expr: getEntityByAddress, isRec: true, isCycle: true, up: false },
    { type: 'merchant', expr: getEntityByAddress, isRec: true, isCycle: true, up: false },
    { type: 'physical', expr: getEntityByAddress, isRec: true, isCycle: true, up: false }
  ],
  city: [
    { type: 'region', expr: getRegionByCity, isRec: true, isCycle: true, up: true },
    { type: 'address', expr: getAddressByCity, isRec: true, isCycle: true, up: false }
  ],
  region: [
    { type: 'country', expr: getCountryByRegion, isRec: true, isCycle: true, up: true },
    { type: 'city', expr: getCityByRegion, isRec: true, isCycle: true, up: false }
  ],
  country: [
    { type: 'region', expr: getRegionByCountry, isRec: true, isCycle: true, up: false }
  ]
}

const connectionsInitialize = (withPpdConnections) => {
  connections['physical'] = [
    { type: 'logical', expr: getLogicalByPhysical, isRec: false, isCycle: true, up: true },
    { type: 'logical', expr: getLogicalByPhysical, isRec: false, isCycle: true, up: false },
    { type: 'address', expr: getAddressByEntity, isRec: true, isCycle: true, up: true }
  ]
  if (withPpdConnections) {
    connections['physical'].push(
      { type: 'physical', expr: getPhysicalByPhysical, isRec: true, isCycle: true, up: true }
    )
    connections['physical'].push(
      { type: 'physical', expr: getPhysicalByPhysicalDown, isRec: true, isCycle: true, up: false }
    )
    connections['physical'].push(
      { type: 'physical', expr: getPhysicalByPhysical, isRec: true, isCycle: true, up: false }
    )
  }
}

const filterRules = {
  logical: [
    { filter: 'terminalId', get: (e) => e.terminalId, try: filterBySubstring, showSiblings: false }
  ],
  merchant: [
    { filter: 'merchant', get: (e) => e.name, try: filterBySubstring, showSiblings: false }
  ],
  account: [
    { filter: 'account', get: (e) => e.name, try: filterBySubstring, showSiblings: false }
  ],
  customer: [
    { filter: 'customer', get: (e) => e.name, try: filterBySubstring, showSiblings: false }
  ],
  address: [
    { filter: 'address', get: (e) => e.address1, try: filterBySubstring, showSiblings: false }
  ],
  city: [
    { filter: 'city', get: (e) => e.name, try: filterBySubstring, showSiblings: false }
  ],
  region: [
    { filter: 'region', get: (e) => e.name, try: filterBySubstring, showSiblings: false }
  ],
  country: [
    { filter: 'country', get: (e) => e.name, try: filterBySubstring, showSiblings: false }
  ]
}
const fiterRulesInitialize = (withSiblings) => {
  filterRules['physical'] = [
    { filter: 'modelName', get: (e) => e.modelName, try: filterBySubstring, showSiblings: withSiblings },
    { filter: 'serialNumber', get: (e) => e.serialNumber, try: filterBySubstring, showSiblings: withSiblings }
  ]
}

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

const getAllConnectionsForEntity = (entity, entitiesByType, entitiesToShow, isRec = false) => {
  const type = entity.type
  const connectionVariants = connections[type].filter(i => i.up)
  if (entitiesToShow.indexOf(type) === -1 && !isRec) {
    return []
  }
  const connected = connectionVariants.map(t => {
    if (entitiesToShow.indexOf(type) === -1 && !t.isRec) {
      return []
    }
    const entities = entitiesByType[t.type] || []
    const expr = t.expr
    const firstLevel = entities.filter(e => expr(entity, e))
    return entitiesToShow.indexOf(t.type) === -1 ?
      firstLevel
        .map(e => getAllConnectionsForEntity(e, entitiesByType, entitiesToShow, true))
        .reduce((a, r) => [...a, ...r], []) :
      firstLevel
  }).reduce((a, r) => [...a, ...r], [])
  return connected
}

export const getAllConnections = (all, entitiesToShow) => {
  const entitiesByType = separateEntitiesByTypes(all)
  return all.map(
    e => getAllConnectionsForEntity(e, entitiesByType, entitiesToShow)
      .map((t, i) => ({ source: e, target: t, type: `${e.type} - ${t.type}` }))
  ).reduce((a, r) => [...a, ...r], [])
}

const getRoots = (entity, entitiesByType, ids, isRec = false) => {
  if (ids.indexOf(entity.id) === -1) {
    ids.push(entity.id)
    const type = entity.type
    const connectionVariants = connections[type].filter(i => !i.up)
    connectionVariants.forEach(t => {
      if (t.isCycle || !isRec) {
        const entities = entitiesByType[t.type] || []
        const expr = t.expr
        const firstLevel = entities.filter(e => expr(entity, e))
        firstLevel.map(e => getRoots(e, entitiesByType, ids, true))
      }
    })
  }
}

const getLineConnectionsForEntity = (entity, entitiesByType, ids, isRec = false) => {
  if (ids.indexOf(entity.id) === -1) {
    ids.push(entity.id)
    const type = entity.type
    const connectionVariants = connections[type].filter(i => i.up)
    connectionVariants.forEach(t => {
      if (t.isCycle || !isRec) {
        const entities = entitiesByType[t.type] || []
        const expr = t.expr
        const firstLevel = entities.filter(e => expr(entity, e))
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
  connections[type].filter(i => i.type === type)
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

const findFilterRulesByFilter = (filterName) =>
  Object.keys(filterRules)
    .filter(r => filterRules[r].find(a => a.filter === filterName) !== void 0)

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
  Object.keys(filters)
    .filter(f => filters[f] !== void 0 && filters[f] !== '')
    .map(f => {
      const filterMarks = getNewMarks(data)
      const filterValue = filters[f]
      const rules = findFilterRulesByFilter(f)
      rules.forEach(r => {
        const rule = filterRules[r].find(cr => cr.filter === f)
        entitiesByType[r].forEach(e => {
          const isOk = rule.try(rule.get(e), filterValue)
          markEntityWithSiblings(e, rule, entitiesByType, filterMarks, isOk)
        })
      })
      marksByConections(filterMarks, data, entitiesByType)
      const result = {}
      entitiesByType[typeForFilter].forEach(e => { result[e.id] = filterMarks[e.id] })
      return result
    }).forEach(x => Object.keys(x).forEach((id) => { marks[id] = marks[id] && x[id] }))
}

const collapseEntity = (entity, entitiesByType, ids, isRec = false, hide = false) => {
  entity.hide = hide
  if (ids.indexOf(entity.id) === -1) {
    ids.push(entity.id)
    const type = entity.type
    const connectionVariants = connections[type].filter(i => !i.up)
    connectionVariants.forEach(t => {
      if (t.isCycle || !isRec) {
        const entities = entitiesByType[t.type] || []
        const expr = t.expr
        const firstLevel = entities.filter(e => expr(entity, e))
        firstLevel.map(e => collapseEntity(e, entitiesByType, ids, true, entity.collapsed || hide))
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
  if (Object.keys(filters).find(i => filters[i] !== void 0 && filters[i] !== '') !== void 0) {
    fiterRulesInitialize(filterWithPpd)
    connectionsInitialize(filterWithPpd)
    const marks = getNewMarks(data)
    const entitiesByType = separateEntitiesByTypes(data)
    markByFilters(data, entitiesByType, filters, marks, 'physical')
    marksByConections(marks, data, entitiesByType)
    const filtered = Object.keys(marks)
      .filter(id => marks[id] === true/* >= filtersCount */)
      .map(id => parseInt(id, 10))
    connectionsInitialize(true)
    return filtered
  } else {
    return data.map(i => i.id)
  }
}
