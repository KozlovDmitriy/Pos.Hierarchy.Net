import React from 'react'
import PropTypes from 'prop-types'
import is from 'is_js'

// перенести в локализующий фреймворк
const errorDescriptionMap = {
  '500': 'неизвестный тип Action',
  '501': 'ошибка файла — не совпадает CRC',
  '502': 'файл отсутствует',
  '503': 'файл уже загружен в устройство',
  '504': 'ошибка сохранения файла',
  '505': 'ошибка удаления файла',
  '506': 'неизвестный тип Type передаваемого файла',
  '507': 'неизвестный флаг применения загруженного файла Immediately',
  '508': 'ошибка применения файла',
  '10006': 'отсутствует конфигурация',
  '10007': 'отсутствуют ключи',
  '10008': 'отсутствует сертификат',
  '10013': 'отсутствует ПО'
}

/**
 * Виджет для отрисовки названия статуса в зависимости от кода
 * @param  {[type]} { code } [description]
 * @return {[type]}   [description]
 */
const StatusCodeLine = ({ code }) => {
  if (code === '0') {
    return <span>{'OK'}</span>
  }
  const description = errorDescriptionMap[code]
  if (!is.existy(description)) {
    return <span>{`${code} (неизвестная ошибка)`}</span>
  } else {
    return (<span>{`${code} (${description})`}</span>)
  }
}

StatusCodeLine.propTypes = {
  code: PropTypes.string
}

/**
 * Виджет для отрисовки списка статусов
 * @param  {[type]} { codes         } [description]
 * @return {[type]}   [description]
 */
const StatusCode = ({ codes }) => {
  if (!is.array(codes)) {
    return <span />
  }
  if (codes.length === 1) {
    return <StatusCodeLine code={codes[0]} />
  } else {
    return (
      <ul>
        {codes.map((o, i) => <li key={i}><StatusCodeLine code={o} /></li>)}
      </ul>
    )
  }
}

StatusCode.propTypes = {
  codes: PropTypes.array
}

export default StatusCode
