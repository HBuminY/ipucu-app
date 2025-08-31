import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { exec } from 'child_process'

app.commandLine.appendSwitch('enable-transparent-visuals')
app.commandLine.appendSwitch('disable-gpu')

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    backgroundMaterial: 'acrylic',
    vibrancy: 'fullscreen-ui',
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    transparent: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.on('did-finish-load', () => {
    // Wait for the window to be fully drawn and visible
    setTimeout(() => {
      try {
        // Get the window ID from the buffer
        const windowId = mainWindow.getNativeWindowHandle().readUInt32LE()
        const command = `xprop -f _KDE_NET_WM_BLUR_BEHIND_REGION 32c -set _KDE_NET_WM_BLUR_BEHIND_REGION 0 -id ${windowId}`

        exec(command, (error, stdout, stderr) => {
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

  let resizeMoveTimer
  let isMasking = false
  const DEBOUNCE_DELAY = 200 // ms to wait before hiding the mask

  const handleResizeOrMove = (): void => {
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

  mainWindow.on('resize', handleResizeOrMove)
  mainWindow.on('move', handleResizeOrMove)

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
