const getLogicalByPhysical =
  (n, m) => n.deviceId === m.PhysicalDeviceId

const getPhysicalByLogical =
  (n, m) => m.deviceId === n.PhysicalDeviceId

const getMerchantByLogical =
  (n, m) => n.MerchantNumberX === m.numberX

const getLogicalByMerchant =
  (n, m) => n.numberX === m.MerchantNumberX

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

const connections = {
  physical: [
    { type: 'logical', expr: getLogicalByPhysical, isRec: false, up: true },
    { type: 'address', expr: getAddressByEntity, isRec: true, up: true },
    { type: 'physical', expr: getPhysicalByPhysical, isRec: true, up: true }
  ],
  logical: [
    { type: 'merchant', expr: getMerchantByLogical, isRec: true, up: true },
    { type: 'physical', expr: getPhysicalByLogical, isRec: true, up: true },
    { type: 'physical', expr: getPhysicalByLogical, isRec: true, up: false },
  ],
  merchant: [
    { type: 'account', expr: getAccountByMecrhant, isRec: true, up: true },
    { type: 'address', expr: getAddressByEntity, isRec: false, up: true },
    { type: 'logical', expr: getLogicalByMerchant, isRec: true, up: false }
  ],
  account: [
    { type: 'customer', expr: getCustomerByAccount, isRec: true, up: true },
    { type: 'address', expr: getAddressByEntity, isRec: false, up: true },
    { type: 'merchant', expr: getMerchantByAccount, isRec: true, up: false }
  ],
  customer: [
    { type: 'address', expr: getAddressByEntity, isRec: false, up: true },
    { type: 'account', expr: getAccountByCustomer, isRec: true, up: false }
  ],
  address: [
    { type: 'city', expr: getCityByAddress, isRec: true, up: true },
    { type: 'customer', expr: getEntityByAddress, isRec: true, up: false },
    { type: 'account', expr: getEntityByAddress, isRec: true, up: false },
    { type: 'merchant', expr: getEntityByAddress, isRec: true, up: false },
    { type: 'physical', expr: getEntityByAddress, isRec: true, up: false }
  ],
  city: [
    { type: 'region', expr: getRegionByCity, isRec: true, up: true },
    { type: 'city', expr: getAddressByCity, isRec: true, up: false }
  ],
  region: [
    { type: 'country', expr: getCountryByRegion, isRec: true, up: true },
    { type: 'city', expr: getCityByRegion, isRec: true, up: false }
  ],
  country: [
    { type: 'region', expr: getRegionByCountry, isRec: true, up: false }
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

const filterBySubstring = (v, f) =>
  v.toLowerCase().includes(f.toLowerCase())

const filterRules = {
  logical: [
    { filter: 'terminalId', get: (e) => e.TerminalId, try: filterBySubstring }
  ],
  physical: [
    { filter: 'modelName', get: (e) => e.ModelName, try: filterBySubstring },
    { filter: 'serialNumber', get: (e) => e.SerialNumber, try: filterBySubstring }
  ],
  merchant: [
    { filter: 'merchant', get: (e) => e.name, try: filterBySubstring }
  ]
}

const getRoots = (entity, entitiesByType, ids, isRec = false) => {
  const type = entity.type
  const connectionVariants = connections[type].filter(i => i.up === false)
  if (ids.indexOf(entity.id) === -1) {
    ids.push(entity.id)
    connectionVariants.map(t => {
      if (t.isRec || !isRec) {
        const entities = entitiesByType[t.type] || []
        const expr = t.expr
        const firstLevel = entities.filter(e => expr(entity, e))
        firstLevel.map(e => getRoots(e, entitiesByType, true))
      }
    })
  }
}

const getLineConnectionsForEntity = (entity, entitiesByType, ids, isRec = false) => {
  const type = entity.type
  const connectionVariants = connections[type].filter(i => i.up)
  if (ids.indexOf(entity.id) === -1) {
    ids.push(entity.id)
    connectionVariants.map(t => {
      if (t.isRec || !isRec) {
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

const markEntitiesUp = (d, marks, entitiesByType, isOk, force = false) => {
  const ids = []
  getLineConnectionsForEntity(d, entitiesByType, ids)
  ids.forEach(e => markEntity(e, marks, isOk, force))
}

const markEntitiesAndConnections = (d, marks, entitiesByType, isOk, force = false) => {
  const ids = []
  getLineConnectionsForEntity(d, entitiesByType, ids)
  getRoots(d, entitiesByType, ids)
  ids.forEach(e => markEntity(e, marks, isOk, force))
}

const markByFilters = (d, data, entitiesByType, filters, marks) => {
  (filterRules[d.type] || []).forEach(r => {
    const filterValue = filters[r.filter]
    if (filterValue !== void 0 && filterValue !== '') {
      const isOk = r.try(r.get(d), filterValue)
      markEntitiesAndConnections(d, marks, entitiesByType, isOk)
    }
  })
}

export function getFilteredData (filters, data, filterWithPpd) {
  if (Object.keys(filters).find(i => filters[i] !== void 0 && filters[i] !== '') !== void 0) {
    const marks = {}
    data.forEach(d => { marks[d.id] = void 0 })
    const entitiesByType = separateEntitiesByTypes(data)
    data.forEach(d => markByFilters(d, data, entitiesByType, filters, marks))
    const correctMarks = { ...marks }
    Object.keys(marks)
      .filter(id => marks[id])
      .forEach(id => {
        const d = data.find(e => e.id === parseInt(id, 10))
        markEntitiesAndConnections(d, correctMarks, entitiesByType, true, true)
      })
    const filtered = Object.keys(correctMarks)
      .filter(id => correctMarks[id] === true/* >= filtersCount */)
      .map(id => parseInt(id, 10))
    return filtered
  } else {
    return data.map(i => i.id)
  }
}
