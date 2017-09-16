import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AceEditor from 'react-ace'
import Filters from '../containers/FiltersContainer'
import 'brace/mode/json'
import 'brace/theme/solarized_light'
import Tree from '../containers/TreeContainer'

const style = {
  padding: '2px 20px',
  position: 'absolute',
  top: 5,
  bottom: 5,
  left: 5,
  right: 5
}

const itemStyle = {
  padding: '2px 20px'
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
            theme='solarized_light'
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
            left: 550,
            right: 5,
            padding: '2px 20px'
          }}
        >
          <Filters />
          filtered ids: <code>{JSON.stringify(filteredData)}</code>
          <Tree />
        </div>
      </div>
    )
  }
}

export default Workspace
