import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AceEditor from 'react-ace'
import Filters from '../containers/FiltersContainer'
import Tree from '../containers/TreeContainer'
import 'brace/mode/json'
import 'brace/theme/solarized_dark'

const style = {
  padding: '2px 0px',
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  background: '#f9f9f9'
}

const itemStyle = {
  padding: '2px 2px'
}

class Workspace extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    filteredData: PropTypes.array.isRequired,
    changeDeviceData:  PropTypes.func.isRequired
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
    const { data, filteredData } = this.props
    const onChange = this.onChange.bind(this)
    return (
      <div style={style}>
        <div style={{ ...itemStyle, width: 550, height: '100%' }}>
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
        </div>
        <div
          id='devices'
          style={{
            position: 'absolute',
            top: -20,
            bottom: 0,
            left: 520,
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

export default Workspace
