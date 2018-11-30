import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import AceEditor from 'react-ace'
import Filters from '../containers/FiltersContainer'
import Tree from '../containers/TreeContainer'
import Loader from 'react-loader-advanced'
import LoaderSpinner from 'react-loader-spinner'
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
    isLoad: PropTypes.bool.isRequired,
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
    const message = <LoaderSpinner
       type="Ball-Triangle"
       color="#008ba0"
       height="50"	
       width="50"
    />      
    return (
      <div style={style}>
        <Filters />
        <div
          id='devices'
          style={{
            position: 'absolute',
            top: 45,
            bottom: 0,
            left: 0,
            right: 0,
            padding: '2px 20px'
          }}
        >
          <Loader
            message={message} 
            hideContentOnLoad={false}
            backgroundStyle={{backgroundColor: 'transparent'}}
            show={this.props.isLoad}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            }}
          >
            <Tree boardStyle={this.props.isLoad ? {WebkitFilter: 'blur(1.4px)', filter: 'blur(1.4px)', opacity: 0.4} : {}}/>
          </Loader>
        </div>
      </div>
    )
  }
}

// reactMixin(Workspace.prototype, ReactRethinkdb.DefaultMixin)

export default Workspace
