import Url from 'url'
import config from 'config'

export const START_LOAD = 'START_LOAD'
export const FINISH_LOAD = 'FINISH_LOAD'

export function startLoad () {
  return { type: START_LOAD }
}

export function finishLoad () {
  return { type: FINISH_LOAD }
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
export function runQuery (data, onStateChanged, onLoad, showLoader = true) {
  return (dispatch, getState) => {
    if (showLoader) {
      dispatch(startLoad())
    }
    const runQueryUrl = Url.resolve(config.webapiurl, 'Api/Query/GetEntitiesForMonitor')
    runMessage(
      runQueryUrl,
      data,
      onStateChanged,
      (data) => {
        if (showLoader) {
          dispatch(finishLoad())
        }
        onLoad(data)
      })
  }
}
