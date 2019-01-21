
import React from 'react'
import PropTypes from 'prop-types'
import config from 'config'

const PhysicalDeviceLink = ({ deviceId, name }) =>
  <a href={`${config.webappurl}/PhysicalDevices/Details/${deviceId}`} target='_blank' >{name}</a>

PhysicalDeviceLink.propTypes = {
  deviceId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
}

export default PhysicalDeviceLink
