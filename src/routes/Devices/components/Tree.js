import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Graph } from '@vx/network'
import { LinkVertical } from '@vx/shape'
import * as d3 from 'd3'
import * as d3Force from 'd3-force'
import PhysicalDevice from '../containers/nodes/PhysicalDeviceContainer'
import LogicalDevice from './nodes/LogicalDevice'
import Merchant from './nodes/Merchant'
import Account from './nodes/Account'
import Customer from './nodes/Customer'
import NodePopover from '../containers/NodePopoverContainer'
import GraphControls from './GraphControls.js'
import './Tree.scss'

const styles = {
  graph: {
    position: 'absolute',
    top: 120,
    left: 6,
    right: 6,
    bottom: 20,
    background: '#fcfcfc'
  }
}

function Node ({ node, events }) {
  switch (node.type) {
    case 'physical': return (<PhysicalDevice node={node} />)
    case 'logical': return (<LogicalDevice node={node} />)
    case 'merchant': return (<Merchant node={node} />)
    case 'account': return (<Account node={node} />)
    case 'customer': return (<Customer node={node} />)
    default: return null
  }
}

function Link ({ link }) {
  return link.type === void 0 ? (
    <LinkVertical
      data={link}
      stroke='#878499'
      strokeWidth='1.5'
      strokeOpacity={0.5}
      fill='none'
    />
  ) : link.type === 'ppd' ? (
    <LinkVertical
      data={link}
      stroke='#03c0dc'
      strokeDasharray='12, 4'
      strokeWidth={2.5}
      strokeOpacity={0.5}
      fill='none'
    />
  ) : null
}

const width = 1300
const height = 1000

const minZoom = 0.15
const maxZoom = 1.5

const zoomDur = 750
const gridSize = 40960

class Tree extends Component {
  static propTypes = {
    tree: PropTypes.object.isRequired,
    animation: PropTypes.bool,
    filterData: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = { viewTransform: d3.zoomIdentity }
    this.handleZoom = this.handleZoom.bind(this)
    this.modifyZoom = this.modifyZoom.bind(this)
    this.handleZoomToFit = this.handleZoomToFit.bind(this)
    this.zoom = d3.zoom()
      .scaleExtent([minZoom, maxZoom])
      .on('zoom', this.handleZoom)
  }

  getTreeIds = (tree) => tree === void 0 ? [] : [
    tree.nodes === void 0 ? [] : tree.nodes.map(i => i.id),
    tree.links === void 0 ? [] : tree.links.map(i => [i.source.id, i.target.id])
  ]

