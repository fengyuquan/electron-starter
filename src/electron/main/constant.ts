import { app } from 'electron'
import { join } from 'path'

process.env.DIST_ELECTRON = join(__dirname, '..')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.PUBLIC = app.isPackaged
  ? process.env.DIST
  : join(process.env.DIST_ELECTRON, '../public')

const url = process.env.VITE_DEV_SERVER_URL || 'http://127.0.0.1:3344'
const indexHtml = join(process.env.DIST, 'index.html')

export { url, indexHtml }
