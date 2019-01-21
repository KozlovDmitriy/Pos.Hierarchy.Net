import React from 'react'
import PropTypes from 'prop-types'
import TimerIcon from '@material-ui/icons/Timer'
import Localization from 'localization'
import colors from 'src/components/colors'

const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

class Timer extends React.Component {
  static propTypes = {
    start: PropTypes.instanceOf(Date).isRequired
  }

  constructor (props) {
    super(props)
    this.state = { elapsed: 0 }
    this.tick = this.tick.bind(this)
  }

  componentDidMount () {
    // componentDidMount is called by react when the component
    // has been rendered on the page. We can set the interval here:
    this.timer = setInterval(this.tick, 50)
  }

  componentWillUnmount () {
    // This method is called immediately before the component is removed
    // from the page and destroyed. We can clear the interval here:
    clearInterval(this.timer)
  }

  tick () {
    // This function is called every 50 ms. It updates the
    // elapsed counter. Calling setState causes the component to be re-rendered
    this.setState({ elapsed: Math.abs(new Date() - this.props.start) })
  }

  getElapsedText (elapsed) {
    const days = Math.floor(elapsed / DAY)
    const hours = Math.floor((elapsed % DAY) / HOUR)
    const minutes = Math.floor((elapsed % HOUR) / MINUTE)
    const seconds = (Math.floor((elapsed % MINUTE) / SECOND * 10) / 10).toFixed(1)
    return `${days} ${Localization.Days} ${hours}:${minutes}:${seconds}`
  }

  render () {
    const { elapsed } = this.state
    const color = elapsed < 5 * MINUTE ? colors.success :
      elapsed < 7 * MINUTE ? colors.warning :
      colors.error
    return (
      <b style={{ color }}>
        <TimerIcon style={{ marginBottom: -5, width: 20, height: 20 }} /> {this.getElapsedText(elapsed)}
      </b>
    )
  }
}

export default Timer
