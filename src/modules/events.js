import {
  SET_ERROR_EVENTS,
  ADD_ERROR_EVENT,
  REMOVE_ERROR_EVENT,
  UPDATE_WARNING_EVENT,
  SET_WARNING_EVENTS,
  ADD_WARNING_EVENT,
  REMOVE_WARNING_EVENT,
  UPDATE_ERROR_EVENT
} from '../actions/events'

const initialState = {
  /* errors: [
     {
      id: 1,
      terminalId: '01/12/2017',
      physicalDeviceId: 30170,
      logicalDeviceId: 30171,
      countryId: 29,
      regionId: 'Алтайский край',
      cityId: 127,
      addressId: 286,
      tradePointId: 'RU0100311',
      merchantId: '1013',
      accountId: '1000000001',
      customerId: '20109',
      customerAddressId: void 0,
      customerCityId: void 0,
      customerRegionId: void 0,
      customerCountryId: void 0,
      code: 1000,
      content: 'Отсутствует ПО'
    }
  ],
  warnings: [
    /* {
      id: 2,
      terminalId: '450291',
      countryId: 29,
      regionId: 'Алтайский край',
      cityId: 133,
      addressId: 301,
      tradePointId: 'DA0000002',
      logicalDeviceId: 30350,
      physicalDeviceId: 30349,
      merchantId: '3000',
      accountId: '3000000001',
      customerId: '50001',
      customerAddressId: 293,
      customerCityId: 130,
      customerRegionId: 'Волгоградская область',
      customerCountryId: 29,
      code: 2000,
      content: 'Отсутствует бумага в принтере'
    }
  ] */
}

export default function events (state = initialState, action) {
  switch (action.type) {
    case SET_ERROR_EVENTS: {
      return {
        ...state,
        errors: action.errors
      }
    }
    case ADD_ERROR_EVENT: {
      return {
        ...state,
        errors: [...state.errors, action.error]
      }
    }
    case REMOVE_ERROR_EVENT: {
      const errors = state.errors.filter(i => i.id !== action.error.id)
      return { ...state, errors }
    }
    case UPDATE_ERROR_EVENT: {
      const errors = state.errors.filter(i => i.id !== action.before.id)
      errors.push(action.after)
      return { ...state, errors }
    }
    case SET_WARNING_EVENTS: {
      return {
        ...state,
        warnings: action.warnings
      }
    }
    case UPDATE_WARNING_EVENT: {
      const warnings = state.warnings.filter(i => i.id !== action.before.id)
      warnings.push(action.after)
      return { ...state, warnings }
    }
    case ADD_WARNING_EVENT: {
      return {
        ...state,
        warnings: [...state.warnings, action.warning]
      }
    }
    case REMOVE_WARNING_EVENT: {
      const warnings = state.warnings.filter(i => i.id !== action.warning.id)
      return { ...state, warnings }
    }
    default: return state
  }
}
