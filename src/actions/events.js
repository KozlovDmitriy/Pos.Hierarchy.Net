import RethinkdbWebsocketClient from 'rethinkdb-websocket-client'
import request from 'superagent'
import uuid from 'node-uuid'
import config from 'config'

export const SET_ERROR_EVENTS = 'SET_ERROR_EVENTS'
export const SET_WARNING_EVENTS = 'SET_WARNING_EVENTS'
export const ADD_ERROR_EVENT = 'ADD_ERROR_EVENT'
export const REMOVE_ERROR_EVENT = 'REMOVE_ERROR_EVENT'
export const UPDATE_ERROR_EVENT = 'UPDATE_ERROR_EVENT'
export const ADD_WARNING_EVENT = 'ADD_WARNING_EVENT'
export const REMOVE_WARNING_EVENT = 'REMOVE_WARNING_EVENT'
export const UPDATE_WARNING_EVENT = 'UPDATE_WARNING_EVENT'

export function setErrors (errors) {
  return { type: SET_ERROR_EVENTS, errors }
}

export function setWarnings (warnings) {
  return { type: SET_WARNING_EVENTS, warnings }
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

export function addWarningEvent (warning) {
  return { type: ADD_WARNING_EVENT, warning }
}

export function removeWarning (warning) {
  return { type: REMOVE_WARNING_EVENT, warning }
}

export function updateWarning (before, after) {
  return { type: UPDATE_ERROR_EVENT, before, after }
}

export function removeEvent (event) {
  return (dispatch, getState) => {
    const { host, port } = config.rethinkConfig
    const url = `http://${host}:${port}`
    request
      .post(`${url}/api/events `)
      .set('Content-Type', 'application/json')
      .send({ $type: 'ErrorHidden', id: uuid.v4(), errorIds: [event.id] })
      .end((err, res) => {
        if (err) {
          console.warn(err)
        } else {
          console.log(res)
        }
      })
  }
}

/**
 * Получает список ошибок и подписывается на обновление данных об ошибках
 */
export function subscribeErrors (id) {
  return (dispatch, getState) => {
    var connPromise = RethinkdbWebsocketClient.connect(config.rethinkConfig)
    const r = RethinkdbWebsocketClient.rethinkdb
    const query = r.table('Events')
    connPromise
      .then((conn) => {
        return query.changes().run(conn).then((cursor) => {
          cursor.on('error', console.log)
          cursor.on('data', (message) => {
            const type = (message.new_val || message.old_val).type
            switch (type) {
              case 'error':
                if (message.old_val === null && message.new_val !== null) {
                  dispatch(addError(message.new_val))
                } else if (message.old_val !== null && message.new_val === null) {
                  dispatch(removeError(message.old_val))
                } else if (message.old_val !== null && message.new_val !== null) {
                  dispatch(updateError(message.old_val, message.new_val))
                }
                break
              case 'warning':
                if (message.old_val === null && message.new_val !== null) {
                  dispatch(addWarningEvent(message.new_val))
                } else if (message.old_val !== null && message.new_val === null) {
                  dispatch(removeWarning(message.old_val))
                } else if (message.old_val !== null && message.new_val !== null) {
                  dispatch(updateWarning(message.old_val, message.new_val))
                }
                break
            }
            cursor.emit('message', message)
          })
        })
      }).catch((error) => console.log(error))
    connPromise
      .then((conn) => {
        return query.run(conn).then((cursor) => {
          cursor.toArray().then((results) => {
            const errors = results.filter(e => e.type === 'error')
            dispatch(setErrors(errors))
            const warnings = results.filter(e => e.type === 'warning')
            dispatch(setWarnings(warnings))
          }).error(console.log)
        })
      }).catch((error) => console.log(error))
  }
}
