import {
  SET_ERROR_EVENTS,
  ADD_ERROR_EVENT,
  REMOVE_ERROR_EVENT,
  UPDATE_ERROR_EVENT
} from '../actions/events'

const initialState = {
  errors: [
    {
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
      code: 1,
      content: 'Отсутствует бумага в принтере'
    }
  ]
}

export default function errors (state = initialState, action) {
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
    default: return state
  }
}
