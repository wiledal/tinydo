const electron = require('electron')

let tray
let showing = false

electron.app.on('ready', () => {
  window = new electron.BrowserWindow({
    frame: false,
    width: 300,
    height: 600
  })
  window.loadFile(`${__dirname}/static/index.html`)
  window.hide()

  const contextMenu = electron.Menu.buildFromTemplate([
    { label: 'Quit TinyDo', role: 'quit'  }
  ])

  window.on('blur', () => {
    window.hide()
    tray.setHighlightMode('never')
    showing = false
  })

  tray = new electron.Tray(`${__dirname}/icon@2x.png`)
  tray.on('click', () => {
    window.show()
    tray.setHighlightMode('always')
  })
  tray.on('right-click', () => {
    tray.popUpContextMenu(contextMenu)
  })
  // tray.setContextMenu(contextMenu)
  tray.setHighlightMode('never')

  electron.app.dock.hide()
})