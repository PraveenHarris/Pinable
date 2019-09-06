const path = require("path");
const { app, BrowserWindow, ipcMain } = require("electron");

require("electron-reload")(__dirname, {
  electron: path.join(__dirname, "node_modules/.bin/electron.cmd")
});

var win;

function createWindow() {
  win = new BrowserWindow({
    width: 500,
    height: 600,
    // frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile("index.html");
}

ipcMain.on("always-on-top-message", (e, a) => {
  win.setAlwaysOnTop(a);
});

app.on("ready", createWindow);
