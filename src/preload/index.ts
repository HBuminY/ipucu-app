import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import type {
  ExposedUtilityNames,
  ExposedUtilityParams,
  ExposedUtilityReturns
} from '../main/exposedUtilities'

// Create a typed callFunction for the renderer
const callFunction = <T extends ExposedUtilityNames>(
  functionName: T,
  ...args: ExposedUtilityParams[T]
): Promise<ExposedUtilityReturns[T]> => {
  return ipcRenderer.invoke('callFunction', functionName, ...args)
}

// Custom APIs for renderer
const api = {
  callFunction
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('maskAPI', {
      onSetMaskVisibility: (callback) =>
        ipcRenderer.on('set-mask-visibility', (_event, value) => callback(value))
    })
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
