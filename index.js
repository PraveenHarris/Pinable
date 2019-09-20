const path = require("path");
const url = require("url");
const { app, BrowserWindow, ipcMain, dialog } = require("electron");

require("electron-reload")(__dirname, {
  electron: path.join(__dirname, "node_modules/.bin/electron.cmd")
});

// Global variables
var WIN;
var ALWAYS_ON_TOP = false;

function createWindow() {
  WIN = new BrowserWindow({
    width: 500,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      plugins: true
    }
  });

  WIN.loadFile("index.html");
}

ipcMain.on("openable", (e, a) => {
  
  WIN.setAlwaysOnTop(false);

  if (a == true) {
    dialog.showOpenDialog(
      {
        properties: ["openFile"]
      },
      file => {
        if (file != undefined) {

          // WIN.webContents.openDevTools();
          WIN.loadURL(file[0]);
          WIN.setAlwaysOnTop(ALWAYS_ON_TOP);
        }
      }
    );
  }
});

ipcMain.on("always-on-top-message", (e, a) => {
  ALWAYS_ON_TOP = a;
  WIN.setAlwaysOnTop(ALWAYS_ON_TOP);
});

app.on("ready", createWindow);
