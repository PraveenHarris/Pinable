const path = require('path')
const { app, BrowserWindow } = require('electron')


require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules/.bin/electron.cmd')
})

function createWindow() {
    var win = new BrowserWindow({
        width: 500,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.setMenu(null)

    win.loadFile('index.html')
}

app.on('ready', createWindow)

