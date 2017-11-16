const getLogicalByPhysical =
  (n, m) => n.deviceId === m.PhysicalDeviceId

const getPhysicalByLogical =
  (n, m) => m.deviceId === n.PhysicalDeviceId

const getMerchantByLogical =
  (n, m) => n.MerchantNumberX === m.numberX

const getAccountByMecrhant =
  (n, m) => n.accountNumberX === m.numberX

const getCustomerByAccount =
  (n, m) => n.customerNumberX === m.numberX

const getAddressByEntity =
  (n, m) => n.addressId === m.addressId

const getCityByAddress =
  (n, m) => n.cityId === m.cityId

const getRegionByCity =
  (n, m) => n.regionId === m.regionId

const getCountryByRegion =
  (n, m) => n.countryId === m.countryId

const getPhysicalByPhysical =
  (n, m) => n.parentId === m.deviceId

const connections = {
  physical: [
    { type: 'logical', expr: getLogicalByPhysical, isRec: false },
    { type: 'address', expr: getAddressByEntity, isRec: true },
    { type: 'physical', expr: getPhysicalByPhysical, isRec: true }
  ],
  logical: [
    { type: 'merchant', expr: getMerchantByLogical, isRec: true },
    { type: 'physical', expr: getPhysicalByLogical, isRec: true }
  ],
  merchant: [
    { type: 'account', expr: getAccountByMecrhant, isRec: true },
    { type: 'address', expr: getAddressByEntity, isRec: false }
  ],
  account: [
    { type: 'customer', expr: getCustomerByAccount, isRec: true },
    { type: 'address', expr: getAddressByEntity, isRec: false }
  ],
  customer: [
    { type: 'address', expr: getAddressByEntity, isRec: false }
  ],
  address: [
    { type: 'city', expr: getCityByAddress, isRec: true }
  ],
  city: [
    { type: 'region', expr: getRegionByCity, isRec: true }
  ],
  region: [
    { type: 'country', expr: getCountryByRegion, isRec: true }
  ],
  country: []
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
  const connectionVariants = connections[type]
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

const getAllConnections = (all, entitiesToShow) => {
  const entitiesByType = separateEntitiesByTypes(all)
  return all.map(
    e => getAllConnectionsForEntity(e, entitiesByType, entitiesToShow)
      .map((t, i) => ({ source: e, target: t, type: `${e.type} - ${t.type}` }))
  ).reduce((a, r) => [...a, ...r], [])
}

export default getAllConnections
