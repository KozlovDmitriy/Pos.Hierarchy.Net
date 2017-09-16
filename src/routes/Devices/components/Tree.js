import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import './Tree.scss'

//import Viz from 'viz.js'

const styles = {
  graph: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    bottom: 20
  }
}

const EMPTY_TYPE = "empty"  // Text on empty nodes is positioned differently
const NODE_KEY = "id"       // Allows D3 to correctly update DOM

const GraphConfig = {
  NodeTypes: {
    empty: {
      typeText: "PhysicalDevice",
      shapeId: "#special",
      shape: (
        <symbol viewBox="0 0 100 100" id="empty" key="0">
          <circle cx="50" cy="50" r="45"></circle>
        </symbol>
      )
    },
  special: {
      typeText: "LogicDevice",
      shapeId: "#empty",
      shape: (
        <symbol viewBox="0 0 100 100" key="0" id="special">
          <rect width="100" height="100"></rect>
        </symbol>
      )
    }
  },
  NodeSubtypes: {},
  EdgeTypes: {
    emptyEdge: {
      shapeId: "#emptyEdge",
      shape: (
        <symbol viewBox="0 0 50 50" id="emptyEdge" key="0">
        </symbol>
      )
    }
  }
}

class Tree extends Component {
  static propTypes = {
    tree: PropTypes.object.isRequired,
    rewriteTree: PropTypes.func.isRequired,
    setTree: PropTypes.func.isRequired
  }


  dragstarted (force, d) {
    if (!d3.event.active) {
      force.alphaTarget(0.3).restart()
    }
    d.fx = d.x
    d.fy = d.y
  }

  dragged (d) {
    d.fx = d3.event.x
    d.fy = d3.event.y
  }

  dragended (force, d) {
    if (!d3.event.active) {
      force.alphaTarget(0)
    }
    d.fx = null
    d.fy = null
  }

  ticked (link, node) {
    link
      .attr('x1', (d) => d.source.x)
      .attr('y1', (d) => d.source.y)
      .attr('x2', (d) => d.target.x)
      .attr('y2', (d) => d.target.y)

    node.attr('transform', (d) => `translate(${d.x},${d.y})`)
  }

  componentWillReceiveProps (nextProps) {
    const width = 1000
    const height = 800
    const tree = nextProps.tree
    const nodes = [ ...tree.nodes.map(i => { return { ...i } }) ]
    const edges = [ ...tree.edges.map(i => { return { ...i } }) ]
    if (JSON.stringify(nextProps.tree) !== JSON.stringify(this.props.tree)) {
      d3.select('body #graph svg').remove()

      const svg = d3.select('body #graph')
        .append('svg')
        .attr('width', width)
        .attr('height', height)

      if (nodes !== void 0) {
        const force = d3.forceSimulation()
          .force('link', d3.forceLink().id((d) => d.id))
          .force('forceX', d3.forceX().strength(0.1).x(width * 0.5))
          .force('forceY', d3.forceY().strength(0.1).y(height * 0.5))
          .force('center', d3.forceCenter().x(width * 0.5).y(height * 0.5))
          .force('charge', d3.forceManyBody().strength(-5000))

        const link = svg
          .append('g')
          .attr('class', 'links')
          .selectAll('.link')
          .data(edges)
          .enter()
          .append('line')
          .attr('stroke', 'black')

        const node = svg.selectAll('.node')
          .data(nodes)
          .enter()
          .append('g')
          .attr('class', 'node')
          .call(
            d3.drag()
              .on('start', this.dragstarted.bind(this, force))
              .on('drag', this.dragged)
              .on('end', this.dragended.bind(this, force))
          )

        node.append('circle')
          .attr('r', '5')

        node.append('text')
          .attr('dx', 12)
          .attr('dy', '.35em')
          .text(d => d.title)

        force.nodes(nodes).on('tick', this.ticked.bind(this, link, node))
        force.force('link').links(edges)
      }
    }
  }

  componentWillMount () {
    if (this.props.tree.nodes === void 0) {
      this.props.rewriteTree()
    }
  }

  render () {
    return (
      <div id='graph' style={styles.graph} />
    )
  }

  /*render () {
    const tree = this.props.tree
	  // The graph configuration
    const nodes = tree.nodes
    const edges = tree.edges
    const graph = Viz("digraph { x -> y -> z; }", { format: "svg" })
    var COMMENT_PSEUDO_COMMENT_OR_LT_BANG = new RegExp(
      '<!--[\\s\\S]*?(?:-->)?'
      + '<!---+>?'  // A comment with no body
      + '|<!(?![dD][oO][cC][tT][yY][pP][eE]|\\[CDATA\\[)[^>]*>?'
      + '|<[?][^>]*>?',  // A pseudo-comment
      'g'
    )
    const svg = graph.replace( COMMENT_PSEUDO_COMMENT_OR_LT_BANG ,"")
    return (
      <div id='graph' style={styles.graph} dangerouslySetInnerHTML={{ __html: svg }}>
      </div>
    )
  }*/
}

export default Tree
