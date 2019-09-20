const path = require("path");
const url = require("url");
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
      nodeIntegration: true
    }
  });

  win.loadFile("index.html");
}

ipcMain.on("openable", (e, a) => {
  if (a == true) {
    dialog.showOpenDialog(
      {
        properties: ["openFile"]
      },
      file => {
        if (file != undefined) {
          win = new BrowserWindow({
            width: 500,
            height: 600,
            webPreferences: {
              nodeIntegration: false,
              plugins: true
            }
          });

          win.webContents.openDevTools();
          win.loadURL(file[0]);
        }
      }
    );
  }
});

ipcMain.on("always-on-top-message", (e, a) => {
  win.setAlwaysOnTop(a);
});

app.on("ready", createWindow);
