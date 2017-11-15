import entities from './entities'
import {
  SET_DEVICES,
  SET_TREE,
  SET_POPOVER_IS_OPEN
} from '../actions/workspace'
import {
  SET_FILTERS,
  SET_FILTERED_DATA,
  SET_SHOWING_TYPES,
  SET_FILTER_WITH_PPD
} from '../actions/filters'

const initialState = {
  data: entities,
  tree: {},
  filterWithPpd: false,
  filteredData: [],
  showingTypes: ['logical', 'physical', 'merchant', 'account', 'customer', 'address', 'city', 'region', 'country'],
  filters: {
    modelName: '',
    terminalId: '',
    serialNumber: '',
    merchant: ''
  },
  nodePopover: {
    isOpen: false,
    anchor: void 0,
    data: void 0
  }
}

export default function workspace (state = initialState, action) {
  switch (action.type) {
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
    case SET_DEVICES: {
      return { ...state, data: action.devices }
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
