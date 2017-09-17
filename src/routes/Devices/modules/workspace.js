import {
  SET_DEVICES,
  SET_TREE
} from '../actions/workspace'
import {
  SET_FILTERS,
  SET_FILTERED_DATA
} from '../actions/filters'

const initialState = {
  data: [
    {
      id: 1,
      deviceId: 1,
      type: 'physical',
      SerialNumber: 'Test SerNum-1',
      ModelName: 'NewPOS 8210'
    },
    {
      id: 2,
      deviceId: 2,
      type: 'physical',
      SerialNumber: 'Test SerNum-2',
      ModelName: 'Petroline'
    },
    {
      id: 3,
      deviceId: 3,
      type: 'logical',
      TerminalId: 'Test TId-1',
      PhysicalDeviceId: 1,
      MerchantNumberX: 'MerchNum1'
    },
    {
      id: 4,
      deviceId: 4,
      type: 'logical',
      TerminalId: 'Test TId-2',
      PhysicalDeviceId: 2,
      MerchantNumberX: 'MerchNum2'
    },
    {
      id: 5,
      deviceId: 5,
      type: 'logical',
      TerminalId: 'Test TId-3',
      PhysicalDeviceId: 2,
      MerchantNumberX: 'MerchNum2'
    },
    {
      id: 6,
      deviceId: 6,
      type: 'logical',
      TerminalId: 'Test TId-3',
      PhysicalDeviceId: 1,
      MerchantNumberX: 'MerchNum2'
    },
    {
      id: 7,
      type: 'merchant',
      numberX: 'MerchNum1',
      name: 'TestMerch1',
      accountNumberX: 'AccNum2',
      adressId: 1
    },
    {
      id: 8,
      type: 'merchant',
      numberX: 'MerchNum2',
      name: 'TestMerch2',
      accountNumberX: 'AccNum3',
      adressId: 2
    },
    {
      id: 9,
      type: 'account',
      numberX: 'AccNum1',
      customerNumberX: 'CostNum1',
      name: 'TestAcc1',
      adressId: 1
    },
    {
      id: 10,
      type: 'account',
      numberX: 'AccNum2',
      customerNumberX: 'CostNum1',
      name: 'TestAcc2',
      adressId: 2
    },
    {
      id: 11,
      type: 'account',
      numberX: 'AccNum3',
      customerNumberX: 'CostNum1',
      name: 'TestAcc3',
      adressId: 3
    },
    {
      id: 12,
      type: 'customer',
      numberX: 'CostNum1',
      name: 'TestCost1',
      adressId: 3
    }
  ],
  tree: {},
  filteredData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  filters: {
    modelName: '',
    terminalId: '',
    serialNumber: '',
    merchant: ''
  }
}

export default function workspace (state = initialState, action) {
  switch (action.type) {
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
    default: return state
  }
}
