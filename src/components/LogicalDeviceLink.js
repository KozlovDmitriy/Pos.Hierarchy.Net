
import React from 'react'
import PropTypes from 'prop-types'
import config from 'config'

const LogicalDeviceLink = ({ deviceId, name }) =>
  <a href={`${config.webappurl}/LogicalDevices/Details/${deviceId}`} target='_blank' >{name}</a>

LogicalDeviceLink.propTypes = {
  deviceId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
}

export default LogicalDeviceLink
