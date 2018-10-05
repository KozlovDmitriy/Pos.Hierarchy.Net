import { filterData } from './filters'

import entities from '../modules/entities'
import Url from 'url'

export const SET_DEVICES = 'SET_DEVICES'
export const SET_POPOVER_IS_OPEN = 'SET_POPOVER_IS_OPEN'

export function setDevices (devices) {
  return { type: SET_DEVICES, devices }
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

/**
 * Отправка сообщения на TMS WebAPI
 * @param {object} data           Данные сообщения
 * @param {func} onStateChanged   Callback XMLHttpRequest.onreadystatechange(xhttp.readyState, xhttp.status)
 * @param {func} onLoad           Callback XMLHttpRequest.onload(xhttp.responseText)
 */
function runMessage (url, data, onStateChanged, onLoad) {
  const xhttp = new XMLHttpRequest()
  xhttp.open('POST', url, true)
  xhttp.setRequestHeader('Content-type', 'application/json')
  xhttp.send(JSON.stringify(data))
  xhttp.onreadystatechange = (e) => {
    onStateChanged(xhttp.readyState, xhttp.status)
  }
  xhttp.onload = () => {
    const data = JSON.parse(xhttp.responseText)
    onLoad(data)
  }
}

/**
 * Отправка запроса (Query) на TMS WebAPI
 * @param  {object} data           Объект запроса
 * @param  {func} onStateChanged   Callback XMLHttpRequest.onreadystatechange(xhttp.readyState, xhttp.status)
 * @param  {func} onLoad           Callback XMLHttpRequest.onload(xhttp.responseText)
 */
function runQuery (data, onStateChanged, onLoad) {
  return (dispatch, getState) => {
    const { restApiUrl } = { restApiUrl: 'http://localhost:5005/' } // getState().keys
    const runQueryUrl = Url.resolve(restApiUrl, 'Api/Query/GetEntitiesForMonitor')
    runMessage(runQueryUrl, data, onStateChanged, onLoad)
  }
}

export function loadEntities () {
  return (dispatch, getState) => {
    // dispatch(setMessage('info', 'Loading keys data...'))
    dispatch(
      runQuery(
        {
          $type: 'Techno.Tms.Models.CQRS.ReadModel.Other.GetEntitiesForMonitorQuery, Techno.Tms.Models'
        },
        (readyState, status) => {
          if (readyState === 4) {
            // dispatch(setKeyGroupsLoadingStatus(false))
          }
          if (readyState === 4 && status !== 200) {
            dispatch(changeDeviceData(entities))
            /* dispatch(setMessage(
              'danger',
              strings.formatString(strings.KeyGroupsDataLoadingFailedWithStatus, status)
            )) */
          }
        },
        (data) => {
          if (data.IsSuccess && data.Result) {
            const dbEntities = JSON.parse(data.Result)
            dispatch(changeDeviceData(dbEntities))
            // dispatch(setMessage('success', 'Key groups data loading finished successfull'))
          } else {
            dispatch(changeDeviceData(entities))
            /* const exMessage = data.ExceptionMessage
            dispatch(setMessage('danger', strings.formatString(strings.KeyGroupsDataLoadingFailed, exMessage)))
            dispatch(setKeyGroups([])) */
          }
        }
      )
    )
  }
}
