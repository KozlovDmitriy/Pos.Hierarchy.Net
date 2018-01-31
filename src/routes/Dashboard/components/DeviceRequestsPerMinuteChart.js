import React from 'react'
// import { LineChart } from 'rd3'
import { Group } from '@vx/group'
import { LinePath } from '@vx/shape'
import { curveMonotoneX } from '@vx/curve'
import { scaleTime, scaleLinear } from '@vx/scale'
import { extent, max } from 'd3-array'
import PropTypes from 'prop-types'
import is from 'is_js'

const width = 400
const height = 300

const x = d => d.acceptedAt === void 0 ? 0 : d.acceptedAt
const y = d => d.value

const xMax = width
const yMax = height / 8

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
const DeviceRequestsPerMinuteChart = ({ data }) => {
  // scales
  const xScale = scaleTime({
    range: [0, xMax],
    domain: extent(data, x),
  })
  const yScale = scaleLinear({
    range: [yMax, 0],
    domain: [0, max(data, y)],
  })
  return (
    is.not.array(data) || data.length < 1 ? <span /> :
    <svg width={width} height={height}>
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill='#c4c4c4'
      />
      <Group>
        <LinePath
          data={mpsToDataset(data)}
          xScale={xScale}
          yScale={yScale}
          x={x}
          y={y}
          stroke='#ffffff'
          strokeWidth={3}
          curve={curveMonotoneX}
        />
      </Group>
    </svg>
  )
}

DeviceRequestsPerMinuteChart.propTypes = {
  data: PropTypes.array
}
    /*

    <LineChart
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

export default DeviceRequestsPerMinuteChart
