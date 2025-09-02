import { ElectronAPI } from '@electron-toolkit/preload'
import type {
  ExposedUtilityNames,
  ExposedUtilityParams,
  ExposedUtilityReturns
} from '../main/exposedUtilities'

export interface IElectronAPI {
  callFunction: <T extends ExposedUtilityNames>(
    functionName: T,
    ...args: ExposedUtilityParams[T]
  ) => Promise<ExposedUtilityReturns[T]>
}

export interface IMaskAPI {
  onSetMaskVisibility: (callback: (value: boolean) => void) => void
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: IElectronAPI
    maskAPI: IMaskAPI
  }
}
