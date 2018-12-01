import ConnectionRules from '../../../utils/ConnectionRules'
import {
  rewriteTree,
  loadFilteredEntities
} from './tree'
import {
  separateEntitiesByTypes,
  getFirstLevelEntityConnections
} from './connections'

const connections = new ConnectionRules()

export const SET_FILTERS = 'SET_FILTERS'
export const SET_MODEL_NAME_FILTER = 'SET_MODEL_NAME_FILTER'
export const SET_FILTERED_DATA = 'SET_FILTERED_DATA'
export const SET_TERMINAL_ID_FILTER = 'SET_TERMINAL_ID_FILTER'
export const SET_SERIAL_NUMBER_FILTER = 'SET_SERIAL_NUMBER_FILTER'
export const SET_MERCHANT_FILTER = 'SET_MERCHANT_FILTER'
export const SET_SHOWING_TYPES = 'SET_SHOWING_TYPES'
export const SET_FILTER_WITH_PPD = 'SET_FILTER_WITH_PPD'

export function setFilterWithPpd (flag) {
  return { type: SET_FILTER_WITH_PPD, flag }
}

export function setFilters (filters) {
  return { type: SET_FILTERS, filters }
}

export function setFilteredData (ids) {
  return { type: SET_FILTERED_DATA, ids }
}

export function setShowingTypes (types) {
  return { type: SET_SHOWING_TYPES, types }
}

export function updateShowingTypes (types) {
  return (dispatch, getState) => {
    dispatch(setShowingTypes(types))
    dispatch(filterData())
  }
}

export function toggleShowingType (type) {
  return (dispatch, getState) => {
    const { showingTypes } = getState().devices
    if (showingTypes.indexOf(type) === -1) {
      dispatch(updateShowingTypes([...showingTypes, type]))
    } else {
      dispatch(updateShowingTypes(
        showingTypes.filter(i => i !== type)
      ))
    }
  }
}

function debounce (func, wait, immediate) {
  let timeout
  return function (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      timeout = null
      if (!immediate) func.apply(this, args)
    }, wait)
    if (immediate && !timeout) func.apply(this, [...args])
  }
}

const filterDataFromDbDebouncing = debounce((dispatch, filters, filterWithPpd) => {
  dispatch(loadFilteredEntities(filters, filterWithPpd))
}, 700)

export function filterDataFromDb () {
  return (dispatch, getState) => {
    const { filters, filterWithPpd } = getState().devices
    filterDataFromDbDebouncing(dispatch, filters, filterWithPpd)
  }
}

export function filterData () {
  return (dispatch, getState) => {
    const { filters, data, showingTypes, filterWithPpd } = getState().devices
    const ids = getFilteredData(filters, data, showingTypes, filterWithPpd)
    dispatch(setFilteredData(ids))
    dispatch(rewriteTree())
  }
}

export function changeFilterWithPpd (flag) {
  return (dispatch) => {
    dispatch(setFilterWithPpd(flag))
    dispatch(filterDataFromDb())
  }
}

export function setmodelNameFilter (value) {
  return (dispatch, getState) => {
    const { filters, models } = getState().devices
    const model = models.find(i => i.modelName === value)
    if (model === void 0) {
      dispatch(setFilters({ ...filters, physicalDeviceTypeId: '', logicalDeviceTypeId: '' }))
    } else {
      const { physicalDeviceTypeId, logicalDeviceTypeId } = model
      dispatch(setFilters({ ...filters, physicalDeviceTypeId, logicalDeviceTypeId }))
    }
    dispatch(filterDataFromDb())
  }
}

export function setterminalIdFilter (value) {
  return (dispatch, getState) => {
    const { filters } = getState().devices
    dispatch(setFilters({ ...filters, terminalId: value }))
    dispatch(filterDataFromDb())
  }
}

export function setserialNumberFilter (value) {
  return (dispatch, getState) => {
    const { filters } = getState().devices
    dispatch(setFilters({ ...filters, serialNumber: value }))
    dispatch(filterDataFromDb())
  }
}

export function setMerchantFilter (value) {
  return (dispatch, getState) => {
    const { filters } = getState().devices
    dispatch(setFilters({ ...filters, merchant: value }))
    dispatch(filterDataFromDb())
  }
}

export function setAccountFilter (value) {
  return (dispatch, getState) => {
    const { filters } = getState().devices
    dispatch(setFilters({ ...filters, account: value }))
    dispatch(filterDataFromDb())
  }
}

export function setCustomerFilter (value) {
  return (dispatch, getState) => {
    const { filters } = getState().devices
    dispatch(setFilters({ ...filters, customer: value }))
    dispatch(filterDataFromDb())
  }
}

export function setAddressFilter (value) {
  return (dispatch, getState) => {
    const { filters } = getState().devices
    dispatch(setFilters({ ...filters, address: value }))
    dispatch(filterDataFromDb())
  }
}

export function setCityFilter (value) {
  return (dispatch, getState) => {
    const { filters } = getState().devices
    dispatch(setFilters({ ...filters, city: value }))
    dispatch(filterDataFromDb())
  }
}

export function setRegionFilter (value) {
  return (dispatch, getState) => {
    const { filters } = getState().devices
    dispatch(setFilters({ ...filters, region: value }))
    dispatch(filterDataFromDb())
  }
}

export function setCountryFilter (value) {
  return (dispatch, getState) => {
    const { filters, countries } = getState().devices
    const country = countries.find(i => i.name === value)
    const newFilters = {
      ...filters,
      countryId: country === void 0 ? '' : country.id
    }
    dispatch(setFilters(newFilters))
    dispatch(filterDataFromDb())
  }
}

