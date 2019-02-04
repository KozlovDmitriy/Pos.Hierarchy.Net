import React, { Component } from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'
import NodeEventsList from '../containers/nodes/NodeEventsListContainer'
import { withStyles } from '@material-ui/core/styles'
import config from 'config'
import NodeTypes from 'src/utils/NodeTypes'
import Localization from 'localization'

const styles = theme => ({
  fullscreen: {
    padding: 5
  }
})

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
    return NodeTypes[node.type] || Localization.UnknownNodeType
  }

  getNodeNameText (node) {
    switch (node.type) {
      case 'logical': return (
        <Link
          to={`${config.urlPrefix}/device/${node.deviceId}`}
          tooltip={Localization.Details}
        >
          {node.terminalId}
        </Link>
      )
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
        { k: Localization.MerchantId, v: node.merchantId }
      ]
      case 'physical': return [
        { k: Localization.Model, v: node.modelName },
        { k: Localization.TerminalIdCount, v: node.devicesCount },
        { k: Localization.ChildDevicesCount, v: node.childsCount }
      ]
      case 'tradePoint': return [
        { k: Localization.MerchantsCount, v: node.merchantsCount },
        { k: Localization.DevicesCount, v: node.devicesCount }
      ]
      case 'merchant': return [
        { k: Localization.MerchantId, v: node.merchantId },
        { k: Localization.TerminalIdCount, v: node.logicalDevicesCount },
        { k: Localization.TradePointsCount, v: node.tradePointsCount }
      ]
      case 'account': return [
        { k: Localization.AccountId, v: node.accountId },
        { k: Localization.MerchantsCount, v: node.merchantsCount }
      ]
      case 'customer': return [
        { k: Localization.CustomerId, v: node.customerId },
        { k: Localization.MerchantsCount, v: node.merchantsCount },
        { k: Localization.AccountsCount, v: node.accountsCount }
      ]
      case 'address': return [
        { k: Localization.CustomersCount, v: node.customersCount },
        { k: Localization.TradePointsCount, v: node.tradePointsCount }
      ]
      case 'city': return [
        { k: Localization.AddressesCount, v: node.addressesCount }
      ]
      case 'region': return [
        { k: Localization.RegionCode, v: node.regionId },
        { k: Localization.CitiesCount, v: node.citiesCount }
      ]
      case 'country': return [
        { k: Localization.RegionsCount, v: node.regionsCount }
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

export default withStyles(styles)(NodePopover)
