import Localization from 'localization'

export const NEW_SCRIPT = 1
export const FILE_DOWNLOADING = 2
export const SCRIPT_DOWNLOADED = 3
export const UPDATE_KIT_DOWNLOADED = 4
export const UPDATE_KIT_SUCCESSFULLY_APPLY = 5
export const LOST_TERMINAL = 300
// перенести в локализующий фреймворк
const codes = {
  [NEW_SCRIPT]: Localization.TaskScriptFound,
  [FILE_DOWNLOADING]: Localization.FileDownloading,
  [SCRIPT_DOWNLOADED]: Localization.ScriptHasBeenLoaded,
  [UPDATE_KIT_DOWNLOADED]: Localization.UpdateKitDownloaded,
  [UPDATE_KIT_SUCCESSFULLY_APPLY]: Localization.UpdateKitSuccessfullyApplied,
  [LOST_TERMINAL]: Localization.HasNotActualInformationAboutDevice,
  327: Localization.ThereIsNoPrinterPaper,
  401: Localization.IncorrectMasterPasswordEntered,
  500: Localization.UnknownTypeOfAction,
  501: Localization.FileCrcDoesNotMatch,
  502: Localization.FileMissing,
  503: Localization.FileAlreadyUploadedToDevice,
  504: Localization.FileSaveFailed,
  505: Localization.FileDeleteError,
  506: Localization.UnknownTypeOfFileBeingTransferred,
  507: Localization.UnknownImmediatelyFlag,
  508: Localization.FileApplyError,
  1000: Localization.SoftwareUpdateKitFailed,
  2000: Localization.ConfigurationUpdateKitFailed,
  3000: Localization.SslCertApplyFailed,
  10006: Localization.NoConfiguration,
  10007: Localization.NoKey,
  10008: Localization.NoSslCert,
  10013: Localization.NoSoftware
}

export function getEventDescription (value) {
  const code = typeof value === 'object' ? value.code : value
  const description = codes[code]
  if (description === void 0) {
    if (typeof value === 'object') {
      return value.type === 'error' ? Localization.UnknownError :
        value.type === 'warning' ? Localization.UnknownWarning :
        Localization.UnknownEvent
    } else {
      return Localization.UnknownEvent
    }
  }
  return description
}

export default getEventDescription
