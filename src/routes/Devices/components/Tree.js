import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Group } from '@vx/group'
import { Cluster } from '@vx/hierarchy'
import { LinkVertical } from '@vx/shape'
import { hierarchy } from 'd3-hierarchy'
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
  if (node.depth === 0) {
    return null
  }
  return (
    <Group top={node.depth === 1 ? 20 : node.y} left={node.x}>
      {node.data.type === 'physical' &&
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
      {node.data.type === 'logical' &&
        <circle
          r={10}
          strokeWidth={3}
          fill='white'
          strokeDasharray={'1'}
          strokeOpacity={0.6}
          stroke={'#26deb0'}
          onClick={() => {
            alert(`clicked: ${JSON.stringify(node.data.name)}`)
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
        {node.data.name}
      </text>
    </Group>
  )
}

function Link ({ link }) {
  return link.source.depth !== 0 ? (
    <LinkVertical
      data={
        link.source.depth === 1 ?
        {source: {...link.source, y: 20}, target: link.target} :
        link
      }
      stroke='#374469'
      strokeWidth='1'
      strokeOpacity={0.4}
      fill='none'
    />
  ) : null
}

class Tree extends Component {
  static propTypes = {
    tree: PropTypes.object.isRequired,
    rewriteTree: PropTypes.func.isRequired,
    setTree: PropTypes.func.isRequired
  }

  componentWillMount () {
    if (this.props.tree.nodes === void 0) {
      this.props.rewriteTree()
    }
  }

  render () {
    const width = 1300
    const height = 900
    const margin = {
      top: 20,
      left: 0,
      right: 20,
      bottom: 110,
    }
    const data = hierarchy(this.props.tree)

    //  <LinearGradient id='top' from='#79d259' to='#37ac8c' />
    //  <rect width='100%' height='100%' fill='#306c90' />
    return (
      <div id='graph' style={styles.graph}>
        <svg width='100%' height='100%'>
          <Cluster
            top={margin.top}
            left={margin.left}
            root={data}
            size={[
              width - margin.left - margin.right,
              height - margin.top - margin.bottom
            ]}
            nodeComponent={Node}
            linkComponent={Link}
          />
        </svg>
      </div>
    )
  }
}

export default Tree
