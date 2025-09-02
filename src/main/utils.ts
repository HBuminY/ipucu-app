import { exec } from 'child_process'
import { BrowserWindow } from 'electron'

export function applyKWinBlur(mainWindow: BrowserWindow): void {
  mainWindow.webContents.on('did-finish-load', () => {
    // Wait for the window to be fully drawn and visible
    setTimeout(() => {
      try {
        // Get the window ID from the buffer
        const windowId = mainWindow.getNativeWindowHandle().readUInt32LE()
        const command = `xprop -f _KDE_NET_WM_BLUR_BEHIND_REGION 32c -set _KDE_NET_WM_BLUR_BEHIND_REGION 0 -id ${windowId}`

        exec(command, (error, _stdout, stderr) => {
          if (error) {
            console.error(`Failed to apply KWin blur: ${error.message}`)
            return
          }
          if (stderr) {
            console.error(`xprop stderr: ${stderr}`)
          }
        })
      } catch (e) {
        console.error('Could not apply KWin blur. Are you on X11 and is xprop installed?', e)
      }
    }, 100) // A short delay ensures the window handle is valid
  })
}

export function handleResizeOrMove(mainWindow: BrowserWindow, resizeMoveTimer): void {
  let isMasking = false
  const DEBOUNCE_DELAY = 200 // ms to wait before hiding the mask

  // If not already masking, send message to show the mask
  if (!isMasking) {
    isMasking = true
    mainWindow.webContents.send('set-mask-visibility', true)
  }

  // Clear the previous timer
  clearTimeout(resizeMoveTimer)

  // Set a new timer to hide the mask
  resizeMoveTimer = setTimeout(() => {
    isMasking = false
    mainWindow.webContents.send('set-mask-visibility', false)
  }, DEBOUNCE_DELAY)
}
