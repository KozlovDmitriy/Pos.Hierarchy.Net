import { SET_TREE } from '../actions/tree'
import {
  COLLAPSE_NODE,
  SET_NODES_LOADED,
  SET_NODES_NOT_LOADED
} from '../actions/collapse'
import {
  START_LOAD,
  FINISH_LOAD,
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
    'region', 'country'
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

export default function workspace (state = initialState, action) {
  switch (action.type) {
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
