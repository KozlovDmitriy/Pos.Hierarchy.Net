import React from 'react'
import PropTypes from 'prop-types'
import is from 'is_js'
import codes from 'src/actions/codes'

/**
 * Виджет для отрисовки названия статуса в зависимости от кода
 * @param  {[type]} { code } [description]
 * @return {[type]}   [description]
 */
const StatusCodeLine = ({ code }) => {
  if (code === '0') {
    return <span>{'OK'}</span>
  }
  const description = codes(code)
  return <span>{`${code} (${description})`}</span>
}

StatusCodeLine.propTypes = {
  code: PropTypes.number
}

/**
 * Виджет для отрисовки списка статусов
 * @param  {[type]} { codes         } [description]
 * @return {[type]}   [description]
 */
const StatusCode = ({ code }) => {
  if (!is.array(code)) {
    return <StatusCodeLine code={code} />
  }
  if (codes.length === 1) {
    return <StatusCodeLine code={code[0]} />
  } else {
    return (
      <ul>
        {codes.map((o, i) => <li key={i}><StatusCodeLine code={o} /></li>)}
      </ul>
    )
  }
}

StatusCode.propTypes = {
  code: PropTypes.any
}

export default StatusCode
