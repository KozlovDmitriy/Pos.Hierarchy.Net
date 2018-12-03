import React from 'react'
import PropTypes from 'prop-types'
import { LinkVertical } from '@vx/shape'

const errorColor = '#d91c6b'

class LinkPrimitive extends React.Component {
  static propTypes = {
    link: PropTypes.object.isRequired,
    errors: PropTypes.array.isRequired
  }

  isNodeError (node, errors) {
    switch (node.type) {
      case 'logical':
        return errors.find(e => e.logicalDeviceId === node.deviceId) !== void 0
      case 'physical':
        return errors.find(e => e.physicalDeviceId === node.deviceId) !== void 0
      case 'merchant':
        return errors.find(e => e.merchantId === node.merchantId) !== void 0
      case 'account':
        return errors.find(e => e.accountId === node.accountId) !== void 0
      case 'customer':
        return errors.find(e => e.customerId === node.customerId) !== void 0
      case 'tradePoint':
        return errors.find(e => e.tradePointId === node.tradePointId) !== void 0
      case 'address':
        return errors.find(e => [e.addressId, e.customerAddressId].includes(node.addressId)) !== void 0
      case 'city':
        return errors.find(e => [e.cityId, e.customerCityId].includes(node.cityId)) !== void 0
      case 'region':
        return errors.find(e => [e.regionId, e.customerRegionId].includes(node.regionId)) !== void 0
      case 'country':
        return errors.find(e => [e.countryId, e.customerCountryId].includes(node.countryId)) !== void 0
    }
    return false
  }

  isError (link, errors) {
    return this.isNodeError(link.target, errors) && this.isNodeError(link.source, errors)
  }

  render () {
    const { link, errors } = this.props
    const isError = this.isError(link, errors)
    const isAddress = link.type.match(/(address)|(city)|(region)|(country)/)
    if (isAddress !== null) {
      return (
        <LinkVertical
          data={link}
          stroke={isError ? errorColor : '#00afa3'}
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
          stroke={isError ? errorColor : '#008ba0'}
          strokeDasharray='8, 4'
          strokeWidth={2}
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
          stroke={isError ? errorColor : '#00d8d4'}
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
            stroke={isError ? errorColor : '#03c0dc'}
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
            stroke={isError ? errorColor : '#00bde7'}
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
