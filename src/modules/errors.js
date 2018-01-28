import {
  SET_ERROR_EVENTS,
  ADD_ERROR_EVENT,
  REMOVE_ERROR_EVENT,
  UPDATE_ERROR_EVENT
} from '../actions/events'

const initialState = {
  errors: []
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
