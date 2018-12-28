import { SET_TREE } from '../actions/tree'
import {
  COLLAPSE_NODE,
  SET_NODES_LOADED,
  SET_NODES_NOT_LOADED
} from '../actions/collapse'
import {
  START_LOAD,
  FINISH_LOAD
} from 'src/actions/tmswebapi'
import {
  SET_DEVICES,
  SET_DEVICE_MODELS,
  SET_COUNTRIES,
  ADD_ENTITIES,
  SET_POPOVER_IS_OPEN
} from '../actions/workspace'
import {
  SET_FILTERS,
  SET_FILTERED_DATA,
  SET_SHOWING_TYPES,
  SET_FILTER_WITH_PPD
} from '../actions/filters'
import {
  ADD_ERROR_EVENT,
  REMOVE_ERROR_EVENT,
  ADD_WARNING_EVENT,
  REMOVE_WARNING_EVENT
} from 'src/actions/events'

const initialState = {
  animation: false,
  data: [],
  models: [],
  countries: [],
  tree: {},
  filterWithPpd: false,
  filteredData: [],
  showingTypes: [
    'logical', 'physical', 'merchant',
    'customer', 'address', 'city',
    'region', 'country', 'tradePoint'
  ],
  filters: {
    terminalId: '',
    serialNumber: '',
    merchant: '',
    account: '',
    customer: '',
    address: '',
    city: '',
    region: '',
    countryId: '',
    physicalDeviceTypeId: '',
    logicalDeviceTypeId: ''
  },
  nodePopover: {
    isOpen: false,
    anchor: void 0,
    data: void 0
  },
  isLoad: false,
  lastCollapsedEntityId: void 0
}

function isEventForNode (node, event) {
  switch (node.type) {
    case 'logical': return node.deviceId === event.logicalDeviceId
    case 'physical': return node.deviceId === event.physicalDeviceId
    case 'tradePoint': return node.tradePointId === event.tradePointId
    case 'merchant': return node.merchantId === event.merchantId
    case 'account': return node.accountId === event.accountId
    case 'customer': return node.customerId === event.customerId
    case 'address': return node.addressId === event.addressId
    case 'city': return node.cityId === event.cityId
    case 'region': return node.regionId === event.regionId
    case 'country': return node.countryId === event.countryId
  }
  return false
}

export default function workspace (state = initialState, action) {
  const popover = state.nodePopover
  switch (action.type) {
    case ADD_ERROR_EVENT:
      if (popover.isOpen && popover.data) {
        const node = popover.data.node
        if (isEventForNode(node, action.error)) {
          const errors = [ ...popover.data.errors, action.error ]
          const newPopover = {
            ...popover,
            data: { ...popover.data, errors }
          }
          return { ...state, nodePopover: newPopover }
        }
      }
      return state
    case REMOVE_ERROR_EVENT:
      if (state.nodePopover.isOpen && state.nodePopover.data) {
        const errors = state.nodePopover.data.errors.filter(i => i.id !== action.error.id)
        const nodePopover = {
          ...state.nodePopover,
          data: { ...state.nodePopover.data, errors }
        }
        return { ...state, nodePopover }
      }
      return state
    case ADD_WARNING_EVENT:
      if (popover.isOpen && popover.data) {
        const node = popover.data.node
        if (isEventForNode(node, action.warning)) {
          const warnings = [ ...popover.data.warnings, action.warning ]
          const newPopover = {
            ...state.nodePopover,
            data: { ...popover.data, warnings }
          }
          return { ...state, nodePopover: newPopover }
        }
      }
      return state
    case REMOVE_WARNING_EVENT:
      if (state.nodePopover.isOpen && state.nodePopover.data) {
        const warnings = state.nodePopover.data.warnings.filter(i => i.id !== action.warning.id)
        const nodePopover = {
          ...state.nodePopover,
          data: { ...state.nodePopover.data, warnings }
        }
        return { ...state, nodePopover }
      }
      return state
    case START_LOAD:
      return { ...state, isLoad: true }
    case FINISH_LOAD:
      return { ...state, isLoad: false }
    case SET_DEVICE_MODELS:
      return { ...state, models: action.models }
    case SET_COUNTRIES:
      return { ...state, countries: action.countries }
    case SET_NODES_LOADED: {
      const ids = action.ids
      const old = state.data.filter(i => ids.indexOf(i.id) === -1)
      const now = state.data
        .filter(i => ids.indexOf(i.id) !== -1)
        .map(i => ({ ...i, collapsed: false }))
      return {
        ...state,
        data: [ ...old, ...now ]
      }
    }
    case SET_NODES_NOT_LOADED: {
      const ids = action.ids
      const old = state.data.filter(i => ids.indexOf(i.id) === -1)
      const now = state.data
        .filter(i => ids.indexOf(i.id) !== -1)
        .map(i => ({ ...i, collapsed: 'not-loaded' }))
      return {
        ...state,
        data: [ ...old, ...now ]
      }
    }
    case COLLAPSE_NODE: {
      const old = state.data.find(i => i.id === action.id)
      const now = { ...old, collapsed: !old.collapsed }
      return {
        ...state,
        data: [...state.data.filter(i => i.id !== old.id), now],
        lastCollapsedEntity: now.id
      }
    }
    case SET_POPOVER_IS_OPEN: {
      return {
        ...state,
        nodePopover: {
          isOpen: action.isOpen,
          anchor: action.anchor,
          data: action.data
        }
      }
    }
    case ADD_ENTITIES: {
      const newData = [...state.data, ...action.entities]
      const newDataIds = newData.map(e => e.id)
      const distinctData = newData
        .filter((e, i, arr) => newDataIds.indexOf(e.id) === i)
      return {
        ...state,
        data: distinctData,
        lastCollapsedEntity: void 0
      }
    }
    case SET_DEVICES: {
      return {
        ...state,
        data: action.devices,
        lastCollapsedEntity: void 0
      }
    }
    case SET_TREE: {
      return { ...state, tree: action.tree }
    }
    case SET_FILTERS: {
      return { ...state, filters: action.filters }
    }
    case SET_FILTERED_DATA: {
      return { ...state, filteredData: action.ids }
    }
    case SET_SHOWING_TYPES: {
      return { ...state, showingTypes: action.types }
    }
    case SET_FILTER_WITH_PPD: {
      return { ...state, filterWithPpd: action.flag }
    }
    default: return state
  }
}
