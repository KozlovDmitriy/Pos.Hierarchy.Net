import { filterData } from './filters'

import entities from '../modules/entities'
import { runQuery } from 'src/actions/tmswebapi'

export const SET_DEVICES = 'SET_DEVICES'
export const SET_COUNTRIES = 'SET_COUNTRIES'
export const SET_DEVICE_MODELS = 'SET_DEVICE_MODELS'
export const ADD_ENTITIES = 'ADD_ENTITIES'
export const SET_POPOVER_IS_OPEN = 'SET_POPOVER_IS_OPEN'

export function setDevices (devices) {
  return { type: SET_DEVICES, devices }
}

export function addEntities (entities) {
  return { type: ADD_ENTITIES, entities }
}

export function setDeviceModels (models) {
  return { type: SET_DEVICE_MODELS, models }
}

export function setCountries (countries) {
  return { type: SET_COUNTRIES, countries }
}

export function setPopoverIsOpen (isOpen, anchor, data) {
  return isOpen ?
    { type: SET_POPOVER_IS_OPEN, isOpen, anchor, data } :
    { type: SET_POPOVER_IS_OPEN, isOpen: false, anchor: void 0, data: void 0 }
}

export function changeDeviceData (data) {
  return (dispatch) => {
    dispatch(setDevices(data))
    dispatch(filterData())
  }
}

export function loadModels () {
  return (dispatch, getState) => {
    dispatch(
      runQuery(
        { $type: 'Techno.Tms.Models.CQRS.ReadModel.DeviceTypes.GetDeviceTypesDataQuery, Techno.Tms.Models' },
        (readyState, status) => {
          if (readyState === 4 && status !== 200) {
            console.error('Device models loading failed')
          }
        },
        (data) => {
          if (data.IsSuccess && data.Result && data.Result.$values) {
            const deviceTypes = data.Result.$values
            const deviceModels = deviceTypes
              .map(i => i.DeviceModelName)
              .filter((m, i, arr) => arr.indexOf(m) === i && !['abstract physical', 'abstract logical'].includes(m))
              .map(m => {
                const logical = deviceTypes.find(i => i.DeviceModelName === m && !i.IsPhysical)
                const physical = deviceTypes.find(i => i.DeviceModelName === m && i.IsPhysical)
                return {
                  modelName: m,
                  physicalDeviceTypeId: physical ? physical.Id : void 0,
                  logicalDeviceTypeId: logical ? logical.Id : void 0
                }
              })
            dispatch(setDeviceModels(deviceModels))
          } else {
            console.error('Device models loading failed')
          }
        }
      )
    )
  }
}

export function loadCountries () {
  return (dispatch, getState) => {
    dispatch(
      runQuery(
        { $type: 'Techno.Tms.Models.CQRS.ReadModel.Countries.AllCountriesQuery, Techno.Tms.Models' },
        (readyState, status) => {
          if (readyState === 4 && status !== 200) {
            console.error('Countries loading failed')
          }
        },
        (data) => {
          if (data.IsSuccess && data.Result && data.Result.$values) {
            const countries = data.Result.$values.map(c => ({ id: c.Id, name: c.Name }))
            dispatch(setCountries(countries))
          } else {
            console.error('Countries loading failed')
          }
        }
      )
    )
  }
}

export function loadDevices () {
  return (dispatch, getState) => {
    dispatch(
      runQuery(
        {
          $type: 'Techno.Tms.Models.CQRS.ReadModel.Other.GetEntitiesForMonitorQuery, Techno.Tms.Models',
          Count: 30
        },
        (readyState, status) => {
          if (readyState === 4 && status !== 200) {
            dispatch(changeDeviceData(entities))
          }
        },
        (data) => {
          if (data.IsSuccess && data.Result) {
            const dbEntities = JSON.parse(data.Result)
            dispatch(changeDeviceData(dbEntities))
          } else {
            dispatch(changeDeviceData(entities))
          }
        }
      )
    )
  }
}

export function loadEntities () {
  return (dispatch, getState) => {
    dispatch(loadCountries())
    dispatch(loadModels())
    dispatch(loadDevices())
  }
}
