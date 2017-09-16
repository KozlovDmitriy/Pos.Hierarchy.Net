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
      type: 'physical',
      SerialNumber: 'Test SerNum-1',
      ModelName: 'NewPOS 8210'
    },
    {
      id: 2,
      type: 'physical',
      SerialNumber: 'Test SerNum-2',
      ModelName: 'Petroline'
    },
    {
      id: 3,
      type: 'logical',
      TerminalId: 'Test TId-1',
      PhysicalDeviceId: 1,
      MerchantNumberX: 'MerchNum1'
    },
    {
      id: 4,
      type: 'logical',
      TerminalId: 'Test TId-2',
      PhysicalDeviceId: 2,
      MerchantNumberX: 'MerchNum2'
    },
    {
      numberX: 'MerchNum1',
      name: 'TestMerch1',
      adressId: 1
    },
    {
      numberX: 'MerchNum2',
      name: 'TestMerch2',
      adressId: 2
    },
    {
      numberX: 'CostNum1',
      name: 'TestCost1',
      adressId: 3
    },
    {
      numberX: 'AccNum1',
      name: 'TestAcc1',
      adressId: 1
    },
    {
      numberX: 'AccNum2',
      name: 'TestAcc2',
      adressId: 2
    },
    {
      numberX: 'AccNum3',
      name: 'TestAcc3',
      adressId: 3
    }
  ],
  tree: { },
  filteredData: [1,2,3,4],
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
