import { app, BrowserWindow, Menu, nativeTheme } from 'electron'
import { release } from 'os'
import { join } from 'path'
import { indexHtml, url } from './constant'
import { handleIPC } from './ipc'
import pkg from '../../../package.json'

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

let win: BrowserWindow | null = null

function createWindow() {
  win = new BrowserWindow({
    minWidth: pkg.window.width || 600,
    minHeight: pkg.window.height || 800,
    title: pkg.window.title,
    icon: join(process.env.PUBLIC, 'favicon.ico'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(url)
    win.webContents.openDevTools()
  } else {
    win.loadFile(indexHtml)
  }
}

app.whenReady().then(() => {
  createWindow()
  handleIPC()
  Menu.setApplicationMenu(null)
})

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})
