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
  top: 0,
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
    changeDeviceData: PropTypes.func.isRequired,
    subscribeErrors: PropTypes.func.isRequired,
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
      this.props.subscribeErrors()
    }
  }

  onChange (newValue) {
    try {
      const obj = JSON.parse(newValue)
      if (Array.isArray(obj)) {
        this.props.changeDeviceData(obj)
      }
    } catch (e) { }
  }

  render () {
    /* const { data } = this.props
    const onChange = this.onChange.bind(this)
    const jsEditor = (<div style={{ ...itemStyle, width: 550, height: '100%' }}>
      <AceEditor
        mode='json'
        theme='solarized_dark'
        onChange={onChange}
        name='UNIQUE_ID_OF_DIV'
        editorProps={{ $blockScrolling: true }}
        fontSize={14}
        height='100%'
        highlightActiveLine
        value={JSON.stringify(data, null, 2)}
        setOptions={{
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
    </div>) */
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
