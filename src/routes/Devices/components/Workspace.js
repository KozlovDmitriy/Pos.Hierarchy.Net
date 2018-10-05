import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import AceEditor from 'react-ace'
import Filters from '../containers/FiltersContainer'
import Tree from '../containers/TreeContainer'
// import ReactRethinkdb, { r } from 'react-rethinkdb'
// import reactMixin from 'react-mixin'
// import 'brace/mode/json'
// import 'brace/theme/solarized_dark'

const style = {
  padding: '2px 0px',
  position: 'absolute',
  top: 60,
  bottom: 0,
  left: 0,
  right: 0,
  background: '#f9f9f9'
}

/* const itemStyle = {
  padding: '2px 2px'
} */

class Workspace extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    loadEntities: PropTypes.func.isRequired
  }

  /* observe (props, state) {
    return {
      items: new ReactRethinkdb.QueryRequest({
        query: r.table('DeviceError')
                .orderBy({ index: r.desc('acceptedAt') }), // RethinkDB query
        changes: true,             // subscribe to realtime changefeed
        initial: []               // return [] while loading
      })
    }
  } */

  componentWillMount () {
    if (this.props.data.length === 0) {
      this.props.loadEntities()
    }
  }

  render () {
    /* const data = this.data !== void 0 ?
      this.data.items.value().sort((a, b) => b.acceptedAt - a.acceptedAt) :
      { } */
    return (
      <div style={style}>
        <div
          id='devices'
          style={{
            position: 'absolute',
            top: -20,
            bottom: 0,
            left: 5,
            right: 5,
            padding: '2px 20px'
          }}
        >
          <Filters />
          <Tree />
        </div>
      </div>
    )
  }
}

// reactMixin(Workspace.prototype, ReactRethinkdb.DefaultMixin)

export default Workspace
