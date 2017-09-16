import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Group } from '@vx/group'
import { Graph } from '@vx/network'
import { LinkVertical } from '@vx/shape'
import * as d3 from 'd3-force'
import { LinearGradient } from '@vx/gradient'
import './Tree.scss'

const styles = {
  graph: {
    position: 'absolute',
    top: 80,
    left: 6,
    right: 6,
    bottom: 20,
    background: '#fcfcfc'
  }
}

function Node ({ node, events }) {
  return (
    <Group y={node.y} x={node.x}>
      {node.type === 'physical' &&
        <rect
          width={16}
          height={16}
          y={-8}
          x={-8}
          fill='white'
          stroke='#03c0dc'
          strokeWidth={2}
        />
      }
      {node.type === 'logical' &&
        <circle
          r={10}
          strokeWidth={3}
          fill='white'
          strokeDasharray={'1'}
          strokeOpacity={0.6}
          stroke={'#26deb0'}
          onClick={() => {
            alert(`clicked: ${JSON.stringify(node.title)}`)
          }}
        />
      }
      <text
        dy={-16}
        fontSize={13}
        fontFamily='Arial'
        textAnchor={'middle'}
        style={{ pointerEvents: 'none' }}
        fill={'#222'}
        stroke={void 0}
      >
        {node.title}
      </text>
    </Group>
  )
}

function Link ({ link }) {
  return (
    <LinkVertical
      data={link}
      stroke='#374469'
      strokeWidth='1'
      strokeOpacity={0.4}
      fill='none'
    />
  )
}

const width = 1300
const height = 1000

class Tree extends Component {
  static propTypes = {
    tree: PropTypes.object.isRequired,
    animation: PropTypes.bool,
    rewriteTree: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.state = {}
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
    try {
      const newIds = this.getTreeIds(nextProps.tree)
    } catch (e) {
      console.log(nextProps.tree)
    }
    const newIds = this.getTreeIds(nextProps.tree)
    const oldIds = this.getTreeIds(this.props.tree)
    if (JSON.stringify(newIds) !== JSON.stringify(oldIds)) {
      const nodes = [ ...nextProps.tree.nodes ]
      const links = nextProps.tree.links
        .map(i => {
          return {
            source: i.source.id,
            target: i.target.id
          }
        })
      var force = d3.forceSimulation(nodes)
        .force('link', d3.forceLink().id(d => d.id))
        .force('forceX', d3.forceX().strength(0.1).x(width * 0.5))
        .force('forceY', d3.forceY().strength(0.1).y(height * 0.5))
        .force('center', d3.forceCenter().x(width * 0.5).y(height * 0.5))
        .force('charge', d3.forceManyBody().strength(-1500))
      force.force('link').links(links).distance(40).strength(1)
      if (nextProps.animation) {
        force.on('tick', () => {
          this.setState({ nodes, links: nextProps.tree.links })
        })
      } else {
        this.computeSimulation(force)
      }
      this.setState({ nodes, links: nextProps.tree.links })
    }
  }

  componentWillMount () {
    if (this.props.tree.nodes === void 0) {
      this.props.rewriteTree()
    }
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
      <div id='graph' style={styles.graph}>
        <svg width='100%' height='100%'>
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
            //linkComponent={Link}
          />
        </svg>
      </div>
    )
  }
}

export default Tree