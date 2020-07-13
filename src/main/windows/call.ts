import { app as rawApp, BrowserWindow, Menu, shell, ipcMain } from 'electron'
import { appIcon } from '../application-constants'
import { getLogger } from '../../shared/logger'
import { ExtendedAppMainProcess } from '../types'
import { join } from 'path'

var btoa = require('btoa');
//import { appWindowTitle } from '../../shared/constants'

const log = getLogger('main/call')
const app = rawApp as ExtendedAppMainProcess

let win: BrowserWindow | null = null

export async function openCallWindow(
  locale: string,
  roomname: string,
  username: string
) {
  if (win) {
    win.focus()
    return
  }

  log.debug('open call', roomname)
  const defaults = {
    bounds: {
      width: 500,
      height: 638,
    },
    headerHeight: 36,
    minWidth: 450,
    minHeight: 450,
  }
  win = new BrowserWindow({
    backgroundColor: 'white',
    darkTheme: false, // Forces dark theme (GTK+3)

    icon: appIcon(),
    minHeight: defaults.minHeight,
    minWidth: defaults.minWidth,
    show: false,
    title: 'WebRTC Call',
    useContentSize: true, // Specify web page size without OS chrome

    webPreferences: {
      nodeIntegration: false,
      preload: join(__dirname, '../../../static/preload-call.js'),
    },
  })

  log.debug(roomname)
  const appPath = app.getAppPath()
  const socketdomain = btoa("https://cloud13.de");
  const subdir = btoa('/p2p/');
  let url =
    join(__dirname, '../../..//html-dist/call/index.html') +
    '?socketdomain=' +
    socketdomain +
    '&subdir=' +
    subdir +
    `&username=${encodeURIComponent(username)}` + //Add username so we can show it inside the webRtc App
    '&base64=true' +
    '&roomname=' +
    roomname
  console.log(url)
  win.loadURL('file://' + url)

  win.once('ready-to-show', () => {
    win.show()
  })

  if (win.setSheetOffset) {
    win.setSheetOffset(defaults.headerHeight)
  }

  win.webContents.on('will-navigate', (_ev, url) => {
    log.debug('open ', url)
    shell.openExternal(url)
  })

  const closeButtonCallback = () => {
    win.close()
  }
  ipcMain.addListener('call-close',closeButtonCallback)
  win.on('close', e => {
    ipcMain.removeListener('call-close',closeButtonCallback)
    win = null
  })

  win.setMenu(Menu.buildFromTemplate([{ role: 'viewMenu' }]))
}
