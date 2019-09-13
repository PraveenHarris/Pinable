const path = require("path");
const url = require('url')
const { app, BrowserWindow, ipcMain, dialog } = require("electron");

require("electron-reload")(__dirname, {
  electron: path.join(__dirname, "node_modules/.bin/electron.cmd")
});

var win;

function createWindow() {
  win = new BrowserWindow({
    width: 500,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      plugins: true
    }
  })


  win.loadURL(url.format({
    pathname: 'path to file',
    protocol: 'file:',
    // slashes: true
  }))
}

ipcMain.on("always-on-top-message", (e, a) => {
  win.setAlwaysOnTop(a);
});

app.on("ready", createWindow);
