export const NEW_SCRIPT = 1
export const FILE_DOWNLOADING = 2
export const SCRIPT_DOWNLOADED = 3
export const UPDATE_KIT_DOWNLOADED = 4
export const UPDATE_KIT_SUCCESSFULLY_APPLY = 5
export const LOST_TERMINAL = 300
// перенести в локализующий фреймворк
const codes = {
  [NEW_SCRIPT]: 'обнаружен скрипт задания',
  [FILE_DOWNLOADING]: 'загрузка файла',
  [SCRIPT_DOWNLOADED]: 'скрипт загружен',
  [UPDATE_KIT_DOWNLOADED]: 'пакет обновления загружен',
  [UPDATE_KIT_SUCCESSFULLY_APPLY]: 'пакет обновления успешно применено',
  [LOST_TERMINAL]: 'отсутствует актуальная информация о статусе терминала',
  327: 'отсутствует бумага для принтера',
  500: 'неизвестный тип Action',
  501: 'ошибка файла — не совпадает CRC',
  502: 'файл отсутствует',
  503: 'файл уже загружен в устройство',
  504: 'ошибка сохранения файла',
  505: 'ошибка удаления файла',
  506: 'неизвестный тип Type передаваемого файла',
  507: 'неизвестный флаг применения загруженного файла Immediately',
  508: 'ошибка применения файла',
  10006: 'отсутствует конфигурация',
  10007: 'отсутствуют ключи',
  10008: 'отсутствует сертификат',
  10013: 'отсутствует ПО'
}

export function getEventDescription (event) {
  const description = codes[event.code]
  if (event.description === void 0) {
    return event.type === 'error' ? 'Неизвестная ошибка' :
      event.type === 'warning' ? 'Неизвестное предупреждение' :
      'Неизвестное событие'
  }
  return description
}

export default codes
