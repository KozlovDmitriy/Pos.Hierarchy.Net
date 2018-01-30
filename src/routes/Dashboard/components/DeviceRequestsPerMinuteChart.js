import React from 'react'
// import { LineChart } from 'rd3'
import is from 'is_js'

/**
 * Превраащет datdaset пришедший от rethink
 * в датасет, пригодный для d3
 * @param  {[type]} mps [description]
 * @return {[type]}     [description]
 */
const mpsToDataset = (mps) => {
  const data = mps.map((i) => ({
    x: new Date(i.acceptedAt * 1000),
    y: i.value
  }))
  return [{
    name: 'Device requests per minute',
    values: data
  }]
}

/**
 * Виджет графика запросов в секунду
 * @param  {[type]} { data          } [description]
 * @return {[type]}   [description]
 */
const DeviceRequestsPerMinuteChart = ({ data }) => (
  is.not.array(data) || data.length < 1 ?
    <span /> : <span />
    /* <LineChart
      data={mpsToDataset(data)}
      xAxisTickInterval={{ unit: 'minutes', interval: 2 }}
      width='400'
      height='300'
      viewBoxObject={{
        x: 0,
        y: 0,
        width: 400,
        height: 300
      }}
    /> */
)

export default DeviceRequestsPerMinuteChart
