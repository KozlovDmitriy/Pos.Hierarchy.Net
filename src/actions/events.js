import RethinkdbWebsocketClient from 'rethinkdb-websocket-client'
import config from 'config'

export const SET_ERROR_EVENTS = 'SET_ERROR_EVENTS'
export const ADD_ERROR_EVENT = 'ADD_ERROR_EVENT'
export const REMOVE_ERROR_EVENT = 'REMOVE_ERROR_EVENT'
export const UPDATE_ERROR_EVENT = 'UPDATE_ERROR_EVENT'

export function setErrors (errors) {
  return { type: SET_ERROR_EVENTS, errors }
}

export function addError (error) {
  return { type: ADD_ERROR_EVENT, error }
}

export function removeError (error) {
  return { type: REMOVE_ERROR_EVENT, error }
}

export function updateError (before, after) {
  return { type: UPDATE_ERROR_EVENT, before, after }
}

/**
 * Получает список ошибок и подписывается на обновление данных об ошибках
 */
export function subscribeErrors (id) {
  return (dispatch, getState) => {
    var connPromise = RethinkdbWebsocketClient.connect(config.rethinkConfig)
    const r = RethinkdbWebsocketClient.rethinkdb
    const query = r.table('DeviceError')
    connPromise
      .then((conn) => {
        return query.changes().run(conn).then((cursor) => {
          cursor.on('error', (error) => {
            console.log(error)
          })
          cursor.on('data', (message) => {
            console.log(message)
            if (message.old_val === null && message.new_val !== null) {
              dispatch(addError(message.new_val))
            } else if (message.old_val !== null && message.new_val === null) {
              dispatch(removeError(message.old_val))
            } else if (message.old_val !== null && message.new_val !== null) {
              dispatch(updateError(message.old_val, message.new_val))
            }
            cursor.emit('message', message)
          })
        })
      }).catch((error) => { console.log(error) })
    connPromise
      .then((conn) => {
        return query.run(conn).then((cursor) => {
          cursor.toArray().then((results) => {
            dispatch(setErrors(results))
          }).error(console.log)
        })
      }).catch((error) => { console.log(error) })
  }
}
