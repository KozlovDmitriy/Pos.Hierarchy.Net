import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'
import NodeEventsList from '../containers/nodes/NodeEventsListContainer'

class NodePopover extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    anchor: PropTypes.object,
    node: PropTypes.object,
    errors: PropTypes.array,
    warnings: PropTypes.array,
    setPopoverIsOpen: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)
    this.handleRequestClose = this.handleRequestClose.bind(this)
  }

  handleRequestClose = () =>
    this.props.setPopoverIsOpen(false)

  getTypeText (node) {
    switch (node.type) {
      case 'logical': return 'Terminal ID'
      case 'physical': return 'Устройство'
      case 'tradePoint': return 'Торговая точка'
      case 'merchant': return 'Мерчант'
      case 'account': return 'Счет клиента'
      case 'customer': return 'Кастомер'
      case 'address': return 'Адрес'
      case 'city': return 'Город'
      case 'region': return 'Регион'
      case 'country': return 'Страна'
    }
    return 'Неизвестный тип узла'
  }

  getNodeNameText (node) {
    switch (node.type) {
      case 'logical': return node.terminalId
      case 'physical': return node.serialNumber
      case 'tradePoint': return node.name
      case 'merchant': return node.name
      case 'account': return node.name
      case 'customer': return node.name
      case 'address': return node.address1
      case 'city': return node.name
      case 'region': return node.name
      case 'country': return node.name
    }
    return ''
  }

  getParams (node) {
    switch (node.type) {
      case 'logical': return [
        { k: 'Идентификатор мерчанта', v: node.merchantId }
      ]
      case 'physical': return [
        { k: 'Модель', v: node.modelName },
        { k: 'Количество Terminal ID', v: node.devicesCount },
        { k: 'Количество дочерних устройств', v: node.childsCount }
      ]
      case 'tradePoint': return [
        { k: 'Количество мерчантов', v: node.merchantsCount },
        { k: 'Количество устройств', v: node.devicesCount }
      ]
      case 'merchant': return [
        { k: 'Идентификатор мерчанта', v: node.merchantId },
        { k: 'Количество Terminal ID', v: node.logicalDevicesCount },
        { k: 'Количество торговых точек', v: node.tradePointsCount }
      ]
      case 'account': return [
        { k: 'Идентификатор аккаунта', v: node.accountId },
        { k: 'Количество мерчантов', v: node.merchantsCount }
      ]
      case 'customer': return [
        { k: 'Идентификатор кастомера', v: node.customerId },
        { k: 'Количество мерчантов', v: node.merchantsCount },
        { k: 'Количество аккаунтов', v: node.accountsCount }
      ]
      case 'address': return [
        { k: 'Количество кастомеров', v: node.customersCount },
        { k: 'Количество торговых точек', v: node.tradePointsCount }
      ]
      case 'city': return [
        { k: 'Количество адресов', v: node.addressesCount }
      ]
      case 'region': return [
        { k: 'Код региона', v: node.regionId },
        { k: 'Количество городов', v: node.citiesCount }
      ]
      case 'country': return [
        { k: 'Количество регионов', v: node.regionsCount }
      ]
    }
    return []
  }

  render () {
    const { isOpen, anchor, node, errors, warnings } = this.props
    const isError = errors.length > 0
    const isWarning = warnings.length > 0
    const content = isOpen ? (
      <div style={{ padding: 20 }}>
        <Typography component='h5' variant='h6' align='center'>
          {this.getTypeText(node)}
        </Typography>
        <Typography component='h6' variant='subtitle1' align='center'>
          {this.getNodeNameText(node)}
        </Typography>
        <Table>
          <TableHead>
            <TableRow style={{ height: 0 }}>
              <TableCell style={{ padding: '4px 0px' }} />
              <TableCell style={{ padding: '4px 0px' }} />
            </TableRow>
          </TableHead>
          <TableBody>
            {
              this.getParams(node).map((p, i) =>
                <TableRow key={i}>
                  <TableCell><b>{p.k}</b></TableCell>
                  <TableCell numeric>{p.v}</TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
        {
          isError || isWarning ? (
            <NodeEventsList errors={errors} warnings={warnings} detail />
          ) : void 0
        }
      </div>
    ) : void 0
    return (
      <Popover
        open={isOpen}
        anchorEl={anchor}
        style={{ padding: 20 }}
        anchorOrigin={{ horizontal: -40, vertical:'top' }}
        onClose={this.handleRequestClose}
      >
        {content}
      </Popover>
    )
  }
}

export default NodePopover
