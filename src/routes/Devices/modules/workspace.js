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
  data: [
    {
      id: 1,
      deviceId: 1,
      type: 'physical',
      SerialNumber: 'Serial Number 1',
      ModelName: 'NewPOS 8210'
    },
    {
      id: 2,
      deviceId: 2,
      type: 'physical',
      SerialNumber: 'Serial Number 2',
      ModelName: 'Petroline'
    },
    {
      id: 3,
      deviceId: 3,
      type: 'logical',
      TerminalId: 'Terminal ID 1',
      PhysicalDeviceId: 1,
      MerchantNumberX: 'MerchNum1'
    },
    {
      id: 4,
      deviceId: 4,
      type: 'logical',
      TerminalId: 'Terminal ID 2',
      PhysicalDeviceId: 2,
      MerchantNumberX: 'MerchNum2'
    },
    {
      id: 5,
      deviceId: 5,
      type: 'logical',
      TerminalId: 'Terminal ID 3',
      PhysicalDeviceId: 2,
      MerchantNumberX: 'MerchNum2'
    },
    {
      id: 6,
      deviceId: 6,
      type: 'logical',
      TerminalId: 'Terminal ID 4',
      PhysicalDeviceId: 1,
      MerchantNumberX: 'MerchNum2'
    },
    {
      id: 7,
      deviceId: 7,
      type: 'physical',
      parentId: 2,
      SerialNumber: 'Serial Number 3',
      ModelName: 'Verifone VX520'
    },
    {
      id: 8,
      deviceId: 8,
      type: 'logical',
      TerminalId: 'Terminal ID 5',
      PhysicalDeviceId: 7,
      MerchantNumberX: 'MerchNum2'
    },
    {
      id: 9,
      type: 'merchant',
      numberX: 'MerchNum1',
      name: 'Merchant 1',
      accountNumberX: 'AccNum2',
      adressId: 1
    },
    {
      id: 10,
      type: 'merchant',
      numberX: 'MerchNum2',
      name: 'Merchant 2',
      accountNumberX: 'AccNum3',
      adressId: 2
    },
    {
      id: 11,
      type: 'account',
      numberX: 'AccNum1',
      customerNumberX: 'CostNum1',
      name: 'Account 1',
      adressId: 1
    },
    {
      id: 12,
      type: 'account',
      numberX: 'AccNum2',
      customerNumberX: 'CostNum1',
      name: 'Account 2',
      adressId: 2
    },
    {
      id: 13,
      type: 'account',
      numberX: 'AccNum3',
      customerNumberX: 'CostNum1',
      name: 'Account 3',
      adressId: 3
    },
    {
      id: 14,
      type: 'customer',
      numberX: 'CostNum1',
      name: 'Customer 1',
      adressId: 3
    }
  ],
  tree: {},
  filterWithPpd: false,
  filteredData: [],
  showingTypes: ['logical', 'physical', 'merchant', 'account', 'customer'],
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
