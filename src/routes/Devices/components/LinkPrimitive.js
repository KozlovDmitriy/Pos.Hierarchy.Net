import React from 'react'
import PropTypes from 'prop-types'
import { LinkVertical } from '@vx/shape'
import colors from './nodes/colors'

class LinkPrimitive extends React.Component {
  static propTypes = {
    link: PropTypes.object.isRequired,
    warnings: PropTypes.array.isRequired,
    errors: PropTypes.array.isRequired
  }

  checkNode (node, events) {
    switch (node.type) {
      case 'logical':
        return events.find(e => e.logicalDeviceId === node.deviceId) !== void 0
      case 'physical':
        return events.find(e => e.physicalDeviceId === node.deviceId) !== void 0
      case 'merchant':
        return events.find(e => e.merchantId === node.merchantId) !== void 0
      case 'account':
        return events.find(e => e.accountId === node.accountId) !== void 0
      case 'customer':
        return events.find(e => e.customerId === node.customerId) !== void 0
      case 'tradePoint':
        return events.find(e => e.tradePointId === node.tradePointId) !== void 0
      case 'address':
        return events.find(e => e.addressId === node.addressId) !== void 0
        // return events.find(e => [e.addressId, e.customerAddressId].includes(node.addressId)) !== void 0
      case 'city':
        return events.find(e => e.cityId === node.cityId) !== void 0
        // return events.find(e => [e.cityId, e.customerCityId].includes(node.cityId)) !== void 0
      case 'region':
        return events.find(e => e.regionId === node.regionId) !== void 0
        // return events.find(e => [e.regionId, e.customerRegionId].includes(node.regionId)) !== void 0
      case 'country':
        return events.find(e => e.countryId === node.countryId) !== void 0
        // return events.find(e => [e.countryId, e.customerCountryId].includes(node.countryId)) !== void 0
    }
    return false
  }

  checkLink (link, events) {
    return this.checkNode(link.target, events) && this.checkNode(link.source, events)
  }

  render () {
    const { link, errors, warnings } = this.props
    const isError = this.checkLink(link, errors)
    const isWarning = this.checkLink(link, warnings)
    const statusColor =
      isError ? colors.error :
      isWarning ? colors.warning :
      void 0
    const isAddress = link.type.match(/(address)|(city)|(region)|(country)/)
    if (isAddress !== null) {
      return (
        <LinkVertical
          data={link}
          stroke={statusColor || '#00afa3'}
          strokeDasharray='8, 12'
          strokeWidth={1.5}
          strokeOpacity={0.5}
          fill='none'
        />
      )
    }
    const isOwner = link.type.match(/(merchant)|(account)|(customer)|(tradePoint)/)
    if (isOwner !== null) {
      return (
        <LinkVertical
          data={link}
          stroke={statusColor || '#008ba0'}
          strokeDasharray='8, 4'
          strokeWidth={1}
          strokeOpacity={0.5}
          fill='none'
        />
      )
    }
    const isLogical = link.type.match(/(logical)/)
    if (isLogical !== null) {
      return (
        <LinkVertical
          data={link}
          stroke={statusColor || '#00d8d4'}
          strokeWidth={1.5}
          strokeOpacity={0.5}
          fill='none'
        />
      )
    }
    const isPhysical = link.type.match(/(physical)/)
    if (isPhysical !== null) {
      if (link.type === 'physical - physical') {
        return (
          <LinkVertical
            data={link}
            stroke={statusColor || '#03c0dc'}
            // strokeDasharray='12, 4'
            strokeWidth={3.0}
            strokeOpacity={0.5}
            fill='none'
          />
        )
      } else {
        return (
          <LinkVertical
            data={link}
            stroke={statusColor || '#00bde7'}
            strokeWidth={1.5}
            strokeOpacity={0.5}
            fill='none'
          />
        )
      }
    }
  }
}

export default LinkPrimitive