  computeSimulation (simulation) {
    simulation.stop()
    // See https://github.com/d3/d3-force/blob/master/README.md#simulation_tick
    const ticksCount = Math.ceil(Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay()))
    for (var i = 0; i < ticksCount; ++i) {
      simulation.tick()
    }
  }

  componentWillReceiveProps (nextProps) {
    const newIds = this.getTreeIds(nextProps.tree)
    const oldIds = this.getTreeIds(this.props.tree)
    if (JSON.stringify(newIds) !== JSON.stringify(oldIds)) {
      if (this.state.force !== void 0) {
        this.state.force.stop()
      }
      const nodes = [ ...nextProps.tree.nodes ]
      const links = nextProps.tree.links
        .map(i => {
          return {
            source: i.source.id,
            target: i.target.id
          }
        })
      var force = d3Force.forceSimulation(nodes)
        .force('link', d3Force.forceLink().id(d => d.id))
        .force('forceX', d3Force.forceX().strength(0.1).x(width * 0.5))
        .force('forceY', d3Force.forceY().strength(0.1).y(height * 0.5))
        .force('center', d3Force.forceCenter().x(width * 0.5).y(height * 0.5))
        .force('charge', d3Force.forceManyBody().strength(-900))
      force.force('link').links(links)
      if (nextProps.animation) {
        force.on('tick', () => {
          this.setState({ nodes, links: nextProps.tree.links, force: this.state.force })
        })
      } else {
        this.computeSimulation(force)
      }
      this.setState({ nodes, links: nextProps.tree.links, force })
    }
  }

  componentWillMount () {
    if (this.props.tree.nodes === void 0) {
      this.props.filterData()
    }
  }

  // View 'zoom' handler
  handleZoom () {
    if (this.state.focused) {
      this.setState({
        ...this.state,
        viewTransform: d3.event.transform
      })
    }
  }

  // Zooms to contents of this.refs.entities
  handleZoomToFit () {
    const parent = d3.select(this.refs.viewWrapper).node()
    const entities = d3.select(this.refs.entities).node()
    const viewBBox = entities.getBBox()
    const width = parent.clientWidth
    const height = parent.clientHeight
    const translate = [ this.state.viewTransform.x, this.state.viewTransform.y ]
    const next = { x: translate[0], y: translate[1], k: this.state.viewTransform.k }
    if (viewBBox.width > 0 && viewBBox.height > 0) {
      const dx = viewBBox.width
      const dy = viewBBox.height
      const x = viewBBox.x + viewBBox.width / 2
      const y = viewBBox.y + viewBBox.height / 2
      next.k = 0.9 / Math.max(dx / width, dy / height)
      if (next.k < minZoom) {
        next.k = minZoom
      } else if (next.k > maxZoom) {
        next.k = maxZoom
      }
      next.x = width / 2 - next.k * x
      next.y = height / 2 - next.k * y
    } else {
      next.k = (minZoom + maxZoom) / 2
      next.x = 0
      next.y = 0
    }
    this.setZoom(next.k, next.x, next.y, zoomDur)
  }

  // Updates current viewTransform with some delta
  modifyZoom (modK = 0, modX = 0, modY = 0, dur = 0) {
    const parent = d3.select(this.refs.viewWrapper).node()
    const width = parent.clientWidth
    const height = parent.clientHeight
    const center = [ width / 2, height / 2 ]
    const extent = this.zoom.scaleExtent()
    const translate = [this.state.viewTransform.x, this.state.viewTransform.y]
    const next = { x: translate[0], y: translate[1], k: this.state.viewTransform.k }
    const targetZoom = next.k * (1 + modK)
    if (targetZoom < extent[0] || targetZoom > extent[1]) {
      return false
    } else {
      const translate0 = [(center[0] - next.x) / next.k, (center[1] - next.y) / next.k]
      next.k = targetZoom
      const l = [translate0[0] * next.k + next.x, translate0[1] * next.k + next.y]
      next.x += center[0] - l[0] + modX
      next.y += center[1] - l[1] + modY
      this.setZoom(next.k, next.x, next.y, dur)
    }
  }

  // Programmatically resets zoom
  setZoom (k = 1, x = 0, y = 0, dur = 0) {
    var t = d3.zoomIdentity.translate(x, y).scale(k)
    d3.select('#canvas')
      .transition()
      .duration(dur)
      .call(this.zoom.transform, t)
  }

  render () {
    if (this.state.nodes === void 0) {
      return <div id='graph' style={styles.graph} />
    }
    const margin = {
      top: 20,
      left: 0,
      right: 20,
      bottom: 110,
    }

    //  <LinearGradient id='top' from='#79d259' to='#37ac8c' />
    //  <rect width='100%' height='100%' fill='#306c90' />
    return (
      <div id='graph' style={styles.graph} ref='viewWrapper'>
        <svg width='100%' height='100%' id='canvas'>

          <g id='view' ref='view'>
            <rect
              className='background'
              x={-gridSize / 4}
              y={-gridSize / 4}
              width={gridSize}
              height={gridSize}
              fill='url(#grid)'
            />
            <g id='entities' ref='entities'>
              <Graph
                top={margin.top}
                left={margin.left}
                graph={{
                  nodes: this.state.nodes,
                  links: this.state.links
                }}
                size={[
                  width - margin.left - margin.right,
                  height - margin.top - margin.bottom
                ]}
                nodeComponent={Node}
                linkComponent={Link}
              />
            </g>
          </g>
        </svg>
        <GraphControls
          primary={'dodgerblue'}
          minZoom={minZoom}
          maxZoom={maxZoom}
          zoomLevel={this.state.viewTransform.k}
          zoomToFit={this.handleZoomToFit}
          modifyZoom={this.modifyZoom}
        />
        <NodePopover />
      </div>
    )
  }
}

export default Tree
