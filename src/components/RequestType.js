import React from 'react'
import PropTypes from 'prop-types'

const lang = {
  '16': 'STATUS',
  '32': 'DOWNLOAD',
  '48': 'UPLOAD'
}

/**
 * Виджет для отрисовки типа реквеста в зависимости от кода
 * @param  {[type]} { code          } [description]
 * @return {[type]}   [description]
 */
const RequestType = ({ code }) => (
  <span>{lang[code] || 'UNKNOWN'}</span>
)

RequestType.propTypes = {
  code: PropTypes.string
}

export default RequestType
