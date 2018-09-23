import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'

// Only old-style imports for react-icons seem to work with gulp
import FaExpand from 'react-icons/lib/fa/expand'

const steps = 100 // Slider steps

function makeStyles (primary) {
  return {
    controls: {
      position: 'absolute',
      bottom: '40px',
      left: '15px',
      zIndex: 100
    },
    sliderWrapper: {
      backgroundColor: 'white',
      color: primary,
      border: `solid 1px lightgray`,
      padding: '6.5px',
      marginRight: '15px',
      MozUserSelect: 'none',
      WebkitUserSelect: 'none',
      msUserSelect: 'none'
    },
    slider: {
      position: 'relative',
      top: 3,
      marginLeft: 5,
      marginRight: 5
    },
    button: {
      backgroundColor: 'white',
      color: primary,
      border: `solid 1px lightgray`,
      outline: 'none',
      position: 'absolute',
      width: 31,
      height: 31,
      top: -3
    }
  }
}

class GraphControls extends Component {
  static propTypes = {
    primary: PropTypes.string,
    minZoom: PropTypes.number,
    maxZoom: PropTypes.number,
    zoomLevel: PropTypes.number.isRequired,
    zoomToFit: PropTypes.func.isRequired,
    modifyZoom: PropTypes.func.isRequired
  }

  static defaultProps = {
    primary: 'dodgerblue',
    minZoom: 0.15,
    maxZoom: 1.5
  }

  constructor (props) {
    super(props)
    this.state = {
      styles: makeStyles(props.primary)
    }
    this.zoom = this.zoom.bind(this)
  }

  // Convert slider val (0-steps) to original zoom value range
  sliderToZoom (val) {
    return ((val) * (this.props.maxZoom - this.props.minZoom) / steps) + this.props.minZoom
  }

  // Convert zoom val (minZoom-maxZoom) to slider range
  zoomToSlider (val) {
    return (val - this.props.minZoom) * steps / (this.props.maxZoom - this.props.minZoom)
  }

  // Center graph-view on contents of svg > view
  zoomToFit () {
    this.props.zoomToFit()
  }

  // Modify current zoom of graph-view
  zoom (e) {
    const sliderVal = e.target.value
    const zoomLevelNext = this.sliderToZoom(sliderVal)
    const delta = zoomLevelNext - this.props.zoomLevel
    if (zoomLevelNext <= this.props.maxZoom && zoomLevelNext >= this.props.minZoom) {
      this.props.modifyZoom(delta)
    }
  }

  render () {
    const styles = this.state.styles
    return (
      <div style={styles.controls} id='GraphControls'>
        <span style={styles.sliderWrapper}>
          -
          <input
            id='typeinp'
            type='range'
            style={styles.slider}
            min={this.zoomToSlider(this.props.minZoom)}
            max={this.zoomToSlider(this.props.maxZoom)}
            value={this.zoomToSlider(this.props.zoomLevel)}
            onChange={this.zoom}
            step='1'
          />
          +
        </span>
        <button style={styles.button} onMouseDown={this.props.zoomToFit}>
          <FaExpand />
        </button>
      </div>
    )
  }
}

export default Radium(GraphControls)
