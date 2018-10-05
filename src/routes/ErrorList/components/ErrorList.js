import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import ActionGoToDevice from '@material-ui/icons/Build'
import ActionDelete from '@material-ui/icons/Delete'
import RequestType from './RequestType'
import StatusCode from './StatusCode'
import IconButton from '@material-ui/core/IconButton'
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
  constructor(props) {
    super(props)
  }

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
        <Table>
          <TableHead>
            <TableRow>
              <TableCell tooltip='Принято'>
                Принято
              </TableCell>

              <TableCell tooltip='Terminal ID'>
                Terminal ID
              </TableCell>

              <TableCell tooltip='Серийный номер'>
                Серийный номер
              </TableCell>

              <TableCell tooltip='Модель'>Модель</TableCell>

              <TableCell tooltip='Тип"'>Тип</TableCell>

              <TableCell tooltip='RequestCode'>RequestCode</TableCell>

              <TableCell tooltip='StatusCode'>StatusCode</TableCell>
              <TableCell style={{ width: '130px' }} />
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index} >
                <TableCell>
                  {new Date(row['acceptedAt'] * 1000).toLocaleString()}
                </TableCell>

                <TableCell>
                  <LogicalDeviceLink item={row} />
                </TableCell>

                <TableCell>
                  <PhysicalDeviceLink item={row} />
                </TableCell>

                <TableCell>
                  {row['modelName']}
                </TableCell>

                <TableCell >
                  <RequestType code={row['requestType']} />
                </TableCell>

                <TableCell >
                  {row['reasonCode']}
                </TableCell>

                <TableCell >
                  <StatusCode codes={row['statusCode']} />
                </TableCell>
                <TableCell style={{ width: '130px' }}>
                  <IconButton
                    onClick={this.onGoToDevicePageBtnClick.bind(this, row)}
                    tooltip='bottom-right'
                    touch
                    tooltipPosition='bottom-right'
                  >
                    <ActionGoToDevice />
                  </IconButton>
                  <IconButton
                    onClick={this.onDeleteErrorBtnClick.bind(this, row)}
                    tooltip='bottom-right'
                    touch
                    tooltipPosition='bottom-right'
                  >
                    <ActionDelete style={iconStyles} />
                  </IconButton>
                </TableCell>

              </TableRow>
              ))}
          </TableBody>
        </Table>

      </div>
    )
  }
}

export default ErrorList