function getFilteredMarks (data, filters, entitiesByType, entitiesToShow, filterWithPpd) {
  const marks = getNewMarks(data)
  const filledFilterFields = Object.keys(filters)
    .filter(k => filters[k] !== void 0 && filters[k] !== '')
  const filledFilterTypes = Object.keys(entitiesByType).filter(i => {
    const rules = connections.filterRules[i]
    if (rules === void 0) {
      return false
    }
    const rule = rules.find(j => filledFilterFields.includes(j.filter))
    return rule !== void 0
  })
  /* if (filledFilterTypes.includes('logical') || filledFilterTypes.includes('physical')) {
    const logicalMarks = getNewMarks(data)
    markByFilters(data, entitiesByType, filters, entitiesToShow, logicalMarks, 'logical')
    const physicalMarks = getNewMarks(data)
    markByFilters(data, entitiesByType, filters, entitiesToShow, physicalMarks, 'physical')
    Object.keys(marks).forEach(i => marks[i] = logicalMarks[i] || physicalMarks[i])
  } else { */
  const firstFilterEntity = Object.keys(entitiesByType)
    .find(i => filledFilterTypes.includes(i))
  const startMarksType = firstFilterEntity || Object.keys(entitiesByType)
    .find(type => entitiesByType[type] !== void 0 && entitiesByType[type].length !== 0)
  markByFilters(data, entitiesByType, filters, entitiesToShow, marks, startMarksType)
  // }
  return marks
}

function getFilteredData (filters, data, entitiesToShow, filterWithPpd) {
  return data.map(i => i.id)
}

function getLocalFilteredData (filters, data, entitiesToShow, filterWithPpd) {
  if (isAnyFieldNotNullOrEmty(filters)) {
    connections.fiterRulesInitialize(filterWithPpd)
    connections.connectionsInitialize(filterWithPpd)
    const entitiesByType = separateEntitiesByTypes(data)
    const marks = getFilteredMarks(data, filters, entitiesByType, entitiesToShow, filterWithPpd)
    marksByConections(marks, data, entitiesByType, entitiesToShow)
    const filtered = Object.keys(marks)
      .filter(id => marks[id] === true/* >= filtersCount */)
      .map(id => parseInt(id, 10))
    connections.connectionsInitialize(true)
    return filtered
  } else {
    return data.map(i => i.id)
  }
}

const markByFilters = (data, entitiesByType, filters, entitiesToShow, marks, typeForFilter) => {
  entitiesByType[typeForFilter].forEach(e => { marks[e.id] = true })
  filterNotNullOrEmptyFields(filters)
    .map(f => {
      const filterMarks = getNewMarks(data)
      const filterValue = filters[f]
      const rules = connections.findFilterRulesByFilter(f)
      rules.forEach(r => {
        const rule = connections.findFilterRuleByTypeAndFilter(r, f)
        entitiesByType[r].forEach(e => {
          const isOk = rule.try(e[rule.field], filterValue)
          markEntityWithSiblings(e, rule, entitiesByType, filterMarks, isOk)
        })
      })
      marksByConections(filterMarks, data, entitiesByType, entitiesToShow)
      const result = {}
      entitiesByType[typeForFilter].forEach(e => (result[e.id] = filterMarks[e.id]))
      return result
    }).forEach(x => Object.keys(x).forEach(id => (marks[id] = marks[id] && x[id])))
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

const marksByConections = (marks, data, entitiesByType, entitiesToShow) => {
  const trueMarks = Object.keys(marks).filter(id => marks[id])
  return trueMarks.forEach(id => {
    const d = data.find(e => e.id === parseInt(id, 10))
    markEntitiesAndConnections(d, marks, entitiesByType, entitiesToShow, true)
  })
}

const markEntity = (id, marks, isOk, force) => {
  const mark = marks[id]
  marks[id] = force ? isOk :
    mark === void 0 ? isOk :
    mark && isOk
}

const markEntitiesAndConnections = (d, marks, entitiesByType, entitiesToShow, isOk, force = false) => {
  const headIds = []
  getLineConnectionsForEntity(d, entitiesByType, entitiesToShow, headIds)
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

const getLineConnectionsForEntity = (entity, entitiesByType, entitiesToShow, ids, isRec = false) => {
  if (ids.indexOf(entity.id) === -1) {
    ids.push(entity.id)
    const type = entity.type
    const connectionVariants = connections.getAllUpConnectionRulesByType(type)
    connectionVariants.forEach(t => {
      if (t.isCycle || !isRec) {
        const firstLevel = getFirstLevelEntityConnections(entity, entitiesByType, t, entitiesToShow)
        firstLevel.map(e => getLineConnectionsForEntity(e, entitiesByType, entitiesToShow, ids, true))
      }
    })
  }
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

/**
 * Проверяет является ли строка пустой или undefined
 */
const isNullOrEmpty = (s) =>
  s === void 0 || s === ''

/**
 * Возвращает массив полей объекта, которые заполнены
 */
const filterNotNullOrEmptyFields = (obj) =>
  Object.keys(obj).filter(f => !isNullOrEmpty(obj[f]))

/**
 * Проверяет, имеется ли у объекта хотя бы одно заполненое поле
 */
export const isAnyFieldNotNullOrEmty = (obj) =>
  Object.keys(obj).find(i => !isNullOrEmpty(obj[i])) !== void 0
