import React from 'react'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import ActionGoToDevice from 'material-ui/svg-icons/action/build'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import RequestType from './RequestType'
import StatusCode from './StatusCode'
import IconButton from 'material-ui/IconButton'
import config from 'config'
import request from 'superagent'
import uuid from 'node-uuid'
import PropTypes from 'prop-types'

const iconStyles = {
  marginRight: 24
}

const PhysicalDeviceLink = ({ item }) =>
  <a href={`${config.webappurl}/PhysicalDevices/Details/${item.deviceId}`} target='_blank' >{item.serialNumber}</a>

PhysicalDeviceLink.propTypes = {
  item: PropTypes.object
}

const LogicalDeviceLink = ({ item }) =>
  <a href={`${config.webappurl}/LogicalDevices/Details/${item.logicalDeviceId}`} target='_blank' >{item.terminalId}</a>

LogicalDeviceLink.propTypes = {
  item: PropTypes.object
}

/**
 * Виджет таблица ошибочных реквестов от устройств
 */
class ErrorList extends React.Component {
  /* constructor(props) {
    super(props)
  } */

  static propTypes = {
    data: PropTypes.array
  }

  onGoToDevicePageBtnClick (row, e) {
    const url = `${config.webapiurl}/PhysicalDevices/Details/${row.deviceId}`
    const win = window.open(url, '_blank')
    win.focus()
  }

  onDeleteErrorBtnClick (row, e) {
    const msg = `Вы действительно хотите оменить эту ошибку завершенной?\nПЗапись об ошибке будет удалена!\nОтменить это действие будет невозможно!`;
    if (confirm(msg)) {
      request
        .post(`${config.realtimedashboardurl}/api/events `)
        .set('Content-Type', 'application/json')
        .send({ $type: 'ErrorHidden', id: uuid.v4(), errorIds: [row.id] })
        .end((err, res) => {
          if (err) {
            console.warn(err)
          } else {
            console.log(res)
          }
        })
    }
  }

  render () {
    const data = this.props.data || []
    return (
      <div>
        <Table
          fixedHeader
          fixedFooter={false}
          selectable={false}
          multiSelectable={false}
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn tooltip='Принято'>
                Принято
              </TableHeaderColumn>

              <TableHeaderColumn tooltip='Terminal ID'>
                Terminal ID
              </TableHeaderColumn>

              <TableHeaderColumn tooltip='Серийный номер'>
                Серийный номер
              </TableHeaderColumn>

              <TableHeaderColumn tooltip='Модель'>Модель</TableHeaderColumn>

              <TableHeaderColumn tooltip='Тип"'>Тип</TableHeaderColumn>

              <TableHeaderColumn tooltip='RequestCode'>RequestCode</TableHeaderColumn>

              <TableHeaderColumn tooltip='StatusCode'>StatusCode</TableHeaderColumn>
              <TableHeaderColumn style={{ width: '130px' }} />
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            deselectOnClickaway={false}
            showRowHover
            stripedRows
          >
            {data.map((row, index) => (
              <TableRow key={index} >
                <TableRowColumn>
                  {new Date(row['acceptedAt'] * 1000).toLocaleString()}
                </TableRowColumn>

                <TableRowColumn >
                  <LogicalDeviceLink item={row} />
                </TableRowColumn>

                <TableRowColumn >
                  <PhysicalDeviceLink item={row} />
                </TableRowColumn>

                <TableRowColumn >
                  {row['modelName']}
                </TableRowColumn>

                <TableRowColumn >
                  <RequestType code={row['requestType']} />
                </TableRowColumn>

                <TableRowColumn >
                  {row['reasonCode']}
                </TableRowColumn>

                <TableRowColumn >
                  <StatusCode codes={row['statusCode']} />
                </TableRowColumn>
                <TableRowColumn style={{ width: '130px' }}>
                  <IconButton
                    onTouchTap={this.onGoToDevicePageBtnClick.bind(this, row)}
                    tooltip='bottom-right'
                    touch
                    tooltipPosition='bottom-right'
                  >
                    <ActionGoToDevice />
                  </IconButton>
                  <IconButton
                    onTouchTap={this.onDeleteErrorBtnClick.bind(this, row)}
                    tooltip='bottom-right'
                    touch
                    tooltipPosition='bottom-right'
                  >
                    <ActionDelete style={iconStyles} />
                  </IconButton>
                </TableRowColumn>

              </TableRow>
              ))}
          </TableBody>
        </Table>

      </div>
    )
  }
}

export default ErrorList
